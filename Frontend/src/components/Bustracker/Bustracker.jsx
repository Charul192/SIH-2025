import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";

// --- Icon Components ---
const CheckIcon = () => <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>;
const BusIcon = () => <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25A3.375 3.375 0 0015.75 10.5h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 009.75 4.5H4.5m15 15v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H4.5" /></svg>;
const CircleIcon = () => <div className="h-2.5 w-2.5 rounded-full bg-white" />;

// --- Constants ---
const API_URL = "http://localhost:8000";

// --- Helper Functions ---
const formatFirestoreBusData = (busData) => {
    const toDate = (timestamp) => timestamp ? new Date(timestamp._seconds * 1000) : null;
    return {
        ...busData,
        startTime: toDate(busData.startTime),
        route: busData.route.map(stop => ({
            ...stop,
            arrivalTime: toDate(stop.arrivalTime),
            departureTime: toDate(stop.departureTime),
            location: { lat: stop.location._latitude, lng: stop.location._longitude }
        })),
        currentLocation: { lat: busData.currentLocation._latitude, lng: busData.currentLocation._longitude },
    };
};

export default function Bustracker() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [foundBus, setFoundBus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [suggestions, setSuggestions] = useState([]);
    const [allBusIds, setAllBusIds] = useState([]);

    // --- Effects ---
    useEffect(() => {
        const fetchBusIds = async () => {
            try {
                const response = await fetch(`${API_URL}/api/buses`);
                const buses = await response.json();
                setAllBusIds(buses.map(bus => String(bus.busId)));
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

    // --- Event Handlers ---
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            setSuggestions(allBusIds.filter(id => id.toLowerCase().startsWith(value.toLowerCase())));
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
            setFoundBus(formatFirestoreBusData(busData));
        } catch (error) {
            console.error("Error fetching bus data:", error.message);
            setFoundBus(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewOnMap = () => {
        if (!foundBus || foundBus.route.length < 2) {
            alert("Cannot view on map. Route data is incomplete.");
            return;
        }

        const animationData = {
            busNumber: foundBus.busId,
            operator: foundBus.operator,
            headsign: foundBus.headsign,
            route: {
                start: { name: foundBus.route[0].name },
                end: { name: foundBus.route[foundBus.route.length - 1].name }
            }
        };
        
        navigate('/map', { state: { busData: animationData } });
    };

    // --- Memoized Calculations ---
    const formatTime = (date) => date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : "--:--";

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
            
            if (currentTime >= stop.arrivalTime && currentTime <= stop.departureTime) {
                const next = route[i + 1];
                return { routeName, statusText: `At ${stop.name}`, nextStopInfo: next ? next.name : "Final Destination", etaInfo: next ? `${Math.ceil((next.arrivalTime - currentTime) / 60000)} mins` : "Arrived", activeStopIndex: i };
            }
            if (currentTime > prevStop.departureTime && currentTime < stop.arrivalTime) {
                const etaMinutes = Math.max(0, Math.ceil((stop.arrivalTime - currentTime) / 60000));
                return { routeName, statusText: `Between ${prevStop.name} and ${stop.name}`, nextStopInfo: stop.name, etaInfo: `${etaMinutes} min${etaMinutes !== 1 ? 's' : ''}`, activeStopIndex: i - 0.5 };
            }
        }
        
        const lastStop = route[route.length - 1];
        if (lastStop && currentTime > lastStop.arrivalTime) {
            return { routeName, statusText: "Journey Completed", nextStopInfo: "N/A", etaInfo: "N/A", activeStopIndex: route.length };
        }
        
        return { routeName, statusText: "Awaiting update...", nextStopInfo: "N/A", etaInfo: "N/A", activeStopIndex: -1 };
    }, [foundBus, currentTime]);
const {Dark}=useContext(AppContext)
    // --- Render ---
    return (
        <div className={`w-full min-h-screen ${Dark? 'bg-black text-white':'bg-white text-slate-900'}`}>
            <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Track Your Bus</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">Enter a bus number below to get its real-time location and arrival information.</p>
                </div>
                
                {/* Search Form */}
                <div className="mx-auto mt-10 max-w-xl">
                    <form className="flex items-start gap-x-4" onSubmit={handleSearch}>
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-3 px-4 text-lg shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:leading-6 bg-slate-100 text-slate-900 ring-slate-300"
                                placeholder="Enter Bus Number..."
                                autoComplete="off"
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-white">
                                    {suggestions.map((id) => (
                                        <li key={id} onClick={() => handleSuggestionClick(id)} className="relative cursor-pointer select-none py-2 px-4 text-gray-900 hover:bg-slate-100">
                                            {id}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button type="submit" disabled={isLoading} className="flex-shrink-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100">
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="mx-auto mt-16 max-w-4xl">
                    {!isLoading && foundBus === null && (
                        <div className="rounded-lg border border-dashed p-8 text-center border-gray-300 text-gray-500">
                            <p className="text-xl">Enter a bus number to track its real-time location.</p>
                        </div>
                    )}

                    {isLoading && <p className="text-center text-lg text-slate-600">Tracking bus...</p>}

                    {foundBus === false && (
                         <div className="rounded-lg border p-8 text-center border-red-400 bg-red-100 text-red-700">
                            <p className="text-xl">Bus not found. Please check the Bus Number and try again.</p>
                         </div>
                    )}
                    
                    {foundBus && (
                        <div className="rounded-lg border p-6 border-slate-200 bg-slate-50">
                            {/* Bus Info Header */}
                            <div className="sm:flex sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold text-slate-900">{`Bus ${foundBus.busId} - ${foundBus.headsign}`}</h2>
                                    <p className="mt-2 text-lg text-slate-600">Operated by {foundBus.operator}</p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                                    <p className="text-2xl font-medium text-green-400">On Time</p>
                                    <p className="mt-1 text-lg text-slate-500">Last updated: {formatTime(currentTime)}</p>
                                </div>
                            </div>
                            
                            {/* Map Button */}
                            <div className="mt-6 flex justify-between items-center border-t pt-6 border-slate-200">
                                <p className="text-lg font-medium text-slate-600">{busStatus.routeName}</p>
                                <button onClick={handleViewOnMap} className="rounded-md bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500">
                                    View on Map
                                </button>
                            </div>

                            {/* Status Cards & Timeline... */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}