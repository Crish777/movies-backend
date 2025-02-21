import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.VITE_READ_ACCESS_TOKEN;

const url = "https://api.themoviedb.org/3/authentication/guest_session/new";


app.post("/api/get-session", async (req, res) => {
  const { request_token, approved } = req.body;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
      body: JSON.stringify({request_token, approved})
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener token", error });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;