import { NextFunction, Request, Response } from "express";

export async function handleGetUsers(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleGettUsers")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
