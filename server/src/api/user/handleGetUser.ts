import { NextFunction, Request, Response } from 'express';
import connection from '../../db/connection';
import { getEnvVariable } from '../../util/index';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function handleGetUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    // Query to select a user based on the username
    const query = 'SELECT * FROM users WHERE username = ?';

    // Execute the query
    connection.query(query, [username], (error, results: RowDataPacket[]) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      if (results.length === 0) {
        return response.status(404).json({ message: 'User not found' });
      }

      const user = results[0];

      // Verify the password with bcrypt
      const isPasswordCorrect = bcrypt.compare(password, user.password_hash);

      if (!isPasswordCorrect) {
        return response.status(401).json({ message: 'Invalid password' });
      }

      const jwtSecret = getEnvVariable('JWT_SECRET');

      const token = jwt.sign(
        { username: user.username, userId: user.id },
        jwtSecret,
        { expiresIn: '168h' }
      );

      // If the password is correct, return success
      response.status(200).json({ message: 'Successfully logged in', token });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
