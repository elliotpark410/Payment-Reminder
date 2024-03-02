import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract lesson data from request body
    const { student_name, subscription_price, number_of_lessons_in_subscription, total_number_of_lessons, lesson_date } = request.body;

    // Query to insert a new lesson into the lessons table
    const insertQuery = `INSERT INTO lessons (student_name, subscription_price, number_of_lessons_in_subscription, total_number_of_lessons, lesson_date) VALUES (?, ?, ?, ?, ?)`;

    // Execute the insert query
    connection.query(insertQuery,
    [student_name, subscription_price, number_of_lessons_in_subscription, total_number_of_lessons, lesson_date],
    (insertError, insertResults) => {
      if (insertError) {
        // If there's an error, pass it to the error handling middleware
        return next(insertError);
      }

      // Fetch the inserted lesson record from the database
      const insertResultsJson: any = insertResults;
      const lessonId = insertResultsJson.insertId;

      const selectQuery = 'SELECT * FROM lessons WHERE id = ?';

      connection.query(selectQuery, [lessonId], (selectError, selectResults: RowDataPacket[]) => {
        if (selectError) {
          // Handle error
          return next(selectError);
        }

        // If the record is found, send it in the response
        if (selectResults.length > 0) {
          response.status(201).send(selectResults[0]);
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
