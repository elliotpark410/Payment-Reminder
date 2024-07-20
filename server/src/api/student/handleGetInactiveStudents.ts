import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetInactiveStudents(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const query = `
    SELECT id, student_name, inactive FROM students WHERE inactive = true AND deleted_at IS NULL`;

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(query);

    // If successful, send the students data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
