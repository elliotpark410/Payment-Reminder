import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";

export async function handleDeletePayment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract payment ID from request parameters
    const payment_id: string = request.params.payment_id;

    // Query to hard delete
    const query = "DELETE FROM payments WHERE id = ?";

    // Execute the delete query with payment ID as parameter
    connection.query(query, [payment_id], (error, deleteResults) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // Check if the delete query affected any rows
      const deleteResultsJson: any = deleteResults;
      if (deleteResultsJson.affectedRows === 0) {
        // If no rows were affected, it means the payment with the provided ID was not found
        return response.status(404).json({ message: "Payment not found or already deleted" });
      }

      // If the delete was successful, send a success response
      response.json({ message: "Payment deleted successfully" });
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
