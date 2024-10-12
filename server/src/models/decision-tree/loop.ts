import { Action } from "./action";

export class Loop implements Action {
    constructor(private action: Action, private times: number) { }

    execute(): void {
        for (let i = 0; i < this.times; i++) {
            this.action.execute();
        }
    }
}