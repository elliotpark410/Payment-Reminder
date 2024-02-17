import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleAddUser } from "./handleAddUser";
import { handleDeleteUser } from "./handleDeleteUser";
import { handleGetUser } from "./handleGetUser";
import { handleGetUsers } from "./handleGetUsers";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to add a new user
router.post(
  "/add",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddUser(request, response, next);
  }
);

// Route to delete a user by ID
router.delete(
  "/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleDeleteUser(request, response, next);
  }
);

// Route to get a user by ID
router.get(
  "/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetUser(request, response, next);
  }
);

// Route to get all users
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetUsers(request, response, next);
  }
);

export default router;
