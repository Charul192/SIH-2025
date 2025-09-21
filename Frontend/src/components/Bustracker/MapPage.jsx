import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";

// Import our custom map animation functions from the utility file
// import { initMap, startBusAnimation } from '../';
import { initMap,startBusAnimation } from '../../utils/map-animation';
const API_KEY = import.meta.env.VITE_API_KEY;

export default function MapPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const mapRef = useRef(null);
    const { busData } = location.state || {};

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: "weekly",
            libraries: ["marker", "routes", "geometry"] // Load all necessary libraries
        });

        loader.load().then(() => {
            if (mapRef.current) {
                initMap(mapRef.current);
                if (busData) {
                    startBusAnimation(busData);
                }
            }
        }).catch(e => {
            console.error("Failed to load Google Maps API", e);
            alert("Could not load the map. Please check the console for errors.");
        });
    }, [busData]); // Rerun if busData changes to start a new animation

    // --- Render Error/Loading States ---
    if (!API_KEY || API_KEY.includes("YOUR_")) {
        return (
            <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl text-red-500 mb-4 text-center">Google Maps API Key Not Found</h1>
                <p className="text-center text-gray-300">Please set `VITE_API_KEY` in your `.env` file.</p>
                <button onClick={() => navigate(-1)} className="mt-6 rounded-md bg-blue-600 px-4 py-2">Go Back</button>
            </div>
        );
    }

    if (!busData) {
        return (
            <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl text-yellow-400 mb-4 text-center">No Bus Data Provided</h1>
                <p className="text-center text-gray-300">Please go back to the tracker and search for a bus first.</p>
                <button onClick={() => navigate(-1)} className="mt-6 rounded-md bg-blue-600 px-4 py-2">Go Back</button>
            </div>
        );
    }
    
    // --- Render Map ---
    return (
        <div className="relative w-full h-screen bg-black">
            {/* This div is the container where the Google Map will be rendered */}
            <div ref={mapRef} className="w-full h-full" />

            {/* Overlay UI Elements */}
            <div className="absolute top-4 left-4 z-10">
                <button onClick={() => navigate(-1)} className="rounded-full bg-black bg-opacity-70 px-4 py-2 text-md font-semibold text-white shadow-lg hover:bg-opacity-90 transition-colors">
                    &larr; Back to Tracker
                </button>
            </div>
        </div>
    );
}