import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { request_token, approved } = req.body;
  const API_KEY = process.env.VITE_READ_ACCESS_TOKEN;

  if (!API_KEY) {
    return res.status(500).json({ message: 'API_KEY no está configurada' });
  }

  try {
    const response = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ request_token, approved }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.status_message || 'Error al obtener token' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error de servidor", error: error.message });
  }
}
