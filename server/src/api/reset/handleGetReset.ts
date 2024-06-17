import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";
import { RowDataPacket } from "mysql2";

export async function handleGetReset(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const reset_id: string = request.params.reset_id;

    // Query to select a single reset based on the provided ID
    const query = "SELECT * FROM resets WHERE id = ?";

    // Execute the query with the reset ID as a parameter
    connection.query(query, [reset_id], (error, results: RowDataPacket[]) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If a reset is found, send it in the response
      if (results.length > 0) {
        response.send(results[0]);
      } else {
        // If no reset is found with the provided ID, return a 404 response
        response.status(404).json({ message: "Reset not found" });
      }
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
