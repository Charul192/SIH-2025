import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header"; // Header ka path check kar lein
import Footer from "./components/Footer/Footer"; // Footer ka path check kar lein
import { AppContext } from "./context/AppContext";

export default function Layout() {
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  //   localStorage.setItem('theme', theme);
  // }, [theme]);
  const {Dark}=useContext(AppContext)
  return (
    <div className={`${Dark?'bg-black':'bg-white'}`}>
      {/* Yahan se Header ko props mil rahe hain */}
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}