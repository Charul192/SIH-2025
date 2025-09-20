import React, { useState, useEffect } from "react";
import axios from "axios";

const base_URL = "http://localhost:8000";

export default function Schedule() {
  const [bus, setBus] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [bus_num, setBusnum] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // This helper function is well-written and remains unchanged.
  const formatTime = (timeData) => {
    if (!timeData) return "--:--";
    let date;
    if (typeof timeData === 'object' && typeof timeData._seconds === 'number') {
      date = new Date(timeData._seconds * 1000);
    } else if (typeof timeData === 'string') {
      date = new Date(timeData);
    } else {
      return "--:--";
    }
    if (isNaN(date.getTime())) {
      return "--:--";
    }
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // This helper function is also fine.
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
    setError(null);
    setSchedule([]);

    try {
      const response = await axios.get(`${base_URL}/api/bus/${bus_num}`);
      setBus(response.data);
      setSchedule(response.data.route);
    } catch (err) {
      console.log(err);
      setError("Bus not found. Please check the ID and try again.");
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
            Find the complete schedule for any bus by entering its number.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form onSubmit={handleQuery} className="flex items-center gap-x-4">
            <input
              type="text"
              name="search"
              value={bus_num}
              onChange={(e) => setBusnum(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg sm:leading-6"
              placeholder="Enter bus number..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? 'Searching...' : 'Find'}
            </button>
          </form>
        </div>

        <div className="mt-16">
          {isLoading && (
            <p className="text-center text-gray-400 text-lg">Loading schedule...</p>
          )}

          {error && (
            <div className="rounded-lg border border-red-700/40 bg-red-900/20 p-8 text-center text-red-300">
                <p className="text-xl">{error}</p>
            </div>
          )}

          {!isLoading && !error && !bus && (
            <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center text-gray-500">
                <p className="text-xl">Enter a bus number to view its schedule.</p>
            </div>
          )}

          {bus && (
            <div>
              <h2 className="text-4xl font-bold">Schedule Details</h2>
              <p className="mt-2 text-lg text-gray-400">
                Showing schedule for:{" "}
                <span className="font-medium text-white">
                  {`Bus ${bus.busId} - ${bus.headsign}`}
                </span>
              </p>
              <p className="mt-1 text-lg text-gray-400">
                Frequency:{" "}
                <span className="font-medium text-white">
                  {formatFrequency(bus.frequency)}
                </span>
              </p>

              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white sm:pl-0">Stop Name</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Arrival</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Departure</th>
                          {/* REMOVED: Status table header */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {schedule.map((stop) => (
                            <tr key={stop.name}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-white sm:pl-0">
                                {stop.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-300">
                                {formatTime(stop.arrivalTime)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-300">
                                {formatTime(stop.departureTime)}
                              </td>
                              {/* REMOVED: Status table cell */}
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
      </div>
    </div>
  );
}