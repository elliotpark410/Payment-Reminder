import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleInactiveStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    // Query to inactivate student
    const selectQuery =
      'SELECT inactive FROM students WHERE deleted_at IS NULL AND id = ?';

    // Execute the inactive query with student ID as parameter
    const [inactiveResults] = await promisePool.execute<RowDataPacket[]>(
      selectQuery,
      [student_id]
    );

    // Check if the inactive query affected any rows
    const inactiveResultsJson: any = inactiveResults;
    if (inactiveResultsJson.affectedRows === 0) {
      // If no rows were affected, it means the student with the provided ID was not found
      return response.status(404).json({ message: 'Student not found' });
    }

    // Get the current inactive status
    const currentStatus: boolean = inactiveResultsJson[0].inactive;

    // Determine the new inactive status (toggle the current status)
    const newInactiveStatus = !currentStatus;

    // Query to update the inactive status of the student
    const updateQuery = 'UPDATE students SET inactive = ? WHERE id = ?';

    // Execute the update query with the new inactive status and student ID as parameters
    await promisePool.execute(updateQuery, [newInactiveStatus, student_id]);

    // If the update was successful, send a success response
    response.json({
      message: 'Student status updated successfully',
      inactive: newInactiveStatus,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
