import { Router} from "express";
import studentRouter from "./api/student/studentRouter";
import lessonRouter from "./api/lesson/lessonRouter";
import resetRouter from "./api/reset/resetRouter";
import paymentRouter from "./api/payment/paymentRouter";
import textRouter from "./api/text/textRouter";
import userRouter from "./api/user/userRouter";

const router = Router()

// Set up routers
router.use("/student", studentRouter);
router.use("/lesson", lessonRouter);
router.use("/reset", resetRouter);
router.use("/payment", paymentRouter);
router.use("/text", textRouter);
router.use("/user", userRouter);

export default router;


