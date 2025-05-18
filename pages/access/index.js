import { useEffect, useState } from 'react';

export default function Home() {
  const [accessLog, setAccessLog] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccessLog = async () => {
    try {
      const res = await fetch('/api/rfid'); // 🟢 GET request
      const data = await res.json();
      setAccessLog(data.reverse()); // Most recent first
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch access log:', error);
    }
  };

  useEffect(() => {
    fetchAccessLog();
    const interval = setInterval(fetchAccessLog, 3000); // Refresh every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>RFID Access Log</h1>
      {loading ? (
        <p>Loading log...</p>
      ) : accessLog.length === 0 ? (
        <p>No access records yet.</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem',
          backgroundColor: '#f9f9f9'
        }}>
          <thead style={{ backgroundColor: '#333', color: '#fff' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>UID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {accessLog.map((entry, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{entry.uid}</td>
                <td style={{ padding: '10px' }}>{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
