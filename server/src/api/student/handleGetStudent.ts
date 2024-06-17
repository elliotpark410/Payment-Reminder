import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";
import { RowDataPacket } from "mysql2";

export async function handleGetStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const student_id: string = request.params.student_id;

    // Query to select a single student based on the provided ID
    const query = "SELECT * FROM students WHERE deleted_at IS NULL AND id = ?";

    // Execute the query with the student ID as a parameter
    connection.query(query, [student_id], (error, results: RowDataPacket[]) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If a student is found, send it in the response
      if (results.length > 0) {
        response.send(results[0]);
      } else {
        // If no student is found with the provided ID, return a 404 response
        response.status(404).json({ message: "Student not found" });
      }
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
