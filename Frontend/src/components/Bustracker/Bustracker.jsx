import React, { useState, useEffect, useMemo, useContext } from "react"; // FIX: useContext import kiya
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext"; // FIX: AppContext import kiya

const CheckIcon = () => <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>;
const BusIcon = () => <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25A3.375 3.375 0 0015.75 10.5h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 009.75 4.5H4.5m15 15v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H4.5" /></svg>;
const CircleIcon = () => <div className="h-2.5 w-2.5 rounded-full bg-white" />;

const API_URL = "http://localhost:8000";

const formatFirestoreBusData = (busData) => {
  const toDate = (timestamp) => timestamp ? new Date(timestamp._seconds * 1000) : null;
  return {
    ...busData,
    startTime: toDate(busData.startTime),
    route: busData.route.map(stop => ({
      ...stop,
      arrivalTime: toDate(stop.arrivalTime),
      departureTime: toDate(stop.departureTime),
      location: {
          lat: stop.location._latitude,
          lng: stop.location._longitude
      }
    })),
    currentLocation: {
      lat: busData.currentLocation._latitude,
      lng: busData.currentLocation._longitude,
    },
  };
};

export default function Bustracker() {
  const { Dark } = useContext(AppContext); // FIX: Get theme state from context
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [foundBus, setFoundBus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);
  const [allBusIds, setAllBusIds] = useState([]);

  useEffect(() => {
    const fetchBusIds = async () => {
      try {
        const response = await fetch(`${API_URL}/api/buses`);
        const buses = await response.json();
        const ids = buses.map(bus => String(bus.busId));
        setAllBusIds(ids);
      } catch (error) {
        console.error("Failed to fetch bus list for suggestions:", error);
      }
    };
    fetchBusIds();
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allBusIds.filter(id => id.startsWith(value));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id) => {
      setSearchTerm(id);
      setSuggestions([]);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setFoundBus(null);
    setSuggestions([]);


    try {
      const response = await fetch(`${API_URL}/api/bus/${searchTerm}`);
      if (!response.ok) throw new Error('Bus not found');
      const busData = await response.json();
      const formattedBusData = formatFirestoreBusData(busData);
      setFoundBus(formattedBusData);
    } catch (error) {
      console.error("Error fetching bus data:", error.message);
      setFoundBus(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const busStatus = useMemo(() => {
    if (!foundBus) return {};
    const { route, startTime } = foundBus;
    const routeName = `Route: ${route[0]?.name || "N/A"} to ${route[route.length - 1]?.name || "N/A"}`;
    if (currentTime < startTime) {
      return { routeName, statusText: `Departs at ${formatTime(startTime)}`, nextStopInfo: route[0]?.name, etaInfo: "Not started", activeStopIndex: -1 };
    }
    for (let i = 0; i < route.length; i++) {
      const stop = route[i];
      const prevStop = route[i-1] || { name: "Start Point", departureTime: startTime };
      if (stop.arrivalTime && stop.departureTime && currentTime >= stop.arrivalTime && currentTime <= stop.departureTime) {
        const next = route[i + 1];
        return { routeName, statusText: `At ${stop.name}`, nextStopInfo: next ? next.name : "Final Destination", etaInfo: next ? `${Math.ceil((next.arrivalTime - currentTime) / 60000)} mins` : "Arrived", activeStopIndex: i };
      }
      if (currentTime > prevStop.departureTime && currentTime < stop.arrivalTime) {
        const etaMinutes = Math.max(0, Math.ceil((stop.arrivalTime - currentTime) / 60000));
        return { routeName, statusText: `Between ${prevStop.name} and ${stop.name}`, nextStopInfo: stop.name, etaInfo: `${etaMinutes} min${etaMinutes !== 1 ? 's' : ''}`, activeStopIndex: i };
      }
    }
    const lastStop = route[route.length - 1];
    if (lastStop && currentTime > lastStop.arrivalTime) {

      return { routeName, statusText: "Journey Completed", nextStopInfo: "N/A", etaInfo: "N/A", activeStopIndex: route.length };
    }
    return {};
  }, [foundBus, currentTime]);

  return (
    // FIX: Main container is now theme-aware
    <div className={`w-full min-h-screen transition-colors duration-300 ${Dark ? 'bg-black text-slate-50' : 'bg-white text-slate-900'}`}>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Track Your Bus</h1>
            {/* FIX: Paragraph text is now theme-aware */}
            <p className={`mx-auto mt-4 max-w-2xl text-xl ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>Enter a bus ID below to get its real-time location and arrival information.</p>
        </div>
        <div className="mx-auto mt-10 max-w-xl relative">
          <form className="flex items-center gap-x-4" onSubmit={handleSearch}>
            {/* FIX: Input is now theme-aware */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg sm:leading-6"
              placeholder="Enter Bus ID (e.g., 1, 2, 3...)"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-zinc-800 border border-zinc-700 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions.map((id) => (
                <li
                  key={id}
                  onClick={() => handleSuggestionClick(id)}
                  className="px-4 py-2 cursor-pointer hover:bg-zinc-700"
                >
                  {id}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          {foundBus === false && (
            // FIX: Error box is now theme-aware
             <div className={`rounded-lg border p-8 text-center ${Dark ? 'border-red-700/40 bg-red-900/20 text-red-300' : 'border-red-400 bg-red-100 text-red-700'}`}>
               <p className="text-xl">Bus not found. Please check the Bus ID and try again.</p>
             </div>
          )}
          
          {foundBus && (
            // FIX: Results card is now theme-aware
            <div className={`rounded-lg border p-6 ${Dark ? 'border-slate-700 bg-zinc-900' : 'border-slate-200 bg-slate-50'}`}>
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-4xl font-bold ${Dark ? 'text-white' : 'text-slate-900'}`}>{`Bus ${foundBus.busId} - ${foundBus.headsign}`}</h2>
                  <p className={`mt-2 text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>Operated by {foundBus.operator}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                  <p className="text-2xl font-medium text-green-400">On Time</p>
                  <p className={`mt-1 text-lg ${Dark ? 'text-slate-300' : 'text-slate-500'}`}>Last updated: {formatTime(currentTime)}</p>
                </div>
              </div>
              
              <div className={`mt-6 flex justify-between items-center border-t pt-6 ${Dark ? 'border-slate-700' : 'border-slate-200'}`}>
                <p className={`text-lg font-medium ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>{busStatus.routeName}</p>
                <button
                    onClick={() => navigate('/map', { state: { busId: foundBus.busId, route: foundBus.route } })}

                    className="rounded-md bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                    View on Map
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 border-t border-gray-700 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-lg font-medium text-gray-400">Current Status</p>
                  <p className="mt-1 text-xl font-semibold text-white">{busStatus.statusText}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-400">Next Stop</p>
                  <p className="mt-1 text-xl font-semibold text-white">{busStatus.nextStopInfo}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-400">ETA for Next Stop</p>
                  <p className="mt-1 text-xl font-semibold text-white">{busStatus.etaInfo}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-700 pt-6">
                <h3 className="text-3xl font-semibold text-white mb-4">Route Timeline</h3>

                <div className="flow-root">
                  <ul className="-mb-8">
                    {foundBus.route.map((stop, stopIdx) => {
                      const isCompleted = stopIdx < busStatus.activeStopIndex;
                      const isInProgress = stopIdx === busStatus.activeStopIndex;
                      const isLastStop = stopIdx === foundBus.route.length - 1;
                      
                      // FIX: Timeline styles are now theme-aware
                      const statusStyles = {
                        completed: { line: 'bg-blue-600', ring: 'bg-blue-600', icon: <CheckIcon /> },
                        inProgress: { line: 'bg-green-500', ring: 'bg-green-500 animate-pulse', icon: <BusIcon /> },
                        upcoming: { line: Dark ? 'bg-gray-600' : 'bg-slate-300', ring: Dark ? 'bg-gray-600' : 'bg-slate-400', icon: <CircleIcon /> },
                      };

                      let currentStatus = 'upcoming';
                      if (isCompleted || busStatus.activeStopIndex > foundBus.route.length - 1) currentStatus = 'completed';
                      if (isInProgress) currentStatus = 'inProgress';
                      if (busStatus.activeStopIndex > foundBus.route.length - 1) currentStatus = 'completed';


                      const { line, ring, icon } = statusStyles[currentStatus];

                      return (
                        <li key={stop.name}>
                          <div className="relative pb-8">
                            {!isLastStop && <span className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${line}`} aria-hidden="true" />}
                            <div className="relative flex items-start space-x-3">
                              <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ${Dark ? 'ring-zinc-900' : 'ring-slate-50'} ${ring}`}>
                                  {icon}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 md:flex justify-between items-center">
                                <div>
                                  <p className={`text-xl font-semibold ${Dark ? 'text-white' : 'text-slate-900'}`}>{stop.name}</p>
                                </div>
                                <div className={`mt-2 md:mt-0 text-lg text-left md:text-right ${Dark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  <p>Arrival: {formatTime(stop.arrivalTime)}</p>
                                  <p>Departure: {formatTime(stop.departureTime)}</p>
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