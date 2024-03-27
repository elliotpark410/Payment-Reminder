import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";

export async function handleGetLessons(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = `
    SELECT lessons.*, students.student_name
    FROM lessons
    INNER JOIN students ON lessons.student_id = students.id
    `;

    // Execute the query
    connection.query(query, (error, results) => {
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
