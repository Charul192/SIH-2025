import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
const API_KEY = import.meta.env.VITE_API_KEY;
const MAPS_KEY = import.meta.env.VITE_MAPS_KEY;

export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pichle page se bheje gaye location data ko state se nikal rahe hain
  const busLocation = location.state?.location;

  if (!busLocation) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl text-red-500 mb-4">Location data not available.</h1>
        <button
          onClick={() => navigate('/')}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultZoom={15}
          defaultCenter={busLocation}
          mapId={MAPS_KEY}
          className="w-full h-full"
        >
          <AdvancedMarker position={busLocation}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)} // -1 ka matlab pichle page par jao
          className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
}