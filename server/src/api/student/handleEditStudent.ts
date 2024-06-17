import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";
import { RowDataPacket } from "mysql2";

export async function handleEditStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    // Extract updated student data from request body
    const { student_name, parent_name, phone_number, email, subscription_price, subscription_number } = request.body;

    // Query to update student data in the database
    const updateQuery =
      'UPDATE students SET student_name = ?, parent_name = ?, phone_number = ?, email = ?, subscription_price = ?, subscription_number = ? WHERE id = ?';

    // Execute the query with student data and student ID as parameters
    connection.query(
      updateQuery,
      [student_name, parent_name, phone_number, email, subscription_price, subscription_number, student_id],
      (updateError, updateResults) => {
        if (updateError) {
          // If there's an error, pass it to the error handling middleware
          return next(updateError);
        }

        // Check if the update query affected any rows
        const updateResultsJson: any = updateResults;
        if (updateResultsJson.affectedRows === 0) {
          return response.status(404).json({ message: 'Student not found' });
        }

        // Fetch the updated student record from the database
        const selectQuery = 'SELECT * FROM students WHERE id = ?';
        connection.query(selectQuery, [student_id], (selectError, selectResults: RowDataPacket[]) => {
          if (selectError) {
            // Handle error
            return next(selectError);
          }

          // If the record is found, send it in the response
          if (selectResults.length > 0) {
            response.send(selectResults[0]);
          } else {
            // If no student is found with the provided ID, return a 404 response
            response.status(404).json({ message: 'Student not found' });
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
}
