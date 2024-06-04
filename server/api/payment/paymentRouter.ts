import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

// Handler imports
import { handleAddPayment } from "./handleAddPayment";
import { handleDeletePayment } from "./handleDeletePayment";
import { handleEditPayment } from "./handleEditPayment";
import { handleGetPayment } from "./handleGetPayment";
import { handleGetPayments } from "./handleGetPayments";
import { handleGetStudentPayments } from "./handleGetStudentPayments";

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to add a new payment
router.post(
  "/add",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleAddPayment(request, response, next);
  }
);

// Route to delete a payment by ID
router.delete(
  "/delete/:payment_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleDeletePayment(request, response, next);
  }
);

// Route to edit a payment by ID
router.put(
  "/:payment_id",
  jsonParser,
  async (request: Request, response: Response, next: NextFunction) => {
    await handleEditPayment(request, response, next);
  }
);

// Route to get a payment by ID
router.get(
  "/:payment_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetPayment(request, response, next);
  }
);

// Route to get all payments
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetPayments(request, response, next);
  }
);

// Route to get payments for a student
router.get(
  "/student/:student_id",
  async (request: Request, response: Response, next: NextFunction) => {
    await handleGetStudentPayments(request, response, next);
  }
);

export default router;
