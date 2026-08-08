import express from 'express';
import router from '../routes/taskRoutes';

const app = express();
app.use(express.json());
app.use('/tasks', router);

export { app };