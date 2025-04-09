require('dotenv').config();
const express = require("express");
const { fetch } = require("undici");
const app = express();
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/gemini", async (req, res) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Что-то пошло не так", details: error.message });
  }
});

app.get('/wakeup', (req, res) => {
  res.send('Работает!');
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});