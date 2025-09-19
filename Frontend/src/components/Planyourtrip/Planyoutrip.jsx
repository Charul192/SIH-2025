import React from "react";

// Helper for Icons (from Heroicons)
const LocationPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.654-.369.623-.359 1.445-.835 2.343-1.441a10.025 10.025 0 002.146-2.25C17.75 11.202 18 10.205 18 9.25C18 6.097 14.433 3.5 10 3.5S2 6.097 2 9.25c0 .955.25 1.952.76 3.142a10.025 10.025 0 002.146 2.25c.898.606 1.72 1.082 2.343 1.441.255.146.468.269.654.369a5.741 5.741 0 00.281.14l.018.008.006.003zM10 11.25a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const SwapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
);

const BusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5H9m9-4.5H9m8.25-9l-1.32-2.288A2.25 2.25 0 0014.25 3H9.75a2.25 2.25 0 00-1.93 1.212L6.5 7.5m11.5 0H6.5" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export default function PlanyouTrip() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Plan Your Trip
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Enter your starting point and final destination to find all
            available bus routes.
          </p>
        </div>

        {/* --- Updated Form Section --- */}
        <div className="mx-auto mt-12 max-w-3xl">
          <form className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-2">
              {/* From Input */}
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <LocationPinIcon />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border-0 bg-white/5 py-4 pl-11 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg"
                  placeholder="From..."
                />
              </div>

              {/* Swap Button */}
              <button type="button" className="rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white">
                <SwapIcon />
              </button>

              {/* To Input */}
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <LocationPinIcon />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border-0 bg-white/5 py-4 pl-11 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-lg"
                  placeholder="To..."
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                Find Buses
              </button>
            </div>
          </form>
        </div>

        {/* --- Updated Results Section --- */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-4xl font-bold text-center">
            Available Buses
          </h2>

          <div className="mt-8 space-y-6">
            {/* Result Card 1 */}
            <div className="group rounded-xl border border-gray-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-900">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div className="rounded-lg bg-gray-700 p-3">
                    <BusIcon />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">Bus 42A</p>
                    <p className="text-lg text-gray-400 mt-1">
                      Express: Downtown to University
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end sm:justify-center">
                  <div className="flex items-center text-lg text-gray-300">
                    <ClockIcon />
                    <span>Approx. 25 mins</span>
                  </div>
                  <button className="mt-0 rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition-transform group-hover:scale-105 sm:mt-2">
                    Select Route
                  </button>
                </div>
              </div>
            </div>

            {/* Result Card 2 */}
            <div className="group rounded-xl border border-gray-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-900">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div className="rounded-lg bg-gray-700 p-3">
                    <BusIcon />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">Bus 12</p>
                    <p className="text-lg text-gray-400 mt-1">
                      Local: Downtown to University
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end sm:justify-center">
                  <div className="flex items-center text-lg text-gray-300">
                    <ClockIcon />
                    <span>Approx. 40 mins</span>
                  </div>
                  <button className="mt-0 rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition-transform group-hover:scale-105 sm:mt-2">
                    Select Route
                  </button>
                </div>
              </div>
            </div>
            
            {/* Empty State Card */}
            <div className="rounded-xl border-2 border-dashed border-gray-800 p-12 text-center text-gray-500">
              <p className="text-lg">Enter your locations to find available buses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}