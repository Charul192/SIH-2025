import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Yeh line change hui hai */}
        <div className="flex min-h-screen flex-col items-center justify-start pt-25 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-950/30 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
            Live tracking for smarter travel
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Real-Time Routes,
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Real-Life Freedom
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            Take the guesswork out of your commute. Our app helps you see live
            vehicle locations, get accurate arrival times, and plan your journey
            with confidence using our intuitive real-time tracking system.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/bus-tracker"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Start Tracking Now
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}