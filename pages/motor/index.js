import { useState } from 'react';

export default function Home() {
  const [servoPosition, setServoPosition] = useState(0); // Initial servo position (0°)
  const [status, setStatus] = useState('');

  const updateServoPosition = async (position) => {
    try {
      const res = await fetch('/api/motor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ servo_position: position }),
      });

      const data = await res.json();
      setStatus(data.message || 'Command sent');
    } catch (err) {
      console.error('Error:', err);
      setStatus('Failed to send command');
    }
  };

  const handlePositionChange = (newPosition) => {
    if (newPosition >= 0 && newPosition <= 180) {
      setServoPosition(newPosition);
      updateServoPosition(newPosition);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ESP32 Servo Control</h1>
      <p>Status: <strong>{status}</strong></p>
      <div>
        <button
          onClick={() => handlePositionChange(0)}
          style={{
            padding: '10px 20px',
            backgroundColor: servoPosition === 0 ? 'green' : 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Set to 0°
        </button>
        <button
          onClick={() => handlePositionChange(90)}
          style={{
            padding: '10px 20px',
            backgroundColor: servoPosition === 90 ? 'green' : 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Set to 90°
        </button>
        <button
          onClick={() => handlePositionChange(180)}
          style={{
            padding: '10px 20px',
            backgroundColor: servoPosition === 180 ? 'green' : 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Set to 180°
        </button>
      </div>
    </div>
  );
}
