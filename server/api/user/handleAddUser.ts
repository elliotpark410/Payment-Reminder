import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';

export async function handleAddUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleAddUser")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
