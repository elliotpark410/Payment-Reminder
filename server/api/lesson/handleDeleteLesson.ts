import { NextFunction, Request, Response } from "express";

export async function handleDeleteLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleDeleteLesson")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
