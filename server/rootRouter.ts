import { Router} from "express";
import studentRouter from "./api/student/studentRouter";
import lessonRouter from "./api/lesson/lessonRouter";
import textRouter from "./api/text/textRouter";

const router = Router()

// Set up routers
router.use("/student", studentRouter);
router.use("/lesson", lessonRouter);
router.use("/text", textRouter);

export default router;


