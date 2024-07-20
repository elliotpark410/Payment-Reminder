import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';

export async function handleDeleteReset(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    // Extract reset ID from request parameters
    const reset_id: string = request.params.reset_id;

    // Query to delete reset
    const query = 'DELETE FROM resets WHERE id = ?';

    // Execute the delete query with reset ID as parameter
    const [deleteResults] = await promisePool.execute(query, [reset_id]);

    // Check if the delete query affected any rows
    const deleteResultsJson: any = deleteResults;
    if (deleteResultsJson.affectedRows === 0) {
      // If no rows were affected, it means the reset with the provided ID was not found
      return response.status(404).json({ message: 'Reset not found or already deleted' });
    }

    // If the delete was successful, send a success response
    response.json({ message: 'Reset deleted successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
