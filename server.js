// require('dotenv').config(); 
// const { Vonage } = require('@vonage/server-sdk');

// const vonage = new Vonage({
//   apiKey: "596f115b",
//   apiSecret: "r3b1QmUdBK2p1iTt"
//   // apiKey: process.env.API_KEY,
//   // apiSecret: process.env.API_SECRET
// });

// const from = "Vonage APIs"
// // const to = "639217746831"
// const to = process.env.PHONE_NUMBER;
// // const to = "639618035299"
// const text = 'Fire has been detected by your FirSo system at 2025-04-18 10:45 PM in your Living Room. Please check your property immediately and contact emergency services if necessary.'

// async function sendSMS() {
//     await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// }

// sendSMS();

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Vonage } = require('@vonage/server-sdk');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

app.post('/send-sms', async (req, res) => {
    const { message } = req.body;

    const from = "FirSo Alert";
    const to = process.env.PHONE_NUMBER;
    const text = message || 'Fire has been detected by your FirSo system.';

    try {
        const result = await vonage.sms.send({ to, from, text });
        console.log('Message sent successfully');
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
