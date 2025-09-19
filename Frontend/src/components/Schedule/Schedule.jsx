import React, { useState } from "react";
import axios from "axios";

const base_URL = "http://localhost:8000";

export default function Schedule() {
  const [busNum, setBusNum] = useState("");
  const [schedule, setSchedule] = useState([]); // State to hold schedule data
  const [searchedBus, setSearchedBus] = useState(""); // State to show which bus was searched

  const handleQuery = async (event) => {
    event.preventDefault();
    if (!busNum) return; // Don't search if input is empty

    try {
      const response = await axios.get(`${base_URL}/api/bus/${busNum}`);
      const routes = response.data.route;

      // Format the data before setting it to state
      const formattedRoutes = routes.map(route => {
        const arrivalTime = new Date(route.arrivalTime._seconds * 1000);
        const departureTime = new Date(route.departureTime._seconds * 1000);
        return {
          name: route.name,
          arrival: arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          departure: departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
      });

      setSchedule(formattedRoutes); // Update state with fetched data
      setSearchedBus(busNum); // Set the searched bus number for display
      
    } catch (err) {
      console.log(err);
      setSchedule([]); // Clear schedule on error
      setSearchedBus("");
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
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105"
            >
              Find
            </button>
          </form>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-bold">Schedule Details</h2>
          <p className="mt-2 text-lg text-gray-400">
            {searchedBus && (
              <>
                Showing schedule for:{" "}
                <span className="font-medium text-white">Bus {searchedBus}</span>
              </>
            )}
          </p>

          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white sm:pl-0">
                        Stop Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">
                        Scheduled Arrival
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">
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
      </div>
    </div>
  );
}