import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APIProvider, Map, AdvancedMarker, useMap, Pin } from '@vis.gl/react-google-maps';

// --- IMPORTANT: Apni .env file mein API keys daalein ---
const API_KEY = import.meta.env.VITE_API_KEY;
const MAP_ID = import.meta.env.VITE_MAPS_KEY;
const API_BASE_URL = "http://localhost:8000";

// --- Components for Map Markers ---
const PulsingMarker = () => (
    <div className="relative w-6 h-6">
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
        <div className="absolute inset-1 rounded-full bg-blue-600 border-2 border-white"></div>
    </div>
);

// Helper function to safely get coordinates from different formats
const getCoords = (locationObj) => {
    if (!locationObj) return null;
    if (typeof locationObj.lat === 'number' && typeof locationObj.lng === 'number') {
        return { lat: locationObj.lat, lng: locationObj.lng };
    }
    return null;
};

// --- NEW: Combined component for Animation and Route Drawing ---
const AnimatedRoute = ({ route }) => {
    const map = useMap();
    const [position, setPosition] = useState(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!map || !window.google?.maps?.geometry?.encoding || !route || route.length < 2) return;

        let legIndex = -1;
        const now = new Date();

        // Find the current leg of the journey
        for (let i = 0; i < route.length - 1; i++) {
            const departureTime = route[i].departureTime;
            const arrivalTime = route[i + 1].arrivalTime;
            if (departureTime && arrivalTime && now >= departureTime && now <= arrivalTime) {
                legIndex = i;
                break;
            }
        }

        // If no active leg is found, place the bus at its final destination
        if (legIndex === -1) {
            const finalCoords = getCoords(route[route.length - 1]?.location);
            if (finalCoords) setPosition(finalCoords);
            return;
        }

        const animateLeg = async (currentLegIndex) => {
            if (currentLegIndex >= route.length - 1) {
                const finalCoords = getCoords(route[route.length - 1]?.location);
                if (finalCoords) setPosition(finalCoords);
                return;
            }

            const originStop = route[currentLegIndex];
            const destinationStop = route[currentLegIndex + 1];
            const originCoords = getCoords(originStop?.location);
            const destinationCoords = getCoords(destinationStop?.location);

            if (!originCoords || !destinationCoords) {
                console.error("Missing location data for leg:", currentLegIndex);
                animateLeg(currentLegIndex + 1); // Skip to the next leg
                return;
            }

            try {
                const params = new URLSearchParams({
                    origin: `${originCoords.lat},${originCoords.lng}`,
                    destination: `${destinationCoords.lat},${destinationCoords.lng}`,
                });
                const res = await fetch(`${API_BASE_URL}/api/directions?${params.toString()}`);
                if (!res.ok) throw new Error('Failed to fetch directions');
                const data = await res.json();
                
                const path = window.google.maps.geometry.encoding.decodePath(data.polyline);

                // Draw the polyline for the current leg
                const polyline = new window.google.maps.Polyline({
                    path: path,
                    map: map,
                    strokeColor: "#8E44AD",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                });

                const departureTime = originStop.departureTime;
                const legDuration = data.duration * 1000;
                const timeElapsed = Date.now() - departureTime.getTime();
                const initialProgress = Math.min(timeElapsed / legDuration, 1);
                const startTime = performance.now() - (legDuration * initialProgress);

                const step = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / legDuration, 1);
                    
                    if (progress < 1) {
                        const nextIndex = Math.floor(progress * (path.length - 1));
                        setPosition(path[nextIndex]);
                        animationFrameRef.current = requestAnimationFrame(step);
                    } else {
                        polyline.setMap(null); // Clean up the old polyline
                        animateLeg(currentLegIndex + 1);
                    }
                };
                
                animationFrameRef.current = requestAnimationFrame(step);

            } catch (error) {
                console.error("Failed to animate leg:", error);
            }
        };

        animateLeg(legIndex);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [map, route]);

    return position ? (
        <AdvancedMarker position={position}>
            <PulsingMarker />
        </AdvancedMarker>
    ) : null;
};

export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { busId, route } = location.state || {};
  
  const initialCoords = getCoords(route?.[0]?.location);
  const finalCoords = getCoords(route?.[route.length - 1]?.location);
  const initialCenter = initialCoords || { lat: 31.6339, lng: 74.8722 }; // Default to Amritsar

  if (!API_KEY || API_KEY.includes("YOUR_")) {
    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl text-red-500 mb-4 text-center">Google Maps API Key Nahi Hai</h1>
            <p className="text-center text-gray-300">Kripya apni `.env` file mein `VITE_API_KEY` set karein.</p>
            <button onClick={() => navigate(-1)} className="mt-6 rounded-md bg-blue-600 px-4 py-2">Waapis Jayein</button>
        </div>
    );
  }

  if (!busId || !route) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl text-red-500 mb-4">Tracking data uplabdh nahi hai.</h1>
        <button onClick={() => navigate(-1)} className="rounded-md bg-blue-600 px-4 py-2">Waapis Jayein</button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black">
      <APIProvider apiKey={API_KEY} libraries={['geometry']}>
        <Map
          defaultZoom={12}
          defaultCenter={initialCenter}
          mapId={MAP_ID}
          gestureHandling={'greedy'}
        >
          {/* Component to handle animation and route drawing */}
          <AnimatedRoute route={route} />

          {/* Markers for the start and end of the entire journey */}
          {initialCoords && (
            <AdvancedMarker position={initialCoords}>
                <Pin background={'#22c55e'} glyphColor={'#fff'} borderColor={'#16a34a'} />
            </AdvancedMarker>
          )}
          {finalCoords && (
            <AdvancedMarker position={finalCoords}>
                <Pin background={'#ef4444'} glyphColor={'#fff'} borderColor={'#dc2626'} />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate(-1)} className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90">
          &larr; Back
        </button>
      </div>
    </div>
  );
}