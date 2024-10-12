import { NextFunction, Request, Response, Router } from "express";
import decisionTreeRouter from "./decision-tree.router";
const apiRouter = Router();
apiRouter.use('/decision-tree',decisionTreeRouter);
export default apiRouter;