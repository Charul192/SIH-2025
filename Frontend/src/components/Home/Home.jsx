import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

// Helper components
const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06l-3.103 3.104-1.535-1.536a.75.75 0 00-1.06 1.06l2.064 2.065a.75.75 0 001.06 0l3.64-3.64z" clipRule="evenodd" />
  </svg>
);

const FeatureIcon = ({ color, path }) => (
  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-white">
      {path}
    </svg>
  </div>
);


// Main Home Component
export default function Home() {
  const { Dark } = useContext(AppContext);

  return (
    <div className={`w-full transition-colors duration-300 ${Dark ? 'bg-black text-slate-50' : 'bg-white text-slate-900'}`}>
      <main>
        {/* =============================================================== */}
        {/* ===================== HERO SECTION ============================ */}
        {/* =============================================================== */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
            <div className="mx-auto max-w-2xl text-center">
              
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
              <p className={`mx-auto mt-6 max-w-xl text-lg leading-8 ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
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
            <p className={`mt-4 text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Features designed to tackle unpredictable schedules and long waits, even in low-bandwidth areas.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* ========= CARD CONTENT HAS BEEN UPDATED HERE ========= */}
            {[
              { to: "/bus-tracker", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></>, color: "bg-blue-500", hover: "hover:border-blue-500/50", title: "Bus Tracker", desc: "See the exact, real-time location of your bus on a map. No more guessing if it's late or has already passed." },
              { to: "/plan-your-trip", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />, color: "bg-red-500", hover: "hover:border-red-500/50", title: "Plan your trip", desc: "Get reliable ETAs and see all route options to plan your journey from start to finish." },
              { to: "/schedule", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" />, color: "bg-yellow-500", hover: "hover:border-yellow-500/50", title: "Schedule", desc: "Access complete route details and updated timetables for all buses. Know every stop and timing at your fingertips." },
              { to: "/about", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />, color: "bg-purple-500", hover: "hover:border-purple-500/50", title: "About Us", desc: "Learn about our mission to improve commutes. Our platform is optimized for low-bandwidth areas, ensuring accessibility for all." }
            ].map((card) => (
              <Link key={card.to} to={card.to} className="block rounded-xl">
                <div className={`h-full space-y-3 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${card.hover} ${Dark ? 'border border-white/10 bg-white/5 hover:bg-white/10' : 'border border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                  <FeatureIcon color={card.color} path={card.icon} />
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className={`${Dark ? 'text-slate-400' : 'text-slate-600'}`}>{card.desc}</p>
                </div>
              </Link>
            ))}

          </div>
        </div>

        {/* =============================================================== */}
        {/* ===================== WHY CHOOSE US SECTION =================== */}
        {/* =============================================================== */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 sm:mt-40 mb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transforming Commutes in Growing Cities</h2>
            <p className={`mt-4 text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
              We're dedicated to solving transport inefficiencies in tier-2 towns, promoting sustainable travel and reducing commuter stress.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-6 lg:gap-12">
              {[
                  { iconColor: "text-green-500", title: "Save Your Precious Time", desc: "Stop wasting time at the bus stop. With precise ETAs, you can arrive just in time to catch your bus, every single time." },
                  { iconColor: "text-blue-500", title: "Travel with Confidence", desc: "By knowing exactly when the next bus is arriving, you can choose less crowded options and avoid the stress of unpredictable travel." },
                  { iconColor: "text-purple-500", title: "For Smarter Cities", desc: "Our platform provides valuable data to local authorities, helping them optimize routes and improve public transport for everyone." }
              ].map((benefit) => (
                  <div key={benefit.title} className="flex max-w-xs gap-4">
                      <CheckIcon className={`h-8 w-8 flex-shrink-0 ${benefit.iconColor}`} />
                      <div>
                          <h3 className="text-lg font-semibold">{benefit.title}</h3>
                          <p className={`mt-1 ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>{benefit.desc}</p>
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}