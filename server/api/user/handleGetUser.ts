import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";
import { RowDataPacket } from 'mysql2';

export async function handleGetUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const user_id: string = request.params.user_id;

    // Query to select a single user based on the provided ID
    const query = "SELECT * FROM users WHERE id = ?";

    // Execute the query with the user ID as a parameter
    connection.query(query, [user_id], (error, results: RowDataPacket[]) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If a user is found, send it in the response
      if (results.length > 0) {
        response.send(results[0]);
      } else {
        // If no user is found with the provided ID, return a 404 response
        response.status(404).json({ message: "User not found" });
      }
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
