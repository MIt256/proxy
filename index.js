import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());

// Прокси для Gemini-2 Flash
app.post('/proxy/gemini-flash', async (req, res) => {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}';

    try {
        const response = await axios.post(url, req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error from Gemini API:', error.response?.data || error.message);
        res.status(error.response?.status || 500).send(error.response?.data || { error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Gemini proxy server running on port ${PORT}`);
});