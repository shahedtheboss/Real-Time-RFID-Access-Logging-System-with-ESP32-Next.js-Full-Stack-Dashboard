export default async function handler(req, res) {
  // Handle GET request
  if (req.method === 'GET') {
    // const { ip } = req.query;
    const ip = '103.242.22.202'; // Extract IP from query parameters
    
    if (!ip) {
      return res.status(400).json({ error: 'IP address is required in query' });
    }

    try {
      // Fetch location data from the ip-api
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();

      if (data.status === 'fail') {
        return res.status(400).json({ error: 'Failed to get location data' });
      }

      // Return the location data in the response
      res.status(200).json({
        lat: data.lat,
        lon: data.lon,
        city: data.city,
        country: data.country,
        isp: data.isp,
        ip: data.query,
      });
    } catch (error) {
      // Handle errors gracefully
      res.status(500).json({ error: 'Server error, failed to fetch data' });
    }
  } 
  
  // Handle POST request
  else if (req.method === 'POST') {
    const { ip } = req.body; // Extract IP from the POST request body

    if (!ip) {
      return res.status(400).json({ error: 'IP address is required in body' });
    }

    try {
      // Fetch location data from the ip-api
      const response = await fetch(`https://api.ipify.org/?format=json/${ip}`);
      const data = await response.json();

      if (data.status === 'fail') {
        return res.status(400).json({ error: 'Failed to get location data' });
      }

      // Return the location data in the response
      res.status(200).json({
        lat: data.lat,
        lon: data.lon,
        city: data.city,
        country: data.country,
        isp: data.isp,
        ip: data.query,
      });
    } catch (error) {
      // Handle errors gracefully
      res.status(500).json({ error: 'Server error, failed to fetch data' });
    }
  } 
  
  // If neither GET nor POST
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
