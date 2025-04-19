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
