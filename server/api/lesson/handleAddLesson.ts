import { NextFunction, Request, Response } from "express";

export async function handleAddLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleAddLesson")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
