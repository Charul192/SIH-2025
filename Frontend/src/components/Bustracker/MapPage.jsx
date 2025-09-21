import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";

// Ensure this path is correct for your project structure
import { initMap, startBusAnimation } from '../../utils/map-animation.ts';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function MapPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const mapRef = useRef(null);
    const { busData } = location.state || {};

    useEffect(() => {
        // This check ensures mapRef.current exists before we use it
        if (!API_KEY || !mapRef.current) return;

        const loader = new Loader({
            apiKey: API_KEY,
            version: "weekly",
            libraries: ["marker", "routes", "geometry"]
        });

        loader.load().then(() => {
            // We pass mapRef.current here, which is the actual <div> element
            initMap(mapRef.current);
            if (busData) {
                startBusAnimation(busData);
            }
        }).catch(e => {
            console.error("Failed to load Google Maps API", e);
            alert("Could not load the map. Please check the console for errors.");
        });
    }, [busData]);

    if (!API_KEY || API_KEY.includes("YOUR_")) {
        return (
            <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-red-500 mb-4 text-center">Google Maps API Key Not Found</h1>
                <p className="text-center text-gray-300">Please set `VITE_API_KEY` in your `.env` file and restart the server.</p>
                <button onClick={() => navigate(-1)} className="mt-6 rounded-md bg-blue-600 px-4 py-2 font-semibold">Go Back</button>
            </div>
        );
    }

    if (!busData) {
        return (
            <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-yellow-400 mb-4 text-center">No Bus Data Provided</h1>
                <p className="text-center text-gray-300">Please go back to the tracker and search for a bus first.</p>
                <button onClick={() => navigate(-1)} className="mt-6 rounded-md bg-blue-600 px-4 py-2 font-semibold">Go Back</button>
            </div>
        );
    }
    
    return (
        <div className="relative w-full h-screen bg-gray-800">
            {/* --- THIS IS THE FIX --- */}
            {/* The 'ref' prop receives the entire 'mapRef' object */}
            <div ref={mapRef} className="w-full h-full" />

            <div className="absolute top-4 left-4 z-10">
                <button onClick={() => navigate(-1)} className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90 transition-colors cursor-pointer">
                    &larr; Back to Tracker
                </button>
                <br />
                <br />
                
                <button onClick={() => (window.location.reload())} className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90 transition-colors cursor-pointer">
                    Refresh
                </button>
            </div>
        </div>
    );
}