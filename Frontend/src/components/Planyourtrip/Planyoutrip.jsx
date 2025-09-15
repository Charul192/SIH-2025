import React from "react";

export default function PlanyouTrip() {
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Plan Your Trip
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Enter your starting point and final destination to find all
            available bus routes.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="start-location"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  From
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="start-location"
                    id="start-location"
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Enter starting bus stop..."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="end-location"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  To
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="end-location"
                    id="end-location"
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Enter final destination..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
              >
                Find Buses
              </button>
            </div>
          </form>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-center">
            Available Buses for Your Trip
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-gray-700 bg-zinc-900 p-4 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-white">Bus 42A</p>
                <p className="text-sm text-gray-400">
                  Route: Express - Downtown to University
                </p>
              </div>
              <div className="mt-3 sm:mt-0 text-left sm:text-right">
                <p className="text-sm text-gray-300">Approx. 25 mins</p>
                <a
                  href="#"
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-gray-700 bg-zinc-900 p-4 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-white">Bus 12</p>
                <p className="text-sm text-gray-400">
                  Route: Local - Downtown to University
                </p>
              </div>
              <div className="mt-3 sm:mt-0 text-left sm:text-right">
                <p className="text-sm text-gray-300">Approx. 40 mins</p>
                <a
                  href="#"
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center text-gray-500">
              <p>Enter your locations to find available buses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
