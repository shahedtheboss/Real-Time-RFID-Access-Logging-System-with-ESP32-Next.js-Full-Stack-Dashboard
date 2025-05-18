import { applyCors } from '../../lib/cors';

// Store data in memory (for the duration the server runs)
let lastReceivedData = null;

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method === "GET") {
    return res.status(200).json({
      message: lastReceivedData ? lastReceivedData : "No data received yet"
    });
  }

  if (req.method === "POST") {
    const data = req.body;
    console.log("Received from ESP32:", data);

    // Save latest data to memory
    lastReceivedData = data;

    return res.status(200).json({ message: "OK" });
  }

  res.status(405).end();
}
