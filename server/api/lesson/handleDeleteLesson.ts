import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';

export async function handleDeleteLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract lesson ID from request parameters
    const lesson_id: string = request.params.lesson_id;

    // Generate the formatted date string in 'YYYY-MM-DD' format for Pacific Time
    const currentDate = new Date();
    const options = {
      timeZone: 'America/Los_Angeles',
      year: 'numeric' as const,
      month: '2-digit' as const,
      day: '2-digit' as const,
    };

    const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(currentDate);

    // Query to soft delete lesson (update deleted_at to formatted date)
    const query = "UPDATE lessons SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL";

    // Execute the delete query with lesson ID as parameter
    connection.query(query, [formattedDate, lesson_id], (error, deleteResults) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // Check if the delete query affected any rows
      const deleteResultsJson: any = deleteResults;
      if (deleteResultsJson.affectedRows === 0) {
        // If no rows were affected, it means the lesson with the provided ID was not found
        return response.status(404).json({ message: "Lesson not found or already deleted" });
      }

      // If the delete was successful, send a success response
      response.json({ message: "Lesson deleted successfully" });
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
