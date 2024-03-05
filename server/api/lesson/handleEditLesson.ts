import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleEditLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract lesson ID from request parameters
    const lesson_id: string = request.params.lesson_id;

    // Extract updated lesson data from request body
    const { subscription_price, number_of_lessons_in_subscription, total_number_of_lessons, lesson_date } = request.body;

    // Query to update lesson data in the database
    const updateQuery =
      'UPDATE lessons SET subscription_price = ?, number_of_lessons_in_subscription = ?, total_number_of_lessons = ?, lesson_date = ? WHERE id = ?';

    // Execute the query with lesson data and lesson ID as parameters
    connection.query(
      updateQuery,
      [subscription_price, number_of_lessons_in_subscription, total_number_of_lessons, lesson_date, lesson_id],
      (updateError, updateResults) => {
        if (updateError) {
          // If there's an error, pass it to the error handling middleware
          return next(updateError);
        }

        // Check if the update query affected any rows
        const updateResultsJson: any = updateResults;
        if (updateResultsJson.affectedRows === 0) {
          return response.status(404).json({ message: 'Lesson not found' });
        }

        // Fetch the updated lesson record from the database
        const selectQuery = 'SELECT * FROM lessons WHERE id = ?';
        connection.query(selectQuery, [lesson_id], (selectError, selectResults: RowDataPacket[]) => {
          if (selectError) {
            // Handle error
            return next(selectError);
          }

          // If the record is found, send it in the response
          if (selectResults.length > 0) {
            response.send(selectResults[0]);
          } else {
            // If no lesson is found with the provided ID, return a 404 response
            response.status(404).json({ message: 'Lesson not found' });
          }
        });
      }
    );
  } catch (err) {
    console.log(err)
    next(err);
  }
}
