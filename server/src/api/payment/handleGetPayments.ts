import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetPayments(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
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
