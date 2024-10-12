import request from 'supertest';
import server from '../server/app';
describe('Decision Tree test',()=>{
    it('Runs',async ()=>{
        const resp = await request(server).post('/api/decision-tree/execute').send({'decisionTree':JSON.stringify({
            "type": "Condition",
            "expression": "new Date().getFullYear() === 2024",
            "trueAction": {
                "type": "SendSms",
                "phoneNumber": "+1234567890"
            },
            "falseAction": {
                "type": "SendEmail",
                "sender": "noreply@example.com",
                "receiver": "support@example.com"
            }
        })});
        expect(resp).toBeDefined();
        expect(resp.status).toBe(200);
        expect(resp.body).toBeDefined();
        expect(resp.body.status).toBe(200);
    })
});