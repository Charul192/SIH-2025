import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Bustracker from "./components/Bustracker/Bustracker.jsx";
import Schedule from "./components/Schedule/Schedule.jsx";
import Planyoutrip from "./components/Planyourtrip/PlanyouTrip.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="bus-tracker" element={<Bustracker />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="plan-your-trip" element={<Planyoutrip />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
