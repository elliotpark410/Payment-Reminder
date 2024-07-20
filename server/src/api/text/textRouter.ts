import express, { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import bodyParser from 'body-parser';

// Handler imports
import { handleSendText } from './handleSendText';
import { handleGetStudentText } from './handleGetStudentText';
import { handleGetAllText } from './handleGetAllText';
import { handleGetText } from './handleGetText';

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use((req, res, next) => {
  (req as AuthenticatedRequest).user = (req as any).user;
  next();
});

router.post(
  '/send',
  jsonParser,
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleSendText(request, response, next);
  },
);

router.get(
  '/:text_id',
  jsonParser,
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleGetText(request, response, next);
  },
);

router.get(
  '/student/:student_id',
  jsonParser,
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleGetStudentText(request, response, next);
  },
);

router.get(
  '/',
  jsonParser,
  async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    await handleGetAllText(request, response, next);
  },
);

export default router;
