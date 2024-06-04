import { NextFunction, Request, Response } from 'express';
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddReset(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract reset data from request body
    const {
      student_id,
      reset_date,
    } = request.body;

    // Query to insert a new reset into the resets table
    const insertQuery = `INSERT INTO resets (student_id, date) VALUES (?, ?)`;

    // Execute the insert query
    connection.query(
      insertQuery,
      [
        student_id,
        reset_date,
      ],
      (insertError, insertResults) => {
        if (insertError) {
          // If there's an error, pass it to the error handling middleware
          return next(insertError);
        }

        // Fetch the inserted reset record from the database
        const insertResultsJson: any = insertResults;
        const resetId = insertResultsJson.insertId;

        const selectQuery = 'SELECT * FROM resets WHERE id = ?';

        connection.query(
          selectQuery,
          [resetId],
          (selectError, selectResults: RowDataPacket[]) => {
            if (selectError) {
              // Handle error
              return next(selectError);
            }

            // If the record is found, send it in the response
            if (selectResults.length > 0) {
              response.status(201).send(selectResults[0]);
            } else {
              // If no reset is found with the provided ID, return a 404 response
              response.status(404).json({ message: 'Reset not found' });
            }
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
}
