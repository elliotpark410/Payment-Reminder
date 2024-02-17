import { Router, Request, Response } from "express";
import userRouter from "./api/user/userRouter";
import lessonRouter from "./api/lesson/lessonRouter";
import textRouter from "./api/text/textRouter";

const router = Router()

// Set up routers
router.use("/user", userRouter);
router.use("/lesson", lessonRouter);
router.use("/text", textRouter);

export default router;


