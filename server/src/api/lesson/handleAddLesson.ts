import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleAddLesson(request: Request, response: Response, next: NextFunction) {
  try {
    // Extract lesson data from request body
    const { student_id, date } = request.body;

    // Query to insert a new lesson into the lessons table
    const insertQuery = `INSERT INTO lessons (student_id, date) VALUES (?, ?)`;

    // Execute the insert query
    const [insertResults] = await promisePool.execute(insertQuery, [student_id, date]);

    // Fetch the inserted lesson record from the database
    const insertResultsJson: any = insertResults;
    const lessonId = insertResultsJson.insertId;

    const selectQuery = 'SELECT * FROM lessons WHERE id = ?';

    const [selectResults] = await promisePool.execute<RowDataPacket[]>(selectQuery, [lessonId]);

    // If the record is found, send it in the response
    if (selectResults.length > 0) {
      response.status(201).send(selectResults[0]);
    } else {
      // If no lesson is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Lesson not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
