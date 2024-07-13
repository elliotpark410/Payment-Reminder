import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddReset(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract reset data from request body
    const { student_id, date } = request.body;

    // Query to insert a new reset into the resets table
    const insertQuery = `INSERT INTO resets (student_id, date) VALUES (?, ?)`;

    // Execute the insert query
    const [insertResults] = await promisePool.execute(insertQuery, [
      student_id,
      date,
    ]);

    // Fetch the inserted reset record from the database
    const insertResultsJson: any = insertResults;
    const resetId = insertResultsJson.insertId;

    const selectQuery = 'SELECT * FROM resets WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(
      selectQuery,
      [resetId]
    );

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.status(201).send(selectResults[0]);
    } else {
      // If no reset is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Reset not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
