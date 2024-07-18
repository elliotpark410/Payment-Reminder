import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetStudentResets(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    const query = `
    SELECT resets.*, students.student_name
    FROM resets
    INNER JOIN students ON resets.student_id = students.id
    WHERE resets.student_id = ?
    `;

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [student_id]);

    // If successful, send the students data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
