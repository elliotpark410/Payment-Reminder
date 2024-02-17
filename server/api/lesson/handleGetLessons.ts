import { NextFunction, Request, Response } from "express";

export async function handleGetLessons(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleGetLessons")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
