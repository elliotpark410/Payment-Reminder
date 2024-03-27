import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student data from request body
    const { student_name, parent_name, phone_number, email, subscription_price, number_of_lessons_in_subscription } = request.body;

    // Query to insert a new student record into the students table
    const insertQuery =
      'INSERT INTO students (student_name, parent_name, phone_number, email, subscription_price, number_of_lessons_in_subscription) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the query with student data as parameters
    connection.query(
      insertQuery,
      [student_name, parent_name, phone_number, email, subscription_price,number_of_lessons_in_subscription],
      (insertError, insertResults) => {
        if (insertError) {
          // If there's an error, pass it to the error handling middleware
          return next(insertError);
        }

        // Fetch the inserted student record from the database
        const insertResultsJson: any = insertResults;
        const studentId = insertResultsJson.insertId;

        const selectQuery = 'SELECT * FROM students WHERE id = ?';
        connection.query(selectQuery, [studentId], (selectError, selectResults: RowDataPacket[]) => {
          if (selectError) {
            // Handle error
            return next(selectError);
          }

          // If the record is found, send it in the response
          if (selectResults.length > 0) {
            response.status(201).send(selectResults[0]);
          } else {
            // If no student is found with the provided ID, return a 404 response
            response.status(404).json({ message: 'Student not found' });
          }
        });
      }
    );
  } catch (err) {
    console.log(err)
    next(err);
  }
}
