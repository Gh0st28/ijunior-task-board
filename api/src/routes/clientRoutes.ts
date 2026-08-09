import { Router } from "express";
import { index, show, store, destroy } from "../controllers/clientController";

const clientRouter = Router();

clientRouter.get('/', index);
clientRouter.get('/:id', show);
clientRouter.post('/', store);
clientRouter.delete('/:id', destroy);

export default clientRouter;