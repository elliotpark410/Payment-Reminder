import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";
import { RowDataPacket } from 'mysql2';

export async function handleGetLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const lesson_id: string = request.params.lesson_id;

    // Query to select a single lesson based on the provided ID
    const query = "SELECT * FROM lessons WHERE id = ?";

    // Execute the query with the lesson ID as a parameter
    connection.query(query, [lesson_id], (error, results: RowDataPacket[]) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If a lesson is found, send it in the response
      if (results.length > 0) {
        response.send(results[0]);
      } else {
        // If no lesson is found with the provided ID, return a 404 response
        response.status(404).json({ message: "Lesson not found" });
      }
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
