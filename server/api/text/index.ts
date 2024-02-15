import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleSendText } from "./handleSendText";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  "/send",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleSendText(request, response, next);
  }
);

export * from "./handleSendText";

export default router;
