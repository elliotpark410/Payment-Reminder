import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';

export async function handleDeleteStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    // Generate the formatted date string in 'YYYY-MM-DD' format for Pacific Time
    const currentDate = new Date();
    const options = {
      timeZone: 'America/Los_Angeles',
      year: 'numeric' as const,
      month: '2-digit' as const,
      day: '2-digit' as const,
    };

    const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(
      currentDate
    );

    // Query to soft delete student (update deleted_at to current timestamp)
    const query =
      'UPDATE students SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL';

    // Execute the delete query with student ID as parameter
    const [deleteResults] = await promisePool.execute(query, [
      formattedDate,
      student_id,
    ]);

    // Check if the delete query affected any rows
    const deleteResultsJson: any = deleteResults;
    if (deleteResultsJson.affectedRows === 0) {
      // If no rows were affected, it means the student with the provided ID was not found
      return response
        .status(404)
        .json({ message: 'Student not found or already deleted' });
    }

    // If the delete was successful, send a success response
    response.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
