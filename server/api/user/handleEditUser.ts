import { NextFunction, Request, Response } from "express";

export async function handleEditUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleEditUser")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
