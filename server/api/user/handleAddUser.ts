import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export async function handleAddUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract user data from request body
    const { username, password  } = request.body;

    if (!username || !password) {
      return response.status(400).json({ message: "Username and password are required" });
    }

    // Encrypt the password using bcrypt
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS!); // Number of rounds for hashing

    const password_hash = await bcrypt.hash(password, saltRounds);

    // Query to insert a new user record into the users table
    const insertQuery =
      'INSERT INTO users (username, password_hash) VALUES (?, ?)';

    // Execute the query with user data as parameters
    connection.query(
      insertQuery,
      [username, password_hash],
      (insertError, insertResults) => {
        if (insertError) {
          if (insertError.code === "ER_DUP_ENTRY") {
            return response.status(409).json({ message: "Username already exists" });
          }
          // If there's an error, pass it to the error handling middleware
          return next(insertError);
        }

        // Fetch the inserted user record from the database
        const insertResultsJson: any = insertResults;
        const userId = insertResultsJson.insertId;

        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        connection.query(selectQuery, [userId], (selectError, selectResults: RowDataPacket[]) => {
          if (selectError) {
            // Handle error
            return next(selectError);
          }

          // If the record is found, send it in the response
          if (selectResults.length > 0) {
            response.status(201).send(selectResults[0]);
          } else {
            // If no user is found with the provided ID, return a 404 response
            response.status(404).json({ message: 'User not found' });
          }
        });
      }
    );
  } catch (err) {
    console.log(err)
    next(err);
  }
}
