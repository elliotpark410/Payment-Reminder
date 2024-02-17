import { NextFunction, Request, Response } from "express";

export async function handleGetLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleGetLesson")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
