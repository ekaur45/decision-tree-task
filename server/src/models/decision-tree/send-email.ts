import { Action } from "./action";

export class SendEmail implements Action {
    constructor(
        private sender: string,
        private receiver: string
    ) { }

    execute(): void {
        console.log(`Email sent from ${this.sender} to ${this.receiver}`);
        // Implement the actual email sending logic here.
    }
}