// File: frontend/src/components/RouteFinder.jsx

import React, { useState } from 'react';

const API_BASE_URL = "http://localhost:8000";

export default function RouteFinder() {
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [routeData, setRouteData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFindRoute = async (event) => {
        event.preventDefault();
        if (!startPoint.trim() || !endPoint.trim()) {
            setError("Please enter both a start and end point.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setRouteData(null);

        try {
            const params = new URLSearchParams({
                origin: startPoint,
                destination: endPoint,
            });

            const response = await fetch(`${API_BASE_URL}/api/directions?${params.toString()}`);

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Failed to fetch the route.");
            }

            const data = await response.json();
            setRouteData(data);
            console.log("Route data received:", data);
            // Now you would pass 'data.polyline' to your map component to render it

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Find a Route</h1>
            <form onSubmit={handleFindRoute} className="flex flex-col gap-4 max-w-md">
                <input
                    type="text"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    placeholder="Start Point (e.g., Amritsar)"
                    className="p-2 rounded bg-gray-800 border border-gray-700"
                />
                <input
                    type="text"
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                    placeholder="End Point (e.g., Ludhiana)"
                    className="p-2 rounded bg-gray-800 border border-gray-700"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="p-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500"
                >
                    {isLoading ? "Finding..." : "Generate Route"}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-900 border border-red-700 rounded">
                    <p className="text-red-300">Error: {error}</p>
                </div>
            )}

            {routeData && (
                <div className="mt-4 p-4 bg-green-900 border border-green-700 rounded">
                    <h2 className="text-xl font-bold">Route Found!</h2>
                    <p>Duration: {Math.round(routeData.duration / 60)} minutes</p>
                    <p className="text-xs break-all mt-2">Polyline: {routeData.polyline}</p>
                </div>
            )}
        </div>
    )};