import { NextFunction, Request, Response } from "express";

export async function handleDeleteUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleDeleteUser")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
