import React, { useState, useEffect } from "react";
import axios from "axios";

const base_URL = import.meta.env.VITE_API_URL;

export default function Schedule() {
  const [bus, setBus] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [bus_num, setBus_num] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // --- THIS IS THE NEW, SMARTER FUNCTION ---
  const formatTime = (timeData) => {
    if (!timeData) return "--:--";

    let date;
    // Case 1: Handle Firestore Timestamp object { _seconds: ... }
    if (typeof timeData === 'object' && typeof timeData._seconds === 'number') {
      date = new Date(timeData._seconds * 1000);
    } 
    // Case 2: Handle ISO date string "2025-09-17T10:00:00Z"
    else if (typeof timeData === 'string') {
      date = new Date(timeData);
    } 
    // If format is unknown, return placeholder
    else {
      return "--:--";
    }

    // Final check if the created date is valid
    if (isNaN(date.getTime())) {
      return "--:--";
    }

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatFrequency = (freq) => {
    if (freq === 127) return "Runs Daily";
    const days = ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'];
    let activeDays = [];
    for (let i = 0; i < 7; i++) {
      if ((freq >> i) & 1) {
        activeDays.push(days[i]);
      }
    }
    return activeDays.reverse().join(', ');
  };

  const handleQuery = async (event) => {
    event.preventDefault();
    if (!bus_num.trim()) return;

    setIsLoading(true);
    setBus(null);
    setSchedule([]);

    try {
      const response = await axios.get(`${base_URL}/api/bus/${bus_num}`);
      setBus(response.data);
      // We store the raw route data, the new formatTime will handle it
      setSchedule(response.data.route);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
        {/* Search form remains the same */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            View Bus Schedules
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Find the complete schedule for any bus or bus stop. Enter a bus
            number or a stop name to begin.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form className="flex items-center gap-x-4" onSubmit={handleQuery}>
            <input
              type="text"
              name="search"
              value={bus_num}
              onChange={(e) => setBus_num(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter bus number..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Find'}
            </button>
          </form>
        </div>
        
        {bus && schedule.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold">Schedule Details</h2>
            <p className="mt-1 text-gray-400">
              Showing schedule for:{" "}
              <span className="font-medium text-white">{`${bus.busId} - ${bus.headsign}`}</span>
            </p>
            <p className="mt-1 text-gray-400">
              Frequency:{" "}
              <span className="font-medium text-white">{formatFrequency(bus.frequency)}</span>
            </p>
            <div className="mt-8 flow-root">
              <ul className="-mb-8">
                {schedule.map((stop, stopIdx) => {
                  // --- UPDATED: This logic now also handles both data types ---
                  const departureDate = stop.departureTime ? (stop.departureTime._seconds ? new Date(stop.departureTime._seconds * 1000) : new Date(stop.departureTime)) : null;
                  const hasDeparted = departureDate && departureDate.getTime() < currentTime.getTime();
                  const isLastStop = stopIdx === schedule.length - 1;

                  return (
                    <li key={stopIdx}>
                      <div className="relative pb-8">
                        {!isLastStop && (
                          <span className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${hasDeparted ? 'bg-blue-600' : 'bg-gray-600'}`} aria-hidden="true" />
                        )}
                        <div className="relative flex items-start space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-zinc-900 ${hasDeparted ? 'bg-blue-600' : 'bg-gray-600'}`}>
                              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" /></svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 md:flex justify-between items-center">
                            <div>
                              <p className="text-md font-semibold text-white">{stop.name}</p>
                            </div>
                            <div className="mt-2 md:mt-0 text-sm text-gray-400 text-left md:text-right">
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
        )}
      </div>
    </div>
  );
}