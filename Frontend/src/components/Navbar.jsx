// src/components/Navbar.jsx

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/029/887/719/small_2x/minimal-and-abstract-logo-of-bus-icon-school-bus-silhouette-isolated-design-dark-bus-vector.jpg"
          alt="Bus Track Logo"
          // Added the 'invert' class here
          className="w-8 h-8 invert"
        />
        <span className="text-xl font-bold">Bus Track</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white transition-colors">
          Login
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;