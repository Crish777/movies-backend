// api/get-session.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { request_token, approved } = req.body;
  const API_KEY = process.env.VITE_READ_ACCESS_TOKEN;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ request_token, approved }),
  };

  try {
    const response = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new", options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener token", error });
  }
}
