import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// CHANGED: Removed the incorrect Polyline import, added useMap
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

const API_KEY = "AIzaSyARSqYspchcCQGDRl1izB0_GaqQ6A2Yz6w";
const MAPS_KEY = "43b870af48005989f31cfc28";

// A simple SVG for a bus icon (no changes)
const BusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V15C20 16.1046 19.1046 17 18 17H16V20C16 20.5523 15.5523 21 15 21H13C12.4477 21 12 20.5523 12 20V17H8V20C8 20.5523 7.55228 21 7 21H5C4.44772 21 4 20.5523 4 20V17H6C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H18C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17H6C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H4V6Z" />
        <path d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H7C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8H6Z" />
        <path d="M17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10H18C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8H17Z" />
    </svg>
);

// NEW: A dedicated component to draw the Polyline on the map
const RoutePolyline = ({ path }) => {
  const map = useMap();
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    if (!map || !path) return;

    // If a polyline already exists, remove it
    if (polyline) {
      polyline.setMap(null);
    }
    
    // Create a new Google Maps Polyline
    const newPolyline = new google.maps.Polyline({
      path: path,
      strokeColor: "#8E44AD", // Purple
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    // Add the new polyline to the map
    newPolyline.setMap(map);
    setPolyline(newPolyline);

    // Cleanup function to remove the polyline when the component unmounts
    return () => {
      newPolyline.setMap(null);
    };
  }, [map, path]); // Re-run effect if map instance or path changes

  return null; // This component doesn't render any HTML itself
};


export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const busLocation = location.state?.location;
  const busRoute = location.state?.route;

  if (!busLocation || !busRoute) {
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

  const pathCoordinates = busRoute.map(stop => ({ lat: stop.lat, lng: stop.lng }));

  return (
    <div className="relative w-full h-screen bg-black">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultZoom={12}
          defaultCenter={busLocation}
          mapId={MAPS_KEY}
          className="w-full h-full"
          gestureHandling={'greedy'}
        >
          {/* Use the new RoutePolyline component */}
          <RoutePolyline path={pathCoordinates} />

            <AdvancedMarker position={busLocation}>
                <div className="relative w-6 h-6">
                    {/* Outer pulsing circle */}
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-50 animate-ping"></div>
                    {/* Inner solid circle */}
                    <div className="absolute inset-1 rounded-full bg-blue-600 border-2 border-white"></div>
                </div>
            </AdvancedMarker>
        </Map>
      </APIProvider>

      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
}