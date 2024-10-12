import { Action } from "./action";

export class Condition implements Action {
    constructor(
        private expression: string, // JavaScript expression as a string
        private trueAction: Action,
        private falseAction: Action
    ) { }

    execute(): void {
        const result = eval(this.expression); // Evaluate the JS expression
        if (result) {
            this.trueAction.execute();
        } else {
            this.falseAction.execute();
        }
    }
}