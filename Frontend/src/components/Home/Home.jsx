import React from "react";
import { Link } from "react-router-dom";

// Helper components for icons.
const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06l-3.103 3.104-1.535-1.536a.75.75 0 00-1.06 1.06l2.064 2.065a.75.75 0 001.06 0l3.64-3.64z" clipRule="evenodd" />
  </svg>
);

const FeatureIcon = ({ color, path }) => (
  // Yeh line theek kar di gayi hai
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
              
              {/* === THIS IS THE UPDATED BADGE === */}
              <div className="z-10 mb-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-gray-900/50 px-4 py-1.5 text-sm font-medium text-blue-200 backdrop-blur-sm shadow-lg shadow-blue-500/40">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
                Live tracking for smarter travel
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
                  to="/learn-more"
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need for Smart Tracking</h2>
            <p className="mt-4 text-lg text-gray-400">
              Powerful features designed to make vehicle and fleet management simple, effective, and efficient.
            </p>
          </div>
          {/* Feature Cards Grid */}
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1: Live Location Tracking */}
            <Link to="/bus-tracker" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-blue-500" path={<>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </>} />
                <h3 className="font-semibold">Live Location Tracking</h3>
                <p className="text-gray-400">Pinpoint the exact location of your vehicles in real-time on an interactive map for complete visibility.</p>
              </div>
            </Link>

            {/* Card 2: Plan Your Trip */}
            <Link to="/plan-your-trip" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-red-500" path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-12.495l-4.252 4.252a.75.75 0 01-1.06 0l-4.252-4.252M2.25 12l8.25-8.25 8.25 8.25" />} />
                <h3 className="font-semibold">Plan Your Trip</h3>
                <p className="text-gray-400">Easily plan your journey from start to finish. Find the best routes, check timings, and set reminders for your trip.</p>
              </div>
            </Link>
            
            {/* Card 3: View Schedules (Moved from 4th position) */}
            <Link to="/schedule" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-yellow-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-yellow-500" path={<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" />} />
                <h3 className="font-semibold">View Schedules</h3>
                <p className="text-gray-400">Access up-to-date bus schedules, view route timings, and check for any delays to plan your travel effectively.</p>
              </div>
            </Link>

            {/* Card 4: About Us (Moved from 3rd position) */}
            <Link to="/about" className="block rounded-xl">
              <div className="h-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10 hover:-translate-y-1">
                <FeatureIcon color="bg-purple-500" path={<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663c.11-.32.22-.627.328-.928m-9.012-3.97a4.125 4.125 0 015.548 0c.192.205.37.42.537.645m-6.085-2.29a4.125 4.125 0 00-5.548 0c-.192.205-.37.42-.537.645m6.085 2.29a4.125 4.125 0 00-5.548 0" />} />
                <h3 className="font-semibold">About Us</h3>
                <p className="text-gray-400">Learn more about our mission, the team behind this project, and the technology that powers our tracking system.</p>
              </div>
            </Link>

          </div>
        </div>

        {/* =============================================================== */}
        {/* ===================== WHY CHOOSE US SECTION =================== */}
        {/* =============================================================== */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 sm:mt-40 mb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Our Platform?</h2>
            <p className="mt-4 text-lg text-gray-400">
              Join thousands of businesses and commuters who have improved their efficiency and peace of mind.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
            {/* Benefits List */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <CheckIcon className="h-8 w-8 flex-shrink-0 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Increase Efficiency</h3>
                  <p className="mt-1 text-gray-400">Optimize routes, reduce idle time, and ensure timely arrivals to save both time and fuel costs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckIcon className="h-8 w-8 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Enhance Safety & Security</h3>
                  <p className="mt-1 text-gray-400">Monitor driver behavior, prevent unauthorized usage, and improve the security of your assets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckIcon className="h-8 w-8 flex-shrink-0 text-purple-500" />
                <div>
                  <h3 className="text-lg font-semibold">Data-Driven Decisions</h3>
                  <p className="mt-1 text-gray-400">Utilize comprehensive analytics and reports to make informed decisions and improve your operations.</p>
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
                    <h3 className="text-2xl font-bold">Optimize Your Operations Today</h3>
                    <p className="mt-2 text-gray-400">
                        Whether you manage a large fleet or just want to track a single vehicle, our platform is built to scale with your needs.
                    </p>
                    <div className="mt-6 flex justify-center gap-x-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> Free trial available</span>
                        <span className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> No long-term contracts</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}