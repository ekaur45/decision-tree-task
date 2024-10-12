import { NextFunction, Request, Response } from "express";
import DecisionTreeService from "../services/decision-tree.service";

class DecisionTreeController {
    private readonly treeDecisionService: DecisionTreeService;
    constructor() {
        this.treeDecisionService = new DecisionTreeService();
    }

    execute = (req:Request,res:Response,next:NextFunction)=>{
        const body = req.body["decisionTree"];
        if(!body) return res.BadRequest(body,"No decision tree json was provided.");
        this.treeDecisionService.execute(body);
        return res.Ok({},"Decision tree executed successfuly.")
    }


}
export default DecisionTreeController;