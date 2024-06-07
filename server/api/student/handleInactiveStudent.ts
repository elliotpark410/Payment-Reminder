import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';

export async function handleInactiveStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    // Query to inactivate student
    const selectQuery = "SELECT inactive FROM students WHERE id = ?";

    // Execute the inactive query with student ID as parameter
    connection.query(selectQuery, [student_id], (error, inactiveResults) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // Check if the inactive query affected any rows
      const inactiveResultsJson: any = inactiveResults;
      if (inactiveResultsJson.affectedRows === 0) {
        // If no rows were affected, it means the student with the provided ID was not found
        return response.status(404).json({ message: "Student not found" });
      }

      // Get the current inactive status
      const currentStatus: boolean = inactiveResultsJson[0].inactive;

      // Determine the new inactive status (toggle the current status)
      const newInactiveStatus = !currentStatus;

      // Query to update the inactive status of the student
      const updateQuery = "UPDATE students SET inactive = ? WHERE id = ?";

      // Execute the update query with the new inactive status and student ID as parameters
      connection.query(updateQuery, [newInactiveStatus, student_id], (updateError) => {
        if (updateError) {
          // If there's an error, pass it to the error handling middleware
          return next(updateError);
        }

        // If the update was successful, send a success response
        response.json({ message: "Student status updated successfully", inactive: newInactiveStatus });
      });
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
