import { Action } from "./action";
import { Condition } from "./condition";
import { Loop } from "./loop";
import { SendEmail } from "./send-email";
import { SendSms } from "./send-sms";

export class DecisionTree {
    static fromJSON(json: any): Action {
        switch (json.type) {
            case 'SendSms':
                return new SendSms(json.phoneNumber);
            case 'SendEmail':
                return new SendEmail(json.sender, json.receiver);
            case 'Condition':
                const trueAction = this.fromJSON(json.trueAction);
                const falseAction = this.fromJSON(json.falseAction);
                return new Condition(json.expression, trueAction, falseAction);
            case 'Loop':
                const loopAction = this.fromJSON(json.action);
                return new Loop(loopAction, json.times);
            default:
                throw new Error('Unknown action type');
        }
    }

    static run(action: Action): any {
        if (action instanceof SendSms) {
            return { type: 'SendSms', phoneNumber: action['phoneNumber'] };
        } else if (action instanceof SendEmail) {
            return { type: 'SendEmail', sender: action['sender'], receiver: action['receiver'] };
        } else if (action instanceof Condition) {
            return {
                type: 'Condition',
                expression: action['expression'],
                trueAction: this.run(action['trueAction']),
                falseAction: this.run(action['falseAction']),
            };
        } else if (action instanceof Loop) {
            return { type: 'Loop', action: this.run(action['action']), times: action['times'] };
        }
        throw new Error('Unknown action type');
    }
}