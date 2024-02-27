import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';

export async function handleDeleteUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract user ID from request parameters
    const user_id: string = request.params.user_id;

    // Query to delete user from the database
    const query = "DELETE FROM users WHERE id = ?";

    // Execute the delete query with user ID as parameter
    connection.query(query, [user_id], (error, deleteResults) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // Check if the delete query affected any rows
      const deleteResultsJson: any = deleteResults;
      if (deleteResultsJson.affectedRows === 0) {
        // If no rows were affected, it means the user with the provided ID was not found
        return response.status(404).json({ message: "User not found" });
      }

      // If the delete was successful, send a success response
      response.json({ message: "User deleted successfully" });
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
