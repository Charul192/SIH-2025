import React, { useState } from "react"; // 1. useState ko import karein
import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/logo";

export default function Header() {
  // 2. Menu ki state (khula/band) ko manage karne ke liye
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <Logo />
        </Link>

        {/* --- ANIMATED HAMBURGER BUTTON (SIRF MOBILE MEIN DIKHEGA) --- */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 h-8 w-8 text-white focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute left-1/2 top-1/2 block w-7 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-7 transform bg-current transition duration-500 ease-in-out ${
                  isMenuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-7 transform bg-current transition duration-500 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-7 transform bg-current transition duration-500 ease-in-out ${
                  isMenuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              ></span>
            </div>
          </button>
        </div>
        {/* --- HAMBURGER BUTTON END --- */}

        {/* --- NAVIGATION LINKS (SMOOTH TRANSITION ADDED) --- */}
        <div
          className={`absolute top-16 left-0 w-full bg-black transition-all duration-300 ease-in-out lg:static lg:flex lg:w-auto lg:gap-x-12 lg:opacity-100 lg:visible lg:transform-none ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4 lg:flex-row lg:space-x-8 lg:space-y-0 lg:py-0 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)} // Link click par menu band ho jayega
                className={({ isActive }) =>
                  `block py-2 text-lg transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400"
                  } hover:text-white`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bus-tracker"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-lg transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400"
                  } hover:text-white`
                }
              >
                Bus Tracker
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-lg transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400"
                  } hover:text-white`
                }
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/plan-your-trip"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-lg transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400"
                  } hover:text-white`
                }
              >
                Plan your trip
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-lg transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400"
                  } hover:text-white`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

