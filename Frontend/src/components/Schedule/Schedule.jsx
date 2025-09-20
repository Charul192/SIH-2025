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
    <div className="w-full min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            View Bus Schedules
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Find the complete schedule for any bus or bus stop. Enter a bus
            number or a stop name to begin.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form onSubmit={handleQuery} className="flex items-center gap-x-4">
            <input
              type="text"
              name="search"
              value={busNum}
              onChange={(e) => setBusNum(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg sm:leading-6"

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
                <span className="font-medium text-white">
        {`${bus.busId} - ${bus.headsign}`}
      </span>
              </p>
              <p className="mt-1 text-gray-400">
                Frequency:{" "}
                <span className="font-medium text-white">
        {formatFrequency(bus.frequency)}
      </span>
              </p>

              <div className="mt-8 flow-root">
                <ul className="-mb-8">
                  {schedule.map((stop, stopIdx) => {
                    // --- UPDATED: Handle Firestore timestamp or JS Date ---
                    const departureDate = stop.departureTime
                        ? stop.departureTime._seconds
                            ? new Date(stop.departureTime._seconds * 1000)
                            : new Date(stop.departureTime)
                        : null;

                    const hasDeparted =
                        departureDate && departureDate.getTime() < currentTime.getTime();
                    const isLastStop = stopIdx === schedule.length - 1;

                    return (
                        <li key={stop.name} className="mb-4">
                          <div className="flex items-center justify-between">
                <span className="text-white text-lg font-medium">
                  {stop.name}
                </span>
                            <span className="text-gray-400">
                  {hasDeparted ? "Departed" : "Upcoming"}
                </span>
                          </div>
                          {!isLastStop && <div className="ml-4 h-6 border-l border-gray-600"></div>}
                        </li>
                    );
                  })}
                </ul>
              </div>

              {/* Extra table for searchedBus */}
              {searchedBus && (
                  <div className="mt-16">
                    <h2 className="text-4xl font-bold">Schedule Details</h2>
                    <p className="mt-2 text-lg text-gray-400">
                      Showing schedule for:{" "}
                      <span className="font-medium text-white">Bus {searchedBus}</span>
                    </p>

                    <div className="mt-6 flow-root">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                            <tr>
                              <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white sm:pl-0"
                              >
                                Stop Name
                              </th>
                              <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-lg font-semibold text-white"
                              >
                                Scheduled Arrival
                              </th>
                              <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-lg font-semibold text-white"
                              >
                                Scheduled Departure
                              </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                            {schedule.map((stop) => (
                                <tr key={stop.name}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-white sm:pl-0">
                                    {stop.name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-300">
                                    {stop.arrival}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-300">
                                    {stop.departure}
                                  </td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
        )}
      </div>
    </div>
  );
}