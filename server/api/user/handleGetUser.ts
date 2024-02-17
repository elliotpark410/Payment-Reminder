import { NextFunction, Request, Response } from "express";

export async function handleGetUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleGettUser")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
