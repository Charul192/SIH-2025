import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import {BrowserRouter} from 'react-router-dom'
import AppContextProvider from "./context/AppContext.jsx";
// Import your components
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Bustracker from "./components/Bustracker/Bustracker.jsx";
import Schedule from "./components/Schedule/Schedule.jsx";
import Planyoutrip from "./components/Planyourtrip/Planyoutrip.jsx";
import Developer from "./components/Developers_Page/developer.jsx"
import MapPage from "./components/Bustracker/MapPage.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/Privacy.jsx";

// 1. Create the router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    // The parent route uses the Layout component
    <Route path="/" element={<Layout />}>
      {/* Child routes are nested and will be rendered in the Outlet */}
      <Route path="" element={<Home />} />
      <Route path="/bus-tracker" element={<Bustracker />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/plan-your-trip" element={<Planyoutrip />} />
       <Route path="/map" element={<MapPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/devpage" element={<Developer />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Route>
  )
);

// 2. Render the app using the RouterProvider
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppContextProvider>
    <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
