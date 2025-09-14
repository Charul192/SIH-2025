// src/components/Navbar.jsx
import React from "react";
import { Link,NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
        <div className="fixed flex flex-wrap justify-center top-8 inset-x-0 px-2">
          <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-slate-800 rounded-2xl px-3 py-2 '>
             <Link className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg cursor-pointer' style={{ backgroundColor: "black" }} to='/'>Home</Link>
             <Link className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg cursor-pointer' style={{ backgroundColor: "black" }} to='/tracker'>Track</Link>
             <a className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg cursor-pointer' style={{ backgroundColor: "black" }} href="">Plan</a>
             <a className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg cursor-pointer' style={{ backgroundColor: "black" }} href="">Schedule</a>
             <a className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg cursor-pointer' style={{ backgroundColor: "black" }} href="">About</a>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;