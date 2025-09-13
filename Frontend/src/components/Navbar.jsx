// src/components/Navbar.jsx

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* You can replace this with an actual SVG logo */}
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <span className="text-xl font-bold">DotTrack</span>
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