let functions = require('firebase-functions');
let admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.disable('x-powered-by');

app.post('/CallbackUrl', (req, res) => {
    let response = {
        "ResultCode": 0,
        "ResultDesc": "Success"
    }

    res.status(200).json(response);

    let body = req.body;
    let payload = JSON.stringify(body)

    console.log(payload)

    let id =  body.Body.stkCallback.CheckoutRequestID

      const payloadSend = {
            data: {
                payload,
            },
             topic: id
        };

         return admin.messaging().send(payloadSend).catch(error=>{
         console.error(error)
         })
})

exports.api = functions.https.onRequest(app);