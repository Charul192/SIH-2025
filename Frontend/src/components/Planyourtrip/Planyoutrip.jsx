import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const base_URL = import.meta.env.VITE_API_URL;

// --- Icon Components ---
const LocationPinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.654-.369.623-.359 1.445-.835 2.343-1.441a10.025 10.025 0 002.146-2.25C17.75 11.202 18 10.205 18 9.25C18 6.097 14.433 3.5 10 3.5S2 6.097 2 9.25c0 .955.25 1.952.76 3.142a10.025 10.025 0 002.146 2.25c.898.606 1.72 1.082 2.343 1.441.255.146.468.269.654-.369a5.741 5.741 0 00.281.14l.018.008.006.003zM10 11.25a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> );
const LoadingSpinner = () => ( <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> );
const NoResultsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg> );
const TransferIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg> );
// --- NEW SWAP ICON ---
const SwapIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:rotate-90"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg> );


export default function PlanyouTrip() {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [foundRoutes, setFoundRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleFindBuses = async (event) => {
    event.preventDefault();
    if (!startLocation.trim() || !endLocation.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearched(true);
    setFoundRoutes([]);

    setTimeout(() => {
        const mockData = [
            { type: 'direct', busId: '42A', operator: 'City Transit', headsign: 'Express', route: [{name: startLocation || 'Start'}, {name: endLocation || 'End'}] },
            { type: 'connection', transferPoint: 'Central Station', leg1: { busId: '12B', operator: 'Metro Bus', headsign: 'Local', route: [{name: startLocation || 'Start'}, {name: 'Central Station'}] }, leg2: { busId: '101C', operator: 'City Transit', headsign: 'Rapid', route: [{name: 'Central Station'}, {name: endLocation || 'End'}] } },
        ];
        setFoundRoutes(mockData);
        setIsLoading(false);
    }, 1500);
  };

  // --- NEW SWAP FUNCTION ---
  const handleSwap = () => {
    setStartLocation(endLocation);
    setEndLocation(startLocation);
  };

  const BusCard = ({ bus }) => (
    <div className="rounded-lg bg-gray-50 dark:bg-zinc-800/50 p-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{bus.operator} • {bus.headsign}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">Bus {bus.busId}</p>
        </div>
        <button
          onClick={() => navigate(`/schedule?busId=${bus.busId}`)}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Details &rarr;
        </button>
      </div>
    </div>
  );

  const ConnectingRouteCard = ({ route }) => (
    <div className="rounded-xl border border-purple-500/30 dark:border-purple-500/50 bg-purple-50 dark:bg-zinc-900/50 p-6">
        <div className="flex flex-col items-center">
            <BusCard bus={route.leg1} />
            <div className="h-8 w-px bg-purple-300 dark:bg-purple-700 my-2"></div>
            <div className="flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1 text-sm text-purple-800 dark:text-purple-300">
                <TransferIcon />
                <span>Change buses at <strong>{route.transferPoint}</strong></span>
            </div>
            <div className="h-8 w-px bg-purple-300 dark:bg-purple-700 my-2"></div>
            <BusCard bus={route.leg2} />
        </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Plan Your Trip</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Enter your starting point and final destination to find all available bus routes.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form className="space-y-6" onSubmit={handleFindBuses}>
            {/* --- UPDATED FORM LAYOUT WITH SWAP BUTTON --- */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* From Input */}
              <div className="w-full">
                <label htmlFor="start-location" className="block text-lg font-medium leading-6">From</label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"> <LocationPinIcon /> </div>
                  <input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} className="block w-full rounded-md border-0 bg-gray-100 dark:bg-white/5 py-3 pl-10 pr-3 text-lg" placeholder="e.g., Amritsar" required />
                </div>
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={handleSwap}
                className="mt-8 rounded-full p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-200 dark:hover:bg-white/10"
                aria-label="Swap locations"
              >
                <SwapIcon />
              </button>
              
              {/* To Input */}
              <div className="w-full">
                <label htmlFor="end-location" className="block text-lg font-medium leading-6">To</label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"> <LocationPinIcon /> </div>
                  <input type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} className="block w-full rounded-md border-0 bg-gray-100 dark:bg-white/5 py-3 pl-10 pr-3 text-lg" placeholder="e.g., Ludhiana" required />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button type="submit" disabled={isLoading} className="flex items-center justify-center w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50">
                {isLoading && <LoadingSpinner />}
                <span className={isLoading ? 'ml-2' : ''}>Find Buses</span>
              </button>
            </div>
          </form>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl">
           <h2 className="text-4xl font-bold text-center">Available Routes</h2>
           <div className="mt-6 space-y-4">
            {isLoading && (
              <div className="flex justify-center items-center gap-3 text-lg text-gray-500 dark:text-gray-400 p-8">
                <LoadingSpinner />
                <span>Finding the best routes for you...</span>
              </div>
            )}
            {error && <p className="text-center text-lg text-red-600 dark:text-red-500">{error}</p>}
            
            {!isLoading && !error && searched && foundRoutes.length === 0 && (
              <div className="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-gray-500">
                <NoResultsIcon />
                <p className="text-lg mt-4">No direct or connecting buses found for this route.</p>
              </div>
            )}

            {!isLoading && !error && foundRoutes.map((route, index) => {
              if (route.type === 'direct') {
                return (
                    <div key={index} className="rounded-xl border border-gray-200 dark:border-gray-800 p-1">
                        <BusCard bus={route} />
                    </div>
                );
              }
              if (route.type === 'connection') {
                return <ConnectingRouteCard key={index} route={route} />;
              }
              return null;
            })}

            {!searched && !isLoading && (
               <div className="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-gray-500">
                 <p className="text-lg">Enter your locations to find available buses.</p>
               </div>
            )}
           </div>
         </div>
      </div>
    </div>
  );
}