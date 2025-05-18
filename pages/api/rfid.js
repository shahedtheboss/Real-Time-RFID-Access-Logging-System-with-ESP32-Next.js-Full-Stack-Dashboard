import { applyCors } from '../../lib/cors';

let accessLog = [];

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method === 'GET') {
    res.status(200).json(accessLog);
  } else if (req.method === 'POST') {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ message: 'UID is required' });
    }

    const entry = {
      uid,
      timestamp: new Date().toISOString(),
    };

    accessLog.push(entry);
    console.log('Access logged:', entry);
    res.status(200).json({ message: 'Access recorded' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
