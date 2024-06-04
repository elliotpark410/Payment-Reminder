import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';

export async function handleDeleteReset(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract reset ID from request parameters
    const reset_id: string = request.params.reset_id;

    // Query to delete reset
    const query = "DELETE FROM resets WHERE id = ?";

    // Execute the delete query with reset ID as parameter
    connection.query(query, [reset_id], (error, deleteResults) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // Check if the delete query affected any rows
      const deleteResultsJson: any = deleteResults;
      if (deleteResultsJson.affectedRows === 0) {
        // If no rows were affected, it means the reset with the provided ID was not found
        return response.status(404).json({ message: "Reset not found or already deleted" });
      }

      // If the delete was successful, send a success response
      response.json({ message: "Reset deleted successfully" });
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
