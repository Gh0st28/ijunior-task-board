import express from 'express';
import cookieParser from 'cookie-parser';
import router from '../routes/authRoutes';
import taskRouter from '../routes/taskRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', router);
app.use('/tasks', authMiddleware, taskRouter);

export { app };