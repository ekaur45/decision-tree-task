import { NextFunction, Request, Response, Router } from "express";
import DecisionTreeController from "../controllers/decision-tree.controller";
const decisionTreeRouter = Router();
const decisionTreeController = new DecisionTreeController();
decisionTreeRouter.post('/execute',decisionTreeController.execute);
export default decisionTreeRouter;