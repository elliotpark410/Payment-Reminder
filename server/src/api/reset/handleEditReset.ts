import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleEditReset(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    // Extract reset ID from request parameters
    const reset_id: string = request.params.reset_id;

    // Extract updated reset data from request body
    const { date } = request.body;

    // Query to update reset data in the database
    const updateQuery = 'UPDATE resets SET date = ? WHERE id = ?';

    // Execute the query with reset data and reset ID as parameters
    const [updateResults] = await promisePool.execute(updateQuery, [date, reset_id]);

    // Check if the update query affected any rows
    const updateResultsJson: any = updateResults;
    if (updateResultsJson.affectedRows === 0) {
      return response.status(404).json({ message: 'Reset not found' });
    }

    // Fetch the updated reset record from the database
    const selectQuery = 'SELECT * FROM resets WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(selectQuery, [reset_id]);

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.send(selectResults[0]);
    } else {
      // If no reset is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Reset not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
