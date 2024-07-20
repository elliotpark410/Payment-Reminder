import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleEditLesson(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    // Extract lesson ID from request parameters
    const lesson_id: string = request.params.lesson_id;

    // Extract updated lesson data from request body
    const { date } = request.body;

    // Query to update lesson data in the database
    const updateQuery = 'UPDATE lessons SET date = ? WHERE id = ?';

    // Execute the query with lesson data and lesson ID as parameters
    const [updateResults] = await promisePool.execute(updateQuery, [date, lesson_id]);

    // Check if the update query affected any rows
    const updateResultsJson: any = updateResults;
    if (updateResultsJson.affectedRows === 0) {
      return response.status(404).json({ message: 'Lesson not found' });
    }

    // Fetch the updated lesson record from the database
    const selectQuery = 'SELECT * FROM lessons WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(selectQuery, [lesson_id]);

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.send(selectResults[0]);
    } else {
      // If no lesson is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Lesson not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
