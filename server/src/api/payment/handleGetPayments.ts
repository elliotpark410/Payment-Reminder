import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetPayments(request: Request, response: Response, next: NextFunction) {
  try {
    const query = `
    SELECT payments.*, students.student_name
    FROM payments
    INNER JOIN students ON payments.student_id = students.id
    `;

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(query);

    // If successful, send the payments data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
