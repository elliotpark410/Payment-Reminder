import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleEditReset(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract reset ID from request parameters
    const reset_id: string = request.params.reset_id;

    // Extract updated reset data from request body
    const { date } = request.body;

    // Query to update reset data in the database
    const updateQuery =
      'UPDATE resets SET date = ? WHERE id = ?';

    // Execute the query with reset data and reset ID as parameters
    connection.query(
      updateQuery,
      [date, reset_id],
      (updateError, updateResults) => {
        if (updateError) {
          // If there's an error, pass it to the error handling middleware
          return next(updateError);
        }

        // Check if the update query affected any rows
        const updateResultsJson: any = updateResults;
        if (updateResultsJson.affectedRows === 0) {
          return response.status(404).json({ message: 'Reset not found' });
        }

        // Fetch the updated reset record from the database
        const selectQuery = 'SELECT * FROM resets WHERE id = ?';
        connection.query(selectQuery, [reset_id], (selectError, selectResults: RowDataPacket[]) => {
          if (selectError) {
            // Handle error
            return next(selectError);
          }

          // If the record is found, send it in the response
          if (selectResults.length > 0) {
            response.send(selectResults[0]);
          } else {
            // If no reset is found with the provided ID, return a 404 response
            response.status(404).json({ message: 'Reset not found' });
          }
        });
      }
    );
  } catch (err) {
    console.log(err)
    next(err);
  }
}
