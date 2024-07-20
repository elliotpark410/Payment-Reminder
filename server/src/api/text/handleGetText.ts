import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetText(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const text_id: string = request.params.text_id;

    // Query to select a single text based on the provided ID
    const query = 'SELECT * FROM texts WHERE id = ?';

    // Execute the query with the student ID as a parameter
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [text_id]);

    // If a text message is found, send it in the response
    if (results.length > 0) {
      response.send(results[0]);
    } else {
      // If no text is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Text message not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
