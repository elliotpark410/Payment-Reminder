import { NextFunction, Request, Response } from "express";

export async function handleSendText(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("handleSendText")
  } catch (err) {
    console.log(err)
    next(err);
  }
}
