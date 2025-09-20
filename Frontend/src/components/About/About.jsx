import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext"; // FIX: AppContext import kiya

// FIX: FeatureIcon ab 'Dark' prop leta hai taaki theme ke hisaab se style badal sake
const FeatureIcon = ({ path, Dark }) => (
  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${Dark ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
    <svg
      className={`h-6 w-6 ${Dark ? 'text-blue-400' : 'text-blue-600'}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  </div>
);

export default function About() {
  // FIX: AppContext se Dark theme ka state liya
  const { Dark } = useContext(AppContext);

  return (
    // FIX: Main container ab theme-aware hai
    <div className={`w-full transition-colors duration-300 ${Dark ? 'bg-black text-slate-50' : 'bg-white text-slate-900'}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* HERO SECTION */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Real-Time Public Transport Tracking for{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Small Cities
            </span>
          </h1>
          {/* FIX: Paragraph ka color dynamic hai */}
          <p className={`mx-auto mt-6 max-w-3xl text-xl leading-8 ${Dark ? 'text-slate-300' : 'text-slate-600'}`}>
            For millions in India's growing tier-2 and tier-3 towns, the daily
            commute is a challenge defined by uncertainty. Our mission is to
            solve this by bringing clarity and real-time information to local
            bus networks, making travel stress-free and reliable.
          </p>
        </div>

        {/* OUR SOLUTION SECTION */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center tracking-tight sm:text-4xl">
            Our Solution: Clarity Through Technology
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              {/* FIX: 'Dark' prop ko FeatureIcon me pass kiya */}
              <FeatureIcon Dark={Dark} path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M21 10.5c0 7.142-7.5 11.25-10.5 11.25S0 17.642 0 10.5 4.714 0 10.5 0s10.5 3.358 10.5 10.5z" />
              <h3 className="mt-5 text-xl font-semibold">Real-Time Tracking</h3>
              <p className={`mt-2 ${Dark ? 'text-slate-400' : 'text-slate-500'}`}>
                See live bus locations on interactive maps, helping you plan your
                journey and avoid long waits.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FeatureIcon Dark={Dark} path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              <h3 className="mt-5 text-xl font-semibold">
                Journey Planner & Smart Alerts
              </h3>
              <p className={`mt-2 ${Dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Receive timely updates on upcoming stops and arrival times. Our
                system suggests the best and most convenient routes for
                efficient travel.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FeatureIcon Dark={Dark} path="M10.5 1.5H5.25A2.25 2.25 0 003 3.75v16.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25V10.5M10.5 1.5L15 6h5.25" />
              <h3 className="mt-5 text-xl font-semibold">
                Accessible For Everyone
              </h3>
              <p className={`mt-2 ${Dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Designed to work seamlessly in low-bandwidth regions. With
                support for multiple regional languages, we ensure everyone can
                use the platform comfortably.
              </p>
            </div>
          </div>
        </div>

        {/* IMPACT SECTION */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            The Impact We Aim to Create
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl text-xl leading-8 ${Dark ? 'text-slate-300' : 'text-slate-600'}`}>
            By making public transport more reliable, we aim to save valuable
            time for daily commuters and reduce travel stress. This encourages a
            shift away from private vehicles, helping to reduce both traffic

            congestion and pollution for a better quality of life.
          </p>
        </div>
      </div>
    </div>
  );
}