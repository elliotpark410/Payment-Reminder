import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleAddUser } from "./handleAddUser";
import { handleGetUser } from "./handleGetUser";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to add a new user
router.post(
  "/register",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddUser(request, response, next);
  }
);

// Route to get a user by ID
router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetUser(request, response, next);
  }
);

export default router;
