import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetStudentPayments(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    const selectQuery = `
    SELECT payments.*, students.student_name
    FROM payments
    INNER JOIN students ON payments.student_id = students.id
    WHERE payments.student_id = ?
    `;

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(selectQuery, [student_id]);

    // If successful, send the payment data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
