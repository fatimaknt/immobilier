import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import { Apartment } from '@/types';

interface MapProps {
  apartments: Apartment[];
  height?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ apartments, height = '400px' }) => {
  const defaultCenter: [number, number] = [14.716677, -17.467686]; // Dakar coordinates
  const zoom = 12;

  return (
    <div style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {apartments.map(apartment => (
          <Marker
            key={apartment.id}
            position={[apartment.location.lat, apartment.location.lng]}
          >
            <Popup>
              <Typography variant="h6" gutterBottom>
                {apartment.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {apartment.zone} • {apartment.rooms} chambres
              </Typography>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                {apartment.pricePerDay.toLocaleString()} FCFA/jour
              </Typography>
              <Button
                variant="contained"
                size="small"
                component={Link}
                href={`/apartments/${apartment.id}`}
              >
                Voir détails
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;