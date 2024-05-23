import { NextFunction, Request, Response } from 'express';
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddPayment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract payment data from request body
    const {
      student_id,
      payment_date,
      amount,
    } = request.body;

    // Query to insert a new payment into the payments table
    const insertQuery = `INSERT INTO payments (student_id, payment_date, amount) VALUES (?, ?, ?)`;

    // Execute the insert query
    connection.query(
      insertQuery,
      [
        student_id,
        payment_date,
        amount,
      ],
      (insertError, insertResults) => {
        if (insertError) {
          // If there's an error, pass it to the error handling middleware
          return next(insertError);
        }

        // Fetch the inserted payment record from the database
        const insertResultsJson: any = insertResults;
        const paymentId = insertResultsJson.insertId;

        const selectQuery = 'SELECT * FROM payments WHERE id = ?';

        connection.query(
          selectQuery,
          [paymentId],
          (selectError, selectResults: RowDataPacket[]) => {
            if (selectError) {
              // Handle error
              return next(selectError);
            }

            // If the record is found, send it in the response
            if (selectResults.length > 0) {
              response.status(201).send(selectResults[0]);
            } else {
              // If no lesson is found with the provided ID, return a 404 response
              response.status(404).json({ message: 'Payment not found' });
            }
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
}
