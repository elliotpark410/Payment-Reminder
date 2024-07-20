import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetLesson(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const lesson_id: string = request.params.lesson_id;

    // Query to select a single lesson based on the provided ID
    const query = 'SELECT * FROM lessons WHERE id = ?';

    // Execute the query with the lesson ID as a parameter
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [lesson_id]);

    // If a lesson is found, send it in the response
    if (results.length > 0) {
      response.send(results[0]);
    } else {
      // If no lesson is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Lesson not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
