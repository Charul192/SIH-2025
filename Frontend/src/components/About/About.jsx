import React from "react";

const FeatureIcon = ({ path }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/50">
    <svg
      className="h-6 w-6 text-blue-400"
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
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Bringing{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Predictability
            </span>{" "}
            to Public Transport.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-300">
            For millions in India's growing tier-2 cities, the daily commute is
            a challenge defined by uncertainty. We are dedicated to solving this
            problem by bringing clarity and real-time information to our local
            bus networks.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              The Daily Wait: A Known Frustration
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              In our cities, unpredictable bus schedules lead to long waits,
              overcrowded buses, and significant wasted time. This isn't just an
              inconvenience; it's a barrier to reliable travel.
            </p>
            <p className="mt-4 text-lg text-gray-300">
              The{" "}
              <span className="font-bold text-white">
                Urban Mobility India Report 2024
              </span>{" "}
              highlights this, stating that over 60% of commuters face delays
              due to the lack of real-time information. This forces a reliance
              on private vehicles, worsening the traffic and pollution that
              affects us all.
            </p>
          </div>
          <div className="aspect-[3/2] w-full">
            <img
              className="h-full w-full rounded-2xl bg-gray-700 object-cover"
              src="https://images.unsplash.com/photo-1620773662373-59617639b740?q=80&w=2832&auto=format&fit=crop"
              alt="People waiting at a bus stop in India"
            />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center tracking-tight sm:text-4xl">
            Our Solution: Clarity Through Technology
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <FeatureIcon path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M21 10.5c0 7.142-7.5 11.25-10.5 11.25S0 17.642 0 10.5 4.714 0 10.5 0s10.5 3.358 10.5 10.5z" />
              <h3 className="mt-5 text-xl font-semibold">Live GPS Tracking</h3>
              <p className="mt-2 text-gray-400">
                Our platform integrates GPS technology to show you the exact
                location of your bus on a map in real-time. Know where your ride
                is, always.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FeatureIcon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              <h3 className="mt-5 text-xl font-semibold">
                Accurate ETAs & Routes
              </h3>
              <p className="mt-2 text-gray-400">
                Receive precise Estimated Arrival Times (ETAs) for your stop.
                View detailed route information to plan your journey with
                complete confidence.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FeatureIcon path="M3.75 4.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zM8.25 4.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zM12.75 4.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zM17.25 4.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zM21.75 4.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15z" />
              <h3 className="mt-5 text-xl font-semibold">
                Optimized for Everyone
              </h3>
              <p className="mt-2 text-gray-400">
                We understand the need for accessibility. Our platform is
                optimized for low-bandwidth environments to ensure it works
                reliably, even in smaller towns.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            The Impact We Aim to Create
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-300">
            By enhancing the commuter experience, we aim to promote sustainable
            public transport. Our goal is a future with less traffic, reduced
            pollution, and a community that confidently relies on its local
            transport. We are building a tool for commuters, a partner for local
            transport authorities, and a step towards smarter cities.
          </p>
        </div>
      </div>
    </div>
  );
}
