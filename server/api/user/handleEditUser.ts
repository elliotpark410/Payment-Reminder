import { NextFunction, Request, Response } from 'express';
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleEditUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract user ID from request parameters
    const user_id: string = request.params.user_id;

    // Extract updated user data from request body
    const { student_name, parent_name, phone_number } = request.body;

    // Query to update user data in the database
    const updateQuery =
      'UPDATE users SET student_name = ?, parent_name = ?, phone_number = ?, email = ? WHERE id = ?';

    // Execute the query with user data and user ID as parameters
    connection.query(
      updateQuery,
      [student_name, parent_name, phone_number, user_id],
      (updateError, updateResults) => {
        if (updateError) {
          // If there's an error, pass it to the error handling middleware
          return next(updateError);
        }

        // Check if the update query affected any rows
        const updateResultsJson: any = updateResults;
        if (updateResultsJson.affectedRows === 0) {
          return response.status(404).json({ message: 'User not found' });
        }

        // Fetch the updated user record from the database
        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        connection.query(selectQuery, [user_id], (selectError, selectResults: RowDataPacket[]) => {
          if (selectError) {
            // Handle error
            return next(selectError);
          }

          // If the record is found, send it in the response
          if (selectResults.length > 0) {
            response.send(selectResults[0]);
          } else {
            // If no user is found with the provided ID, return a 404 response
            response.status(404).json({ message: 'User not found' });
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
}
