import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

// Handler imports
import { handleAddLesson } from './handleAddLesson';
import { handleDeleteLesson } from './handleDeleteLesson';
import { handleEditLesson } from './handleEditLesson';
import { handleGetLesson } from './handleGetLesson';
import { handleGetLessons } from './handleGetLessons';
import { handleGetStudentLessons } from './handleGetStudentLessons';

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to add a new lesson
router.post(
  '/add',
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddLesson(request, response, next);
  },
);

// Route to delete a lesson by ID
router.delete(
  '/delete/:lesson_id',
  async (request: Request, response: Response, next: NextFunction) => {
    await handleDeleteLesson(request, response, next);
  },
);

// Route to edit a lesson by ID
router.put(
  '/:lesson_id',
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleEditLesson(request, response, next);
  },
);

// Route to get a lesson by ID
router.get('/:lesson_id', async (request: Request, response: Response, next: NextFunction) => {
  await handleGetLesson(request, response, next);
});

// Route to get all lessons
router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  await handleGetLessons(request, response, next);
});

// Route to get lessons for a student
router.get(
  '/student/:student_id',
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetStudentLessons(request, response, next);
  },
);

export default router;
