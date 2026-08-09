import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/taskController';

const taskRouter = Router();

taskRouter.get('/', index);
taskRouter.get('/:id', show);
taskRouter.post('/', store);
taskRouter.put('/:id', update);
taskRouter.delete('/:id', destroy);

export default taskRouter;