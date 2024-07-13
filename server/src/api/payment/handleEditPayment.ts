import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleEditPayment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract payment ID from request parameters
    const payment_id: string = request.params.payment_id;

    // Extract updated payment data from request body
    const { date, amount } = request.body;

    // Query to update payment data in the database
    const updateQuery = 'UPDATE payments SET date = ?, amount = ? WHERE id = ?';

    // Execute the query with payment data and payment ID as parameters
    const [updateResults] = await promisePool.execute(updateQuery, [
      date,
      amount,
      payment_id,
    ]);

    // Check if the update query affected any rows
    const updateResultsJson: any = updateResults;
    if (updateResultsJson.affectedRows === 0) {
      return response.status(404).json({ message: 'Payment not found' });
    }

    // Fetch the updated payment record from the database
    const selectQuery = 'SELECT * FROM payments WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(
      selectQuery,
      [payment_id]
    );

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.send(selectResults[0]);
    } else {
      // If no payment is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Payment not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
