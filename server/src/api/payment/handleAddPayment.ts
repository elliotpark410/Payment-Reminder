import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddPayment(request: Request, response: Response, next: NextFunction) {
  try {
    // Extract payment data from request body
    const { student_id, date, amount } = request.body;

    // Query to insert a new payment into the payments table
    const insertQuery = `INSERT INTO payments (student_id, date, amount) VALUES (?, ?, ?)`;

    // Execute the insert query
    const [insertResults] = await promisePool.execute(insertQuery, [student_id, date, amount]);

    // Fetch the inserted payment record from the database
    const insertResultsJson: any = insertResults;
    const paymentId = insertResultsJson.insertId;

    const selectQuery = 'SELECT * FROM payments WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(selectQuery, [paymentId]);

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.status(201).send(selectResults[0]);
    } else {
      // If no lesson is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Payment not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
