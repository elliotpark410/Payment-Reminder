import { NextFunction, Request, Response } from "express";

export async function handleEditLesson(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleEditLesson")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
