import server from './app';
const PORT = process.env.PORT;
server.listen(PORT,()=>{
    // tslint:disable-next-line
    console.log('running at http://localhost:' + PORT);
})



// import { DecisionTree } from "./decision-tree";

// const action = DecisionTree.fromJSON({
//     "type": "Condition",
//     "expression": "new Date().getFullYear() === 2024",
//     "trueAction": {
//         "type": "SendSms",
//         "phoneNumber": "+1234567890"
//     },
//     "falseAction": {
//         "type": "SendEmail",
//         "sender": "noreply@example.com",
//         "receiver": "support@example.com"
//     }
// });


// const action1 = DecisionTree.fromJSON({
//     "type": "Loop",
//     "times": 10,
//     "action": {
//       "type": "SendEmail",
//       "sender": "admin@example.com",
//       "receiver": "user@example.com"
//     }
//   });
// action.execute();
// action1.execute();