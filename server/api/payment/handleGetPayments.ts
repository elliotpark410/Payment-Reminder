import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";

export async function handleGetPayments(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = `
    SELECT payments.*, students.student_name
    FROM payments
    INNER JOIN students ON payments.student_id = students.id
    WHERE payments.deleted_at IS NULL
    `;

    // Execute the query
    connection.query(query, (error, results) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If successful, send the payments data in the response
      response.send(results);
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
