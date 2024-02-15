import { NextFunction, Request, Response } from "express";

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
