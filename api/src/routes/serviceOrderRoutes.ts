import { Router } from "express";
import { index, show, store, destroy } from "../controllers/serviceOrderController";

const serviceOrderRouter = Router();

serviceOrderRouter.get('/', index);
serviceOrderRouter.get('/:id', show);
serviceOrderRouter.post('/', store);
serviceOrderRouter.delete('/:id', destroy);

export default serviceOrderRouter;