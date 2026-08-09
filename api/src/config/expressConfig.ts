import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from '../routes/authRoutes';
import taskRouter from '../routes/taskRoutes';
import clientRouter from '../routes/clientRoutes';
import serviceOrderRouter from '../routes/serviceOrderRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/tasks', authMiddleware, taskRouter);
app.use('/clients', authMiddleware, clientRouter);
app.use('/service-orders', authMiddleware, serviceOrderRouter);

export { app };
