import { Action } from "./action";

export class SendSms implements Action {
    constructor(
        private phoneNumber: string
    ) {

    }
    execute(): void {
        console.log(`SMS sent to ${this.phoneNumber} number`);
    }
}