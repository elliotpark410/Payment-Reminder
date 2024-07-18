import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { getEnvVariable } from '../../util/index';
import {
  checkRateLimit,
  incrementLoginAttempts,
  resetLoginAttempts,
} from '../../util/rateLimiting';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function handleGetUser(request: Request, response: Response, next: NextFunction) {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({ message: 'Username and password are required' });
    }

    const { allowed, retryAfter } = await checkRateLimit(username);

    if (!allowed) {
      return response.status(429).json({
        message: `Too many login attempts. Please try again after ${Math.ceil(retryAfter / 60)} minutes.`,
      });
    }

    // Query to select a user based on the username
    const query = 'SELECT * FROM users WHERE username = ?';

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [username]);

    if (results.length === 0) {
      await incrementLoginAttempts(username);
      return response.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // Verify the password with bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
      await incrementLoginAttempts(username);
      return response.status(401).json({ message: 'Invalid password' });
    }

    const jwtSecret = getEnvVariable('JWT_SECRET');

    const token = jwt.sign({ username: user.username, userId: user.id }, jwtSecret, {
      expiresIn: '168h',
    });

    // If the password is correct, reset login attempts
    await resetLoginAttempts(username);

    // If the password is correct, return success
    response.status(200).json({ message: 'Successfully logged in', token });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
