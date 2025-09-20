import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8000";

export default function Bustracker() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [foundBus, setFoundBus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setFoundBus(null);
    setMapCenter(null);

    try {
      const response = await fetch(`${API_URL}/api/bus/${searchTerm}`);
      if (!response.ok) throw new Error('Bus not found');
      const busData = await response.json();
      console.log(busData);

      const formattedBusData = {
        ...busData,
        startTime: new Date(busData.startTime._seconds * 1000),
        route: busData.route.map(stop => ({
          ...stop,
          arrivalTime: stop.arrivalTime ? new Date(stop.arrivalTime._seconds * 1000) : null,
          departureTime: stop.departureTime ? new Date(stop.departureTime._seconds * 1000) : null,
        }))
      };
      
      const correctMapLocation = {
          lat: busData.currentLocation._latitude,
          lng: busData.currentLocation._longitude
      };
      
      setFoundBus(formattedBusData);
      setMapCenter(correctMapLocation);

    } catch (error) {
      console.error("Error fetching bus data:", error.message);
      setFoundBus(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getBusStatus = () => {
    if (!foundBus) return {};
    const start = foundBus.route[0]?.name || "N/A";
    const end = foundBus.route[foundBus.route.length - 1]?.name || "N/A";
    const routeName = `Route: ${start} to ${end}`;
    let previousStop = { name: "Start Point", departureTime: foundBus.startTime };
    let nextStop = null;

    for (const stop of foundBus.route) {
        if (stop.arrivalTime && stop.arrivalTime.getTime() > currentTime.getTime()) {
            nextStop = stop;
            break;
        }
        previousStop = stop;
    }
    
    if (!nextStop) {
        return { routeName, currentStatus: "Journey Completed", nextStopInfo: "N/A", etaInfo: "N/A" };
    }
    
    const etaMilliseconds = nextStop.arrivalTime.getTime() - currentTime.getTime();
    const etaMinutes = Math.max(0, Math.ceil(etaMilliseconds / 60000));
    const etaInfo = `${etaMinutes} minute${etaMinutes !== 1 ? 's' : ''}`;
    const currentStatus = `Between ${previousStop.name} and ${nextStop.name}`;

    return { routeName, currentStatus, nextStopInfo: nextStop.name, etaInfo };
  };

  const { routeName, currentStatus, nextStopInfo, etaInfo } = getBusStatus();

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Track Your Bus</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">Enter a bus ID below to get its real-time location and arrival information.</p>

        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form className="flex items-center gap-x-4" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg sm:leading-6"
              placeholder="Enter Bus ID (e.g., 1, 2, 3...)"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          {foundBus === false && (
             <div className="rounded-lg border border-red-700/40 bg-red-900/20 p-8 text-center text-red-300">
                <p className="text-xl">Bus not found. Please check the Bus ID and try again.</p>
             </div>
          )}

          {foundBus && (
            <div className="rounded-lg border border-gray-700 bg-zinc-900 p-6">
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-white">{`Bus ${foundBus.busId} - ${foundBus.headsign}`}</h2>
                  <p className="mt-2 text-lg text-gray-400">Operated by {foundBus.operator}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                  <p className="text-2xl font-medium text-green-400">On Time</p>
                  <p className="mt-1 text-lg text-gray-300">Last updated: {formatTime(currentTime)}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-6">
                <p className="text-lg font-medium text-gray-400">{routeName}</p>
                <button
                  onClick={() => navigate('/map', { state: { location: mapCenter, routes: [] } })}
                  className="rounded-md bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  View on Map
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 border-t border-gray-700 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-lg font-medium text-gray-400">Current Status</p>
                  <p className="mt-1 text-xl font-semibold text-white">{currentStatus}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-400">Next Stop</p>
                  <p className="mt-1 text-xl font-semibold text-white">{nextStopInfo}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-400">ETA for Next Stop</p>
                  <p className="mt-1 text-xl font-semibold text-white">{etaInfo}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-700 pt-6">
                <h3 className="text-3xl font-semibold text-white mb-4">Route Timeline</h3>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {foundBus.route.map((stop, stopIdx) => {
                      const hasDeparted = stop.departureTime && currentTime > stop.departureTime;
                      const isLastStop = stopIdx === foundBus.route.length - 1;

                      return (
                        <li key={stop.name}>
                          <div className="relative pb-8">
                            {!isLastStop && (
                              <span className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${hasDeparted ? 'bg-blue-600' : 'bg-gray-600'}`} aria-hidden="true" />
                            )}
                            <div className="relative flex items-start space-x-3">
                              <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-zinc-900 ${hasDeparted ? 'bg-blue-600' : 'bg-gray-600'}`}>

                                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" /></svg>
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 md:flex justify-between items-center">
                                <div>

                                  <p className="text-xl font-semibold text-white">{stop.name}</p>
                                </div>
                                <div className="mt-2 md:mt-0 text-lg text-gray-400 text-left md:text-right">

                                  <p>Arrival: {formatTime(stop.arrivalTime)}</p>
                                  <p>Departure: {formatTime(stop.departureTime)}</p>
                                  <p>Delay: --</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}