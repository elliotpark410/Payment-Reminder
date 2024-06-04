import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";

export async function handleGetResets(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = `
    SELECT resets.*, students.student_name
    FROM resets
    INNER JOIN students ON resets.student_id = students.id
    `;

    // Execute the query
    connection.query(query, (error, results) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If successful, send the lessons data in the response
      response.send(results);
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
