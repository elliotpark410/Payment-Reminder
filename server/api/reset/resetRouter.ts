import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleAddReset } from "./handleAddReset";
import { handleDeleteReset } from "./handleDeleteReset";
import { handleEditReset } from "./handleEditReset";
import { handleGetReset } from "./handleGetReset";
import { handleGetResets } from "./handleGetResets";
import { handleGetStudentResets } from "./handleGetStudentResets";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to add a new reset
router.post(
  "/add",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddReset(request, response, next);
  }
);

// Route to delete a reset by ID
router.put(
  "/delete/:reset_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleDeleteReset(request, response, next);
  }
);

// Route to edit a reset by ID
router.put(
  "/:reset_id",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleEditReset(request, response, next);
  }
);

// Route to get a reset by ID
router.get(
  "/:reset_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetReset(request, response, next);
  }
);

// Route to get all resets
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetResets(request, response, next);
  }
);

// Route to get resets for a student
router.get(
  "/student/:student_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetStudentResets(request, response, next);
  }
);

export default router;
