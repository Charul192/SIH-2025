// src/components/Hero.jsx

const Hero = () => {
  return (
    <main className="flex flex-col items-center text-center mt-20 sm:mt-28">
      {/* Pill-shaped badge */}
      <div className="border border-gray-700 bg-gray-800/50 rounded-full px-4 py-1.5 text-sm text-gray-300 mb-6">
        Live tracking for smarter travel
      </div>

      {/* Main Heading with Gradient */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 ">
        Real-Time Routes,
        <br />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Real-Life Freedom
        </span>
      </h1>

      {/* Subheading/Paragraph */}
      <p className="max-w-2xl text-lg text-gray-400 mb-10">
        Take the guesswork out of your commute. Our app helps you see live vehicle locations, get accurate arrival times, and plan your journey with confidence using our intuitive real-time tracking system.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity">
          Start Tracking
        </button>
      </div>
    </main>
  );
};

export default Hero;