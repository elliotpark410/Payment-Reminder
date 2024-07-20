import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetStudents(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const query = `
    SELECT id, student_name, parent_name, phone_number, email,
    subscription_price, subscription_number, inactive
    FROM students WHERE deleted_at IS NULL AND inactive = false`;

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(query);

    // If successful, send the students data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
