import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// --- IMPORTANT BADLAV: Polyline yahan se import nahi hoga ---
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

// --- API Keys (apni .env file se) ---
const API_KEY = import.meta.env.VITE_API_KEY;
const MAP_ID = import.meta.env.VITE_MAPS_KEY;

// Helper function to get coordinates
const getCoords = (locationObj) => {
  if (!locationObj) return null;
  if (typeof locationObj.lat === 'number' && typeof locationObj.lng === 'number') {
    return { lat: locationObj.lat, lng: locationObj.lng };
  }
  // Firestore GeoPoint format support
  if (locationObj._latitude && locationObj._longitude) {
    return { lat: locationObj._latitude, lng: locationObj._longitude };
  }
  return null;
};


// --- CORRECTED COMPONENT: Route ko manually draw karne ke liye ---
// Yeh component koi JSX return nahi karega, balki seedhe map par draw karega.
const RouteDrawer = ({ encodedPolyline }) => {
  const map = useMap();

  useEffect(() => {
    // Agar map ya polyline string nahi hai, to kuch na karein
    if (!map || !encodedPolyline) {
      return;
    }

    // Ensure the geometry library is loaded
    if (!window.google?.maps?.geometry?.encoding) {
        console.error("Google Maps Geometry library not loaded.");
        return;
    }

    // 1. Polyline ko decode karein
    const decodedPath = window.google.maps.geometry.encoding.decodePath(encodedPolyline);

    // 2. Google Maps ki original Polyline class ka object banayein
    const poly = new window.google.maps.Polyline({
      path: decodedPath,
      strokeColor: '#4285F4',
      strokeOpacity: 0.8,
      strokeWeight: 6,
    });

    // 3. Polyline ko map par set (draw) karein
    poly.setMap(map);

    // 4. Map ke view ko route ke anusaar adjust karein
    const bounds = new window.google.maps.LatLngBounds();
    decodedPath.forEach(point => bounds.extend(point));
    map.fitBounds(bounds, 100); // 100px padding

    // 5. Cleanup: Jab component unmount ho ya polyline badle, to purani line ko map se hatayein
    return () => {
      poly.setMap(null);
    };

  }, [map, encodedPolyline]); // Yeh effect tabhi chalega jab map ya polyline badlega

  return null; // Yeh component UI mein kuch render nahi karta
};


export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { route: initialRouteData } = location.state || {};
  
  const [encodedPolyline, setEncodedPolyline] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialCoords = getCoords(initialRouteData?.[0]?.location);
  const finalCoords = getCoords(initialRouteData?.[initialRouteData.length - 1]?.location);
  const initialCenter = initialCoords || { lat: 28.7041, lng: 77.1025 }; // Default to Delhi

  useEffect(() => {
    if (!initialCoords || !finalCoords || !API_KEY) return;

    const fetchRoute = async () => {
      setIsLoading(true);
      const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
      const requestBody = {
        origin: { location: { latLng: { latitude: initialCoords.lat, longitude: initialCoords.lng } } },
        destination: { location: { latLng: { latitude: finalCoords.lat, longitude: finalCoords.lng } } },
        travelMode: 'DRIVE',
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.routes && data.routes[0].polyline) {
          setEncodedPolyline(data.routes[0].polyline.encodedPolyline);
        } else {
            console.error("Polyline not found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching route polyline:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoute();
  }, [initialCoords, finalCoords]);

  if (!API_KEY || API_KEY.includes("YOUR_")) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-red-500 mb-4 text-center">Google Maps API Key Nahi Hai</h1>
        <p className="text-center text-gray-300">Kripya apni `.env` file mein `VITE_API_KEY` set karein.</p>
        <button onClick={() => navigate(-1)} className="mt-6 rounded-md bg-blue-600 px-4 py-2">Waapis Jayein</button>
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
          {/* Start and End Markers */}
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

          {/* RouteDrawer component ko yahan render karein */}
          {/* Yeh UI mein kuch nahi dikhayega, lekin map par line draw kar dega */}
          <RouteDrawer encodedPolyline={encodedPolyline} />
        </Map>
      </APIProvider>
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate(-1)} className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90">
          &larr; Back
        </button>
      </div>
       {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-4 rounded-lg">
            Loading Route...
        </div>
      )}
    </div>
  );
}