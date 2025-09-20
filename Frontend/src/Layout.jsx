import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AppContext } from "./context/AppContext";
// Correct the path here to point to the actual file
import ScrollToUp from "./components/ScrollToUp/ScrollToUp"; 

export default function Layout() {
  const { Dark } = useContext(AppContext);
  
  return (
    <div className={`${Dark ? 'bg-black' : 'bg-white'}`}>
      <ScrollToUp />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}