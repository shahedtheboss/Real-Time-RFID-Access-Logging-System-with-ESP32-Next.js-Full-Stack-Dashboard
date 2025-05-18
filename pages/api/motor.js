import { applyCors } from '../../lib/cors';

let command = { servo_position: 0 };
let lastUpdateTime = Date.now();

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method === 'GET') {
    // Auto-reset if 5 seconds passed
    if (Date.now() - lastUpdateTime > 5000) {
      command.servo_position = 0;
    }

    res.status(200).json(command);
  } else if (req.method === 'POST') {
    command = req.body;
    lastUpdateTime = Date.now(); // Refresh timer
    console.log('New servo command:', command);
    res.status(200).json({ message: 'Command updated' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
