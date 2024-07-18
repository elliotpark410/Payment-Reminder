import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetResets(request: Request, response: Response, next: NextFunction) {
  try {
    const query = `
    SELECT resets.*, students.student_name
    FROM resets
    INNER JOIN students ON resets.student_id = students.id
    `;

    // Execute the query
    const [results] = await promisePool.execute<RowDataPacket[]>(query);

    // If successful, send the lessons data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
