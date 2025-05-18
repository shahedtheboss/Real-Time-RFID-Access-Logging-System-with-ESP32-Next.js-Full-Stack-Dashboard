'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

export default function IPMap() {
  const [location, setLocation] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    });

    const fetchLocation = async () => {
      const res = await fetch('/api/ip-location'); // 🟢 GET request
      const data = await res.json();

      if (data.lat && data.lon) {
        setLocation({ lat: data.lat, lng: data.lon });
        setInfo(data);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
      <h2>Location for Hardcoded IP</h2>

      {info && (
        <div>
          <p><strong>IP:</strong> {info.ip}</p>
          <p><strong>City:</strong> {info.city}</p>
          <p><strong>Country:</strong> {info.country}</p>
          <p><strong>ISP:</strong> {info.isp}</p>
        </div>
      )}

      {location && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={10}
          style={{ height: '500px', width: '100%', marginTop: '20px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]} />
        </MapContainer>
      )}
    </div>
  );
}
