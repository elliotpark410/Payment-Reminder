import { NextFunction, Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { promisePool } from '../../db/connection';

export async function handleAddStudent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student data from request body
    const {
      student_name,
      parent_name,
      phone_number,
      email,
      subscription_price,
      subscription_number,
    } = request.body;

    // Query to insert a new student record into the students table
    const insertQuery =
      'INSERT INTO students (student_name, parent_name, phone_number, email, subscription_price, subscription_number) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the query with student data as parameters
    const [insertResults] = await promisePool.execute(insertQuery, [
      student_name,
      parent_name,
      phone_number,
      email,
      subscription_price,
      subscription_number,
    ]);

    // Fetch the inserted student record from the database
    const insertResultsJson: any = insertResults;
    const studentId = insertResultsJson.insertId;

    const selectQuery = 'SELECT * FROM students WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(
      selectQuery,
      [studentId]
    );

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.status(201).send(selectResults[0]);
    } else {
      // If no student is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
