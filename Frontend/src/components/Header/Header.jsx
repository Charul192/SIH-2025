import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">your logo</span>
        </Link>

        <div className="hidden lg:flex lg:gap-x-12">
          <ul className="flex items-center space-x-8 font-medium">
            <li>
              <NavLink
                to="/"
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
