import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleAddStudent } from "./handleAddStudent";
import { handleDeleteStudent } from "./handleDeleteStudent";
import { handleGetStudent } from "./handleGetStudent";
import { handleGetStudents } from "./handleGetStudents";
import { handleEditStudent } from "./handleEditStudent";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to add a new student
router.post(
  "/add",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddStudent(request, response, next);
  }
);

// Route to edit a student by ID
router.put(
  "/:student_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleEditStudent(request, response, next);
  }
);

// Route to delete a student by ID
router.delete(
  "/:student_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleDeleteStudent(request, response, next);
  }
);

// Route to get a student by ID
router.get(
  "/:student_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetStudent(request, response, next);
  }
);

// Route to get all students
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetStudents(request, response, next);
  }
);

export default router;
