import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetPayment(request: Request, response: Response, next: NextFunction) {
  try {
    const payment_id: string = request.params.payment_id;

    // Query to select a single payment based on the provided ID
    const query = 'SELECT * FROM payments WHERE id = ?';

    // Execute the query with the payment ID as a parameter
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [payment_id]);

    // If a payment is found, send it in the response
    if (results.length > 0) {
      response.send(results[0]);
    } else {
      // If no payment is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Payment not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
