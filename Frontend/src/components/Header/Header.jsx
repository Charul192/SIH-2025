import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/logo";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import '../../index.css'; 
import { AppContext } from "../../context/AppContext";
import GoogleTranslate from "./GoogleTranslate";

export default function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useContext(AppContext); // Removed unused 'changeLanguage'

  return (
    <header className="relative top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-black/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <Logo />
        </Link>

        {/* --- Hamburger Menu Button --- */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 h-8 w-8 text-gray-800 dark:text-white focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute left-1/2 top-1/2 block w-7 -translate-x-1/2 -translate-y-1/2 transform">
              <span aria-hidden="true" className={`absolute block h-0.5 w-7 transform bg-current transition duration-500 ease-in-out ${ isMenuOpen ? "rotate-45" : "-translate-y-2" }`}></span>
              <span aria-hidden="true" className={`absolute block h-0.5 w-7 transform bg-current transition duration-500 ease-in-out ${ isMenuOpen ? "opacity-0" : "" }`}></span>
              <span aria-hidden="true" className={`absolute block h-0.5 w-7 transform bg-current transition duration-500 ease-in-out ${ isMenuOpen ? "-rotate-45" : "translate-y-2" }`}></span>
            </div>
          </button>
        </div>

        {/* --- Navigation Links & Controls --- */}
        <div className={`absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md dark:bg-black/95 transition-all duration-300 ease-in-out lg:static lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:dark:bg-transparent ${ isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4 lg:opacity-100 lg:visible lg:translate-y-0"}`}>
          <ul className="flex flex-col items-center gap-y-4 py-4 lg:flex-row lg:items-center lg:gap-x-6 lg:py-0 font-medium">
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block py-2 text-lg transition-colors duration-300 ${ isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400" } hover:text-gray-900 dark:hover:text-white`}>{t("Home")}</NavLink>
            </li>
            <li>
              <NavLink to="/bus-tracker" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block py-2 text-lg transition-colors duration-300 ${ isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400" } hover:text-gray-900 dark:hover:text-white`}>Bus Tracker</NavLink>
            </li>
            <li>
              <NavLink to="/schedule" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block py-2 text-lg transition-colors duration-300 ${ isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400" } hover:text-gray-900 dark:hover:text-white`}>Schedule</NavLink>
            </li>
            <li>
              <NavLink to="/plan-your-trip" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block py-2 text-lg transition-colors duration-300 ${ isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400" } hover:text-gray-900 dark:hover:text-white`}>Plan your trip</NavLink>
            </li>
            
            {/* CHANGE: GoogleTranslate is now in its own list item for proper separation */}

            {/* CHANGE: The theme toggle button is also in its own list item */}
            <li>
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6 text-gray-800" />
                ) : (
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}