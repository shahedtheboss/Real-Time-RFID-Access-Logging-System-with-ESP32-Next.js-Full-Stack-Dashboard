import { applyCors } from '../../lib/cors';

let command = {led : false}
export default async function handler(req, res) {
    
    if (applyCors(req, res)) return;

  
    if (req.method === 'GET') {
        res.status(200).json(command);
    } else if (req.method === 'POST') {
        command = req.body; // Update the command (from frontend)
        console.log('New command set:', command);
        res.status(200).json({ message: 'Command updated' });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}