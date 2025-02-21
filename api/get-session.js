// api/get-session.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.VITE_READ_ACCESS_TOKEN;
const url = "https://api.themoviedb.org/3/authentication/guest_session/new";

app.post('/api/get-session', async (req, res) => {
  const { request_token, approved } = req.body;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ request_token, approved }),
    });
    
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener token", error });
  }
});

export default app;