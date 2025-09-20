import React from "react";
import { Link } from "react-router-dom";

// Helper components for icons.
const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06l-3.103 3.104-1.535-1.536a.75.75 0 00-1.06 1.06l2.064 2.065a.75.75 0 001.06 0l3.64-3.64z" clipRule="evenodd" />
  </svg>
);

// THIS IS THE CORRECTED COMPONENT
const FeatureIcon = ({ color, path }) => (
  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-white">
      {path}
    </svg>
  </div>
);


// Main Home Component
export default function Home() {
  return (
    <div className="w-full bg-transparent text-white">
      <main>
        {/* =============================================================== */}
        {/* ===================== HERO SECTION ============================ */}
        {/* =============================================================== */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
            <div className="mx-auto max-w-2xl text-center">
              
              {/* === THIS IS THE NEW & IMPROVED BADGE === */}
              <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-blue-500/80 p-px shadow-lg shadow-blue-500/30">
                <div className="inline-flex items-center justify-center rounded-full bg-gray-950/90 px-5 py-1.5">
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium text-gray-300">
                    Live tracking for smarter travel
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Real-Time Routes,
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Real-Life Freedom
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
                Take the guesswork out of your commute. Our app helps you see live vehicle locations, get accurate arrival times, and plan your journey with confidence using our intuitive tracking system.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/bus-tracker"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  Start Tracking Now <span className="ml-2">→</span>
                </Link>
                <Link
                  to="/about"
                  className="text-base font-semibold leading-7"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* ===================== FEATURES SECTION ======================== */}
        {/* =============================================================== */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 sm:mt-40">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need for a Smarter Commute</h2>
            <p className="mt-4 text-lg text-gray-400">
              Features designed to tackle unpredictable schedules and long waits, even in low-bandwidth areas.
            </p>
          </div>
          {/* Feature Cards Grid */}
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1: Live Bus Tracking */}
            <Link to="/bus-tracker" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-blue-500" path={<>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </>} />
                <h3 className="font-semibold">Live Bus Tracking</h3>
                <p className="text-gray-400">See the exact, real-time location of your bus on a map. No more guessing if it's late or has already passed.</p>
              </div>
            </Link>

            {/* Card 2: Accurate Arrival Times */}
            <Link to="/plan-your-trip" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-red-500" path={<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />} />
                <h3 className="font-semibold">Accurate Arrival Times</h3>
                <p className="text-gray-400">Get reliable Estimated Times of Arrival (ETAs) for your stop, so you can plan your time and avoid long waits.</p>
              </div>
            </Link>
            
            {/* Card 3: Route & Schedule Info */}
            <Link to="/schedule" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-yellow-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-yellow-500" path={<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" />} />
                <h3 className="font-semibold">Route & Schedule Info</h3>
                <p className="text-gray-400">Access complete route details and updated timetables for all buses. Know every stop and timing at your fingertips.</p>
              </div>
            </Link>

            {/* Card 4: Low-Bandwidth Friendly */}
            <Link to="/about" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-purple-500" path={<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />} />
                <h3 className="font-semibold">Low-Bandwidth Friendly</h3>
                <p className="text-gray-400">Our platform is optimized to work seamlessly on slow internet, ensuring accessibility for everyone in smaller towns.</p>
              </div>
            </Link>

          </div>
        </div>

        {/* =============================================================== */}
        {/* ===================== WHY CHOOSE US SECTION =================== */}
        {/* =============================================================== */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 sm:mt-40 mb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transforming Commutes in Growing Cities</h2>
            <p className="mt-4 text-lg text-gray-400">
              We're dedicated to solving transport inefficiencies in tier-2 towns, promoting sustainable travel and reducing commuter stress.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
            {/* Benefits List */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <CheckIcon className="h-8 w-8 flex-shrink-0 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Save Your Precious Time</h3>
                  <p className="mt-1 text-gray-400">Stop wasting time at the bus stop. With precise ETAs, you can arrive just in time to catch your bus, every single time.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckIcon className="h-8 w-8 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Travel with Confidence</h3>
                  <p className="mt-1 text-gray-400">By knowing exactly when the next bus is arriving, you can choose less crowded options and avoid the stress of unpredictable travel.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckIcon className="h-8 w-8 flex-shrink-0 text-purple-500" />
                <div>
                  <h3 className="text-lg font-semibold">For Smarter Cities</h3>
                  <p className="mt-1 text-gray-400">Our platform provides valuable data to local authorities, helping them optimize routes and improve public transport for everyone.</p>
                </div>
              </div>
            </div>
            {/* CTA Card */}
            <div className="relative rounded-2xl p-8 bg-slate-900 border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 h-48 w-48 bg-teal-500/20 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                <div className="relative text-center">
                    <div className="inline-block p-4 bg-gray-800 rounded-xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-teal-400">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25M3.375 14.25v-1.875a3.375 3.375 0 013.375-3.375h1.5a1.125 1.125 0 001.125-1.125v-1.5a3.375 3.375 0 01-3.375-3.375H3.375m15.75 9L12 12m0 0l-3.375-3.375M12 12l3.375 3.375M12 12l3.375-3.375M12 12l-3.375 3.375" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Join the Movement</h3>
                    <p className="mt-2 text-gray-400">
                        Be a part of building a more reliable and sustainable public transport system for India's growing cities.
                    </p>
                    <div className="mt-6 flex justify-center gap-x-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> For Commuters</span>
                        <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> For Authorities</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
