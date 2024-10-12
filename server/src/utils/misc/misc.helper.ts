export class ApiError extends Error{
    status:number = 500;
    constructor(status:number,name:string,message:string,stack?:string | undefined){
        super();
        this.status = status;
        this.name = name;
        this.message = message; 
        this.stack = stack;        
    }
 }