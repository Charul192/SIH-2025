import React, { useState, useEffect} from "react";
import {Map, AdvancedMarker, APIProvider, Pin} from "@vis.gl/react-google-maps"
import {createRoot} from "react-dom/client";
// The backend server URL.
const API_URL = "http://localhost:8000";

export default function Bustracker() {
  // const [location, setLocation] = useState({lat: 31323, lng: 2313});
  const [searchTerm, setSearchTerm] = useState("");
  const [foundBus, setFoundBus] = useState(null); // null: initial, false: not found, object: found
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update the current time every second for the live ETA
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const MapRender = (location)=>{

    const App = ()=>{
      return(
          <APIProvider apiKey="AIzaSyARSqYspchcCQGDRl1izB0_GaqQ6A2Yz6w" onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={13}
                defaultCenter={ { lat: -33.860664, lng: 151.208138 }}
                style={{ width: "1000px", height: "500px" }}
                mapId="roadmap"
            >
              <AdvancedMarker
              position={{ lat: -33.860664, lng: 151.208138 }} >
                <Pin
                background={'#4285F4'}
                borderColor={'#ffffff'}
                glyphColor={'#ffffff'}>
                </Pin>
              </AdvancedMarker>
            </Map>
          </APIProvider>
          );

    };
    const root = createRoot(document.getElementById('map'));
    root.render(<App />);

  }
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setFoundBus(null);

    try {
      const response = await fetch(`${API_URL}/api/bus/${searchTerm}`);

      if (!response.ok) {
        // This will catch 404 "Not Found" errors from the backend
        throw new Error('Bus not found');
      }

      const busData = await response.json();

      // The backend sends Firestore Timestamps as objects with _seconds.
      // We need to convert them back into JavaScript Date objects.
      const formattedBusData = {
        ...busData,
        startTime: new Date(busData.startTime._seconds * 1000),
        route: busData.route.map(stop => ({
          ...stop,
          arrivalTime: stop.arrivalTime ? new Date(stop.arrivalTime._seconds * 1000) : null,
          departureTime: stop.departureTime ? new Date(stop.departureTime._seconds * 1000) : null,
        }))
      };
      setFoundBus(formattedBusData);
      MapRender(busData.currentLocation);

    } catch (error) {
      console.error("Error fetching bus data:", error.message);
      setFoundBus(false); // Set to false to indicate "not found"
    } finally {
      setIsLoading(false);
    }
  };

  // --- Helper function to calculate dynamic data (this logic remains the same) ---
  const getBusStatus = () => {
    if (!foundBus) return {};
    const start = foundBus.route[0]?.name || "N/A";
    const end = foundBus.route[foundBus.route.length - 1]?.name || "N/A";
    const routeName = `Route: ${start} to ${end}`;
    let previousStop = { name: "Start Point", departureTime: foundBus.startTime };
    let nextStop = null;
    for (const stop of foundBus.route) {
        if (stop.arrivalTime > currentTime) {
            nextStop = stop;
            break;
        }
        previousStop = stop;
    }
    if (!nextStop) {
        return { routeName, currentStatus: "Journey Completed", nextStopInfo: "N/A", etaInfo: "N/A" };
    }
    const etaMilliseconds = nextStop.arrivalTime - currentTime;
    const etaMinutes = Math.max(0, Math.ceil(etaMilliseconds / 60000));
    const etaInfo = `${etaMinutes} minute${etaMinutes !== 1 ? 's' : ''}`;
    const currentStatus = `Between ${previousStop.name} and ${nextStop.name}`;
    return { routeName, currentStatus, nextStopInfo: nextStop.name, etaInfo };
  };

  const { routeName, currentStatus, nextStopInfo, etaInfo } = getBusStatus();

  // --- The JSX for rendering remains the same ---
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Track Your Bus
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Enter a bus ID below to get its real-time location and arrival information.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form className="flex items-center gap-x-4" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter Bus ID (e.g., 1, 2, 3...)"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
            {/* ... The rest of your JSX from the previous step goes here ... */}
            {/* It will work without changes. I am including it for completeness. */}
            {/* <div className="aspect-h-9 aspect-w-16">
              <div className="flex h-full w-full items-center justify-center rounded-lg border border-gray-700 bg-zinc-900">
                <p className="text-gray-500" id="map"></p>
              </div>
            </div> */}
            {foundBus === false && (
              <div className="mt-8 text-center text-lg text-yellow-400">
                  Bus not found. Please check the ID and try again.
              </div>
            )}
            {foundBus && (
              <div className="mt-8 rounded-lg border border-gray-700 bg-zinc-900 p-6">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{`Bus ${foundBus.busId} - ${foundBus.headsign}`}</h2>
                    <p className="mt-1 text-sm text-gray-400">
                      Operated by {foundBus.operator}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                    <p className="text-lg font-medium text-green-400">On Time</p>
                    <p className="mt-1 text-sm text-gray-300">
                      Last updated: {currentTime.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <p className="text-sm font-medium text-gray-400">{routeName}</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-700 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Current Location</p>
                    <p className="mt-1 font-semibold text-white">{currentStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Next Stop</p>
                    <p className="mt-1 font-semibold text-white">{nextStopInfo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Estimated Arrival (ETA)</p>
                    <p className="mt-1 font-semibold text-white">{etaInfo}</p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}