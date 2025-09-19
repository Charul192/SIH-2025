import React, { useState } from "react";
import axios from 'axios'; // Import axios

export default function PlanyouTrip() {
  // State for form inputs, results, loading, and errors
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [foundRoutes, setFoundRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // To know if a search has been made

  // Form submission handler
  const handleFindBuses = async (event) => {
    event.preventDefault(); // Prevent page reload
    setIsLoading(true);
    setError(null);
    setSearched(true);
    setFoundRoutes([]);

    try {
      // Call your backend API
      const response = await axios.get(`http://localhost:3001/find-routes`, {
        params: { from: startLocation, to: endLocation }
      });
      setFoundRoutes(response.data.routes || []);
    } catch (err) {
      setError("Could not fetch routes. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper component to render a single bus card
  const BusCard = ({ bus }) => (
    <div className="rounded-lg border border-gray-700 bg-zinc-900 p-4 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="text-lg font-bold text-white">Bus {bus.busId} ({bus.operator})</p>
        <p className="text-sm text-gray-400">Route: {bus.route[0].name} &rarr; {bus.route[bus.route.length - 1].name}</p>
      </div>
      <div className="mt-3 sm:mt-0 text-left sm:text-right">
        <p className="text-sm text-gray-300">ETA: {bus.eta}</p>
        <a href="#" className="text-sm font-semibold text-blue-400 hover:text-blue-300">View Details &rarr;</a>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Plan Your Trip</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Enter your starting point and final destination to find all available bus routes.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <form className="space-y-6" onSubmit={handleFindBuses}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="start-location" className="block text-sm font-medium leading-6 text-white">From</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="start-location"
                    id="start-location"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Enter starting bus stop..."
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="end-location" className="block text-sm font-medium leading-6 text-white">To</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="end-location"
                    id="end-location"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Enter final destination..."
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                {isLoading ? "Searching..." : "Find Buses"}
              </button>
            </div>
          </form>
        </div>

        {/* --- DYNAMIC RESULTS SECTION --- */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-center">Available Routes</h2>
          <div className="mt-6 space-y-4">
            {isLoading && <p className="text-center text-gray-400">Finding the best routes for you...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!isLoading && !error && searched && foundRoutes.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center text-gray-500">
                <p>No direct or connecting buses found for this route.</p>
              </div>
            )}

            {!isLoading && !error && foundRoutes.map((route, index) => {
              if (route.type === 'direct') {
                return <BusCard key={route.busId} bus={route} />;
              }
              if (route.type === 'connection') {
                return (
                  <div key={index} className="rounded-lg border border-purple-500 bg-zinc-900 p-4 space-y-3">
                    <p className="text-center font-bold text-lg">Connecting Route via {route.transferPoint}</p>
                    <BusCard bus={route.leg1} />
                    <p className="text-center text-gray-400">-- Change buses at {route.transferPoint} --</p>
                    <BusCard bus={route.leg2} />
                  </div>
                );
              }
              return null;
            })}

            {!searched && !isLoading && (
               <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center text-gray-500">
                 <p>Enter your locations to find available buses.</p>
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}