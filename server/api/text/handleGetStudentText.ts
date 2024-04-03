import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";
import { RowDataPacket } from 'mysql2';

export async function handleGetStudentText(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const student_id: string = request.params.student_id;

    // Query to select all texts associated with a student id
    const query = "SELECT * FROM texts WHERE student_id = ?";

    // Execute the query with the student ID as a parameter
    connection.query(query, [student_id], (error, results: RowDataPacket[]) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If successful, send the students data in the response
      response.send(results);
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
