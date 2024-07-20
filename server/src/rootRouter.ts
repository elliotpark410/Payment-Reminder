import { Router, Request, Response } from 'express';
import studentRouter from './api/student/studentRouter';
import lessonRouter from './api/lesson/lessonRouter';
import resetRouter from './api/reset/resetRouter';
import paymentRouter from './api/payment/paymentRouter';
import textRouter from './api/text/textRouter';
import userRouter from './api/user/userRouter';
import { authenticateToken } from './middleware/apiAuth';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Park Vocal Studio Management API' });
});

// Set up routers
router.use('/user', userRouter);
router.use('/student', authenticateToken, studentRouter);
router.use('/lesson', authenticateToken, lessonRouter);
router.use('/reset', authenticateToken, resetRouter);
router.use('/payment', authenticateToken, paymentRouter);
router.use('/text', authenticateToken, textRouter);

export default router;
