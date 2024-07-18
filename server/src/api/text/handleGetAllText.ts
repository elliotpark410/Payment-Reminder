import { NextFunction, Request, Response } from 'express';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetAllText(request: Request, response: Response, next: NextFunction) {
  try {
    // Query to select all texts associated with a student id
    const query = 'SELECT * FROM texts';

    // Execute the query with the student ID as a parameter
    const [results] = await promisePool.execute<RowDataPacket[]>(query);

    // If successful, send the students data in the response
    response.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
