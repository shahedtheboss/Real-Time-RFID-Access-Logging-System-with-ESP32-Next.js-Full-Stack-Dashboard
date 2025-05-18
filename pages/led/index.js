import { useState } from 'react';

export default function Home() {
  const [ledState, setLedState] = useState(false);
  const [status, setStatus] = useState('');

  const toggleLed = async (turnOn) => {
    try {
      const res = await fetch('/api/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ led: turnOn }),
      });

      const data = await res.json();
      setStatus(data.message || 'Command sent');
    } catch (err) {
      console.error('Error:', err);
      setStatus('Failed to send command');
    }
  };

  const handleToggle = () => {
    const newState = !ledState;
    setLedState(newState);
    toggleLed(newState);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ESP32 LED Control</h1>
      <p>Status: <strong>{status}</strong></p>
      <button
        onClick={handleToggle}
        style={{
          padding: '10px 20px',
          backgroundColor: ledState ? 'green' : 'gray',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {ledState ? 'Turn OFF' : 'Turn ON'}
      </button>
    </div>
  );
}
