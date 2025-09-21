import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';

// --- Icon Components ---
const CheckIcon = () => <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>;
const BusIcon = () => <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25A3.375 3.375 0 0015.75 10.5h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 009.75 4.5H4.5m15 15v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H4.5" /></svg>;
const CircleIcon = () => <div className="h-2.5 w-2.5 rounded-full bg-white" />;

const API_URL = "http://localhost:8000";

const formatFirestoreBusData = (busData) => {
    const toDate = (timestamp) => timestamp?._seconds ? new Date(timestamp._seconds * 1000) : null;
    return {
        ...busData,
        startTime: toDate(busData.startTime),
        route: busData.route.map(stop => ({
            ...stop,
            arrivalTime: toDate(stop.arrivalTime),
            departureTime: toDate(stop.departureTime),
            location: { lat: stop.location._latitude, lng: stop.location._longitude }
        })),
    };
};

export default function Bustracker() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [foundBus, setFoundBus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) return;
        
        setIsLoading(true);
        setFoundBus(null);

        try {
            const response = await fetch(`${API_URL}/api/bus/${searchTerm}`);
            if (!response.ok) throw new Error('Bus not found');
            const busData = await response.json();
            setFoundBus(formatFirestoreBusData(busData));
        } catch (error) {
            console.error("Error fetching bus data:", error.message);
            setFoundBus(false);
        } finally { setIsLoading(false); }
    };

    const handleViewOnMap = () => {
        if (!foundBus || foundBus.route.length < 2) {
            alert("Cannot view on map. Route data is incomplete.");
            return;
        }
        navigate('/map', { state: { busData: foundBus } });
    };

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
            if (stop.arrivalTime && stop.departureTime && currentTime >= stop.arrivalTime && currentTime <= stop.departureTime) {
                const next = route[i + 1];
                return { routeName, statusText: `At ${stop.name}`, nextStopInfo: next ? next.name : "Final Destination", etaInfo: next ? `${Math.ceil((next.arrivalTime.getTime() - currentTime.getTime()) / 60000)} mins` : "Arrived", activeStopIndex: i };
            }
            if (stop.arrivalTime && currentTime > prevStop.departureTime && currentTime < stop.arrivalTime) {
                const etaMinutes = Math.max(0, Math.ceil((stop.arrivalTime.getTime() - currentTime.getTime()) / 60000));
                return { routeName, statusText: `Between ${prevStop.name} and ${stop.name}`, nextStopInfo: stop.name, etaInfo: `${etaMinutes} min${etaMinutes !== 1 ? 's' : ''}`, activeStopIndex: i - 0.5 };
            }
        }
        
        const lastStop = route[route.length - 1];
        if (lastStop && lastStop.arrivalTime && currentTime > lastStop.arrivalTime) {
            return { routeName, statusText: "Journey Completed", nextStopInfo: "N/A", etaInfo: "N/A", activeStopIndex: route.length };
        }
        
        return { routeName, statusText: "Awaiting update...", nextStopInfo: "N/A", etaInfo: "N/A", activeStopIndex: -1 };
    }, [foundBus, currentTime]);

    return (
        <div className="w-full min-h-screen bg-gray-50 text-slate-900">
            <div className="mx-auto max-w-7xl px-4 pt-12 sm:pt-24 pb-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900">Track Your Bus</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl text-slate-600">Enter a bus number below to get its real-time location and arrival information.</p>
                </div>
                
                <div className="mx-auto mt-10 max-w-xl">
                    <form className="flex items-start gap-x-4" onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full rounded-md border-0 py-3 px-4 text-lg shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:leading-6 bg-white text-slate-900 ring-slate-300"
                            placeholder="Enter Bus Number..."
                            autoComplete="off"
                        />
                        <button type="submit" disabled={isLoading} className="flex-shrink-0 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100">
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </form>
                </div>

                <div className="mx-auto mt-16 max-w-4xl">
                    {!isLoading && foundBus === null && (
                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center text-gray-500">
                            <p className="text-xl font-medium">Enter a bus number to track its journey.</p>
                        </div>
                    )}
                    {isLoading && <p className="text-center text-lg text-slate-600 animate-pulse">Tracking bus...</p>}
                    {foundBus === false && (
                         <div className="rounded-lg border p-8 text-center border-red-400 bg-red-50 text-red-800">
                            <p className="text-xl font-semibold">Bus Not Found</p>
                            <p className="mt-2">Please check the bus number and try again.</p>
                         </div>
                    )}
                    {foundBus && (
                        <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
                            <div className="sm:flex sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{`Bus ${foundBus.busId} - ${foundBus.headsign}`}</h2>
                                    <p className="mt-2 text-lg text-slate-600">Operated by {foundBus.operator}</p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                                    <p className="text-2xl font-medium text-green-600">On Time</p>
                                    <p className="mt-1 text-base text-slate-500">Last updated: {formatTime(currentTime)}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-center border-t border-slate-200 pt-6">
                                <p className="text-lg font-medium text-slate-700">{busStatus.routeName}</p>
                                <button onClick={handleViewOnMap} className="rounded-md bg-blue-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    View on Map
                                </button>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 border-t border-slate-200 pt-6 sm:grid-cols-3">
                                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200"><p className="text-base font-medium text-slate-500">Current Status</p><p className="mt-1 text-xl font-semibold text-slate-900">{busStatus.statusText}</p></div>
                                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200"><p className="text-base font-medium text-slate-500">Next Stop</p><p className="mt-1 text-xl font-semibold text-slate-900">{busStatus.nextStopInfo}</p></div>
                                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200"><p className="text-base font-medium text-slate-500">ETA for Next Stop</p><p className="mt-1 text-xl font-semibold text-slate-900">{busStatus.etaInfo}</p></div>
                            </div>
                            <div className="mt-6 border-t border-slate-200 pt-6">
                                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-slate-900">Route Timeline</h3>
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        {foundBus.route.map((stop, stopIdx) => {
                                            const activeIndex = Math.floor(busStatus.activeStopIndex);
                                            const isCompleted = stopIdx < activeIndex;
                                            const isBusBetweenStops = busStatus.activeStopIndex > activeIndex && stopIdx === activeIndex;
                                            const isInProgress = stopIdx === activeIndex && !isBusBetweenStops;
                                            const isLastStop = stopIdx === foundBus.route.length - 1;
                                            const statusStyles = {
                                                completed: { line: 'bg-blue-600', ring: 'bg-blue-600', icon: <CheckIcon /> },
                                                inProgress: { line: 'bg-green-500', ring: 'bg-green-500 animate-pulse', icon: <BusIcon /> },
                                                upcoming: { line: 'bg-slate-300', ring: 'bg-slate-400', icon: <CircleIcon /> },
                                            };
                                            let currentStatus = 'upcoming';
                                            if (isCompleted || busStatus.activeStopIndex >= foundBus.route.length) currentStatus = 'completed';
                                            if (isInProgress || isBusBetweenStops) currentStatus = 'inProgress';
                                            const { line, ring, icon } = statusStyles[currentStatus];
                                            return (
                                                <li key={stop.name}>
                                                    <div className="relative pb-8">
                                                        {!isLastStop && <span className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${line}`} aria-hidden="true" />}
                                                        <div className="relative flex items-start space-x-4">
                                                            <div><span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${ring}`}>{icon}</span></div>
                                                            <div className="min-w-0 flex-1 md:flex justify-between items-center pt-1">
                                                                <div><p className="text-lg font-semibold text-slate-900">{stop.name}</p></div>
                                                                <div className="mt-1 md:mt-0 text-base text-left md:text-right text-slate-500"><p>Arrival: {formatTime(stop.arrivalTime)}</p><p>Departure: {formatTime(stop.departureTime)}</p></div>
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