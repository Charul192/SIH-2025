import React, { useState, useEffect, useContext } from "react"; // FIX: useContext import kiya
import axios from "axios";
import { AppContext } from "../../context/AppContext"; // FIX: AppContext import kiya

const base_URL = "http://localhost:8000";

export default function Schedule() {
  // FIX: AppContext se Dark theme ka state liya
  const { Dark } = useContext(AppContext);

  const [bus, setBus] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [bus_num, setBusnum] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper functions remain unchanged.
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
    // FIX: Main container ab theme-aware hai
    <div className={`w-full min-h-screen transition-colors duration-300 ${Dark ? 'bg-black text-slate-50' : 'bg-white text-slate-900'}`}>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            View Bus Schedules
          </h1>
          {/* FIX: Paragraph ka color dynamic hai */}
          <p className={`mx-auto mt-4 max-w-2xl text-xl ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
            Find the complete schedule for any bus by entering its number.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form onSubmit={handleQuery} className="flex items-center gap-x-4">
            {/* FIX: Input field ab theme-aware hai */}
            <input
              type="text"
              name="search"
              value={bus_num}
              onChange={(e) => setBusnum(e.target.value)}
              className={`block w-full rounded-md border-0 py-3 px-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg sm:leading-6 ${Dark ? 'bg-white/5 text-white ring-white/10' : 'bg-slate-100 text-slate-900 ring-slate-300'}`}
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
            <p className={`text-center text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>Loading schedule...</p>
          )}

          {error && (
            // FIX: Error message box ab theme-aware hai
            <div className={`rounded-lg border p-8 text-center ${Dark ? 'border-red-700/40 bg-red-900/20 text-red-300' : 'border-red-400 bg-red-100 text-red-700'}`}>
              <p className="text-xl">{error}</p>
            </div>
          )}

          {!isLoading && !error && !bus && (
            // FIX: Initial placeholder box ab theme-aware hai
            <div className={`rounded-lg border border-dashed p-8 text-center ${Dark ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-500'}`}>
              <p className="text-xl">Enter a bus number to view its schedule.</p>
            </div>
          )}

          {bus && (
            <div>
              <h2 className="text-4xl font-bold">Schedule Details</h2>
              <p className={`mt-2 text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
                Showing schedule for:{" "}
                <span className={`font-medium ${Dark ? 'text-white' : 'text-slate-900'}`}>
                  {`Bus ${bus.busId} - ${bus.headsign}`}
                </span>
              </p>
              <p className={`mt-1 text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
                Frequency:{" "}
                <span className={`font-medium ${Dark ? 'text-white' : 'text-slate-900'}`}>
                  {formatFrequency(bus.frequency)}
                </span>
              </p>

              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {/* FIX: Table dividers ab theme-aware hain */}
                    <table className={`min-w-full divide-y ${Dark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold sm:pl-0">Stop Name</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold">Arrival</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold">Departure</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${Dark ? 'divide-gray-800' : 'divide-gray-200'}`}>
                        {schedule.map((stop) => (
                          <tr key={stop.name}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium sm:pl-0">
                              {stop.name}
                            </td>
                            {/* FIX: Table cell text color ab dynamic hai */}
                            <td className={`whitespace-nowrap px-3 py-4 text-lg ${Dark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {formatTime(stop.arrivalTime)}
                            </td>
                            <td className={`whitespace-nowrap px-3 py-4 text-lg ${Dark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {formatTime(stop.departureTime)}
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
      </div>
    </div>
  );
}