import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { getEnvVariable } from '../../util/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function handleAddUser(request: Request, response: Response, next: NextFunction) {
  try {
    // Extract user data from request body
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({ message: 'Username and password are required' });
    }

    const bcryptSaltRounds = getEnvVariable('BCRYPT_SALT_ROUNDS');

    // Encrypt the password using bcrypt
    const saltRounds = parseInt(bcryptSaltRounds); // Number of rounds for hashing

    const password_hash = await bcrypt.hash(password, saltRounds);

    // Query to insert a new user record into the users table
    const insertQuery = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';

    // Execute the query with user data as parameters
    try {
      // Execute the query with user data as parameters
      const [insertResults] = await promisePool.execute(insertQuery, [username, password_hash]);

      // Fetch the inserted user record from the database
      const insertResultsJson: any = insertResults;
      const userId = insertResultsJson.insertId;

      const jwtSecret = getEnvVariable('JWT_SECRET');

      // Generate JWT token for the newly registered user
      const token = jwt.sign({ username, userId }, jwtSecret, {
        expiresIn: '168h',
      });

      // Return success with token
      response.status(201).json({ message: 'User created successfully', token, password_hash });
    } catch (insertError: any) {
      if (insertError.code === 'ER_DUP_ENTRY') {
        return response.status(409).json({ message: 'Username already exists' });
      }
      // If there's an error, pass it to the error handling middleware
      throw insertError;
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
