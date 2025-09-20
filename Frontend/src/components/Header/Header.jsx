import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/logo";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import '../../index.css'; 
import GoogleTranslate from "./GoogleTranslate";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Dark, setDark } = useContext(AppContext);

  // Helper function to create dynamic NavLink classes
  const getNavLinkClass = ({ isActive }) => {
    const baseClass = "block py-2 text-lg transition-colors duration-300";
    let activeClass = "";
    let inactiveClass = "";
    let hoverClass = "";

    if (Dark) {
      activeClass = "text-white";
      inactiveClass = "text-slate-400";
      hoverClass = "hover:text-white";
    } else {
      activeClass = "text-slate-900";
      inactiveClass = "text-slate-500";
      hoverClass = "hover:text-slate-900";
    }

    return `${baseClass} ${hoverClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    // FIX: Main header background is now theme-aware and has a subtle bottom border
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${Dark ? 'bg-black border-b border-slate-700 ' : 'bg-white border-b border-slate-200 '}`}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8`}>
        <Link to="/" className={`flex items-center ${isMenuOpen?'hidden top-0':''}`} onClick={() => setIsMenuOpen(false)}>
          <Logo />
        </Link>

        {/* --- Hamburger Menu Button --- */}
        <div className="lg:hidden">
          {/* FIX: Hamburger icon color is now dynamic */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-50 h-8 w-8 focus:outline-none ${Dark ? 'text-white' : 'text-slate-800'}`}
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
        {/* FIX: Mobile menu background is now handled by the main header's styles */}
        <div className={`absolute top-full left-0 w-full lg:static lg:flex lg:w-auto lg:items-center transition-all duration-300 ease-in-out ${ isMenuOpen ? "opacity-100 visible translate-y-0 " : "opacity-0 invisible -translate-y-4 lg:opacity-100 lg:visible lg:translate-y-0"}`}>
          {/* FIX: Added a background for the mobile menu itself for better separation */}
          <ul className={`flex flex-col items-center gap-y-4 py-4 lg:flex-row lg:items-center lg:gap-x-6 lg:py-0 font-medium w-full lg:w-auto ${Dark ? 'bg-black lg:bg-transparent' : 'bg-white lg:bg-transparent'} ${isMenuOpen?'h-[100vh]':''}`}>
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={getNavLinkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/bus-tracker" onClick={() => setIsMenuOpen(false)} className={getNavLinkClass}>Bus Tracker</NavLink>
            </li>
            <li>
              <NavLink to="/schedule" onClick={() => setIsMenuOpen(false)} className={getNavLinkClass}>Schedule</NavLink>
            </li>
            <li>
              <NavLink to="/plan-your-trip" onClick={() => setIsMenuOpen(false)} className={getNavLinkClass}>Plan your trip</NavLink>
            </li>
            
            <li className="lg:ml-4">
              <GoogleTranslate />
            </li>
            
            <li>
              {/* FIX: Theme toggle hover effect is now dynamic */}
              <button
                onClick={() => setDark(prev => !prev)}
                className={`rounded-full p-2 transition-colors duration-300 ${Dark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}
                aria-label="Toggle theme"
              >
                {!Dark ? (
                  <MoonIcon className="h-6 w-6 text-slate-800" />
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