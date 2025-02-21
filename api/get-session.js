// api/get-session.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const API_KEY = process.env.VITE_READ_ACCESS_TOKEN;
  const url = "https://api.themoviedb.org/3/authentication/guest_session/new";
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
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: "Error al obtener token", error });
  }
}
