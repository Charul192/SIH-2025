import React from "react";

export default function Schedule() {
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
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
          <form className="space-y-6">
            <div className="flex items-center gap-x-4">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                placeholder="Enter bus number or stop name..."
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
              >
                Find
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold">Schedule Details</h2>
          <p className="mt-1 text-gray-400">
            Showing schedule for:{" "}
            <span className="font-medium text-white">Bus 42A</span>
          </p>

          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                      >
                        Stop Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Scheduled Arrival
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Central Station
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        10:05 AM
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        Departed
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        City Hall
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        10:12 AM
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        Approaching
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Grand Library
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        10:18 AM
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        Upcoming
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        University Campus
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        10:25 AM
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        Upcoming
                      </td>
                    </tr>
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
