import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetInactiveStudents(
  request: Request,
  response: Response,
  next: NextFunction
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
