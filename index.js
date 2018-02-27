const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req,res) =>{
//     res.status(200).send(req.query['hub.challenge'])
//     console.log('res',req.query['hub.challenge'])
// })

let port = 3001
app.listen(3001, () => console.log('Webhook server is listening, port ' + port));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);