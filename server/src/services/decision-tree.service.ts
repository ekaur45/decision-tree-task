import { DecisionTree } from "../models/decision-tree/decision-tree";

class DecisionTreeService{
    constructor() {
        
    }
    execute = (json:string)=>{
        DecisionTree.fromJSON(JSON.parse(json)).execute();
    }
}
export default DecisionTreeService;