import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetStudentText(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const student_id: string = request.params.student_id;

    // Query to select all texts associated with a student id
    const query = 'SELECT * FROM texts WHERE student_id = ?';

    // Execute the query with the student ID as a parameter
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [student_id]);

    // If successful, send the students data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
