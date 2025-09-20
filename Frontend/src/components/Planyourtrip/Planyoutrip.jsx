import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";

// --- Icon Components (No changes needed) ---
const LocationPinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.654-.369.623-.359 1.445-.835 2.343-1.441a10.025 10.025 0 002.146-2.25C17.75 11.202 18 10.205 18 9.25C18 6.097 14.433 3.5 10 3.5S2 6.097 2 9.25c0 .955.25 1.952.76 3.142a10.025 10.025 0 002.146 2.25c.898.606 1.72 1.082 2.343 1.441.255.146.468.269.654-.369a5.741 5.741 0 00.281.14l.018.008.006.003zM10 11.25a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> );
const LoadingSpinner = () => ( <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> );
const NoResultsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg> );
const TransferIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg> );
const SwapIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:rotate-90"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg> );
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>);

const API_BASE_URL = "http://localhost:8000";

const formatTime = (timeData) => {
  if (!timeData) return "--:--";
  let date;
  if (typeof timeData === 'object' && typeof timeData._seconds === 'number') {
    date = new Date(timeData._seconds * 1000);
  } else if (typeof timeData === 'string') {
    date = new Date(timeData);
  } else {
    return "--:--";
  }
  if (isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const JourneyStops = ({ route, startStopName, endStopName, Dark }) => {
  const startIndex = route.findIndex(s => s.name.toLowerCase() === startStopName.toLowerCase());
  const endIndex = route.findIndex(s => s.name.toLowerCase() === endStopName.toLowerCase());
  if (startIndex === -1 || endIndex === -1) return null;
  const relevantStops = route.slice(startIndex, endIndex + 1);

  return (
    <div className={`mt-4 border-t pt-4 ${Dark ? 'border-slate-700' : 'border-slate-200'}`}>
      <ul className="space-y-3">
        {relevantStops.map((stop, index) => (
          <li key={index} className="flex items-start text-sm">
            <div className="flex flex-col items-center mr-4">
              <div className={`w-3 h-3 rounded-full ${index === 0 || index === relevantStops.length - 1 ? 'bg-blue-500' : (Dark ? 'bg-slate-600' : 'bg-slate-400')}`}></div>
              {index < relevantStops.length - 1 && <div className={`w-px h-6 ${Dark ? 'bg-slate-700' : 'bg-slate-300'}`}></div>}
            </div>
            <div className="flex-1 flex justify-between">
              <span className={`font-medium ${Dark ? 'text-slate-200' : 'text-slate-800'}`}>{stop.name}</span>
              <span className={`${Dark ? 'text-slate-400' : 'text-slate-500'}`}>
                {formatTime(stop.arrivalTime) || formatTime(stop.departureTime)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PlanyouTrip() {
  const { Dark } = useContext(AppContext);
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [foundRoutes, setFoundRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const recommendations = ["Abohar Bus Stand", "Adampur Doaba", "Aerocity", "Agra (ISBT)", "Ambala Cantt", "Ambala Cantt Bus Stand", "Amritsar (Opp. Bus Stand)", "Amritsar Bus Stand", "Banga", "Banikhet", "Banur", "Barnala", "Batala", "Bathinda Bus Stand", "Beas", "Behror", "Bhawanigarh", "Bikaner", "Bilaspur (HP)", "Chandigarh (ISBT Sector 17)", "Chandigarh (ISBT Sector 43)", "Dalhousie Bus Stand", "Dasuya", "Delhi (Anand Vihar ISBT)", "Delhi (Dhaula Kuan)", "Delhi (ISBT Kashmiri Gate)", "Dera Bassi", "Dhaula Kuan", "Dharamshala", "Dharampur", "Dinanagar", "Doraha", "Dunera", "Faridkot", "Fatehpur", "Fazilka", "Ferozepur Bus Stand", "Ferozepur Cantt", "Golden Temple", "Goniana", "Gurdaspur", "Gurdaspur Bypass", "Gurugram (IFFCO Chowk)", "Haridwar", "Harike", "Hisar", "Hoshiarpur Bus Stand", "Huda City Centre", "IGI Airport T3", "Jagraon", "Jaipur (Sindhi Camp)", "Jalalabad", "Jalandhar (Rama Mandi Chowk)", "Jalandhar Bus Stand", "Jalandhar Bypass", "Jalandhar Cantt", "Jallianwala Bagh", "Jammu Bus Stand", "Kaithal", "Kalanwali", "Kalka", "Kangra", "Kapurthala", "Karnal", "Karnal Bypass", "Kathua", "Keylong", "Khanna", "Kharar", "Kiratpur Sahib", "Kot Kapura", "Kullu", "Leh", "Ludhiana (Samrala Chowk)", "Ludhiana Bus Stand", "Manali (Private Bus Stand)", "Mandi", "Mandi Dabwali", "Mansa", "Mathura", "Maur", "Meerut Bypass", "Moga Bus Stand", "Mohali Bus Stand", "Mohali Bus Stand Phase 8", "Mukerian", "Mullanpur Dakha", "Nawanshahr", "New Delhi Metro Station", "Noida Sector 37", "Nurpur", "Panchkula Bus Stand", "Panipat", "Pathankot", "Pathankot Bus Stand", "Pathankot Cantt", "Patiala Bus Stand", "Phagwara", "Phillaur", "Pipli", "Punjabi Bagh", "Raj Ghat", "Rajpura", "Rajpura Town", "Rampura Phul", "Ratangarh", "Rishikesh", "Roorkee", "Samba", "Samrala", "Sangrur", "Sangrur Bus Stand", "Sarai Kale Khan ISBT", "Sarchu", "Shimla (ISBT Tutikandi)", "Shivaji Stadium", "Sikar", "Sirhind", "Sirsa Bus Stand", "Solan", "Sonipat", "Sonipat (Murthal Dhaba)", "South Extension", "Talwandi Bhai", "Tarn Taran", "Una", "Wagah Border", "Zirakpur Crossing"];

  const handleInputChange = (event) => {
    const val = event.target.value;
    const inputId = event.target.id;

    if (inputId === "st") {
      setStartLocation(val);
    } else if (inputId === "end") {
      setEndLocation(val);
    }

    if (val.length > 0) {
      const lowercased = val.toLowerCase().trim();
      const filteredSuggestions = recommendations.filter(item =>
        item.toLowerCase().startsWith(lowercased)
      );
      setSuggestion(filteredSuggestions);
    } else {
      setSuggestion([]);
    }
  };

  const handleSuggestionClick = (suggestionValue) => {
    if (activeInput === 'start') {
        setStartLocation(suggestionValue);
    } else if (activeInput === 'end') {
        setEndLocation(suggestionValue);
    }
    setSuggestion([]);
    setActiveInput(null);
  };

  const handleFindBuses = async (event) => {
    event.preventDefault();
    if (!startLocation.trim() || !endLocation.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearched(true);
    setFoundRoutes([]);

    try {
      const params = new URLSearchParams({ from: startLocation, to: endLocation });
      const response = await fetch(`${API_BASE_URL}/api/routes?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch routes from the server.");
      const routes = await response.json();
      setFoundRoutes(routes);
    } catch (err) {
      console.error(err);
      setError("Could not find routes. Please check the server and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setStartLocation(endLocation);
    setEndLocation(startLocation);
  };

  const BusCard = ({ bus, startStop, endStop }) => (
    <div className={`rounded-lg p-4 w-full ${Dark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm ${Dark ? 'text-slate-400' : 'text-slate-500'}`}>{bus.operator} • {bus.headsign}</p>
          <p className={`text-lg font-bold ${Dark ? 'text-white' : 'text-slate-900'}`}>Bus {bus.busId}</p>
        </div>
        <button
          onClick={() => navigate(`/schedule?busId=${bus.busId}`)}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Details &rarr;
        </button>
      </div>
      <details className="mt-2 group">
        <summary className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer list-none">
          <span className="group-open:hidden">View Stops</span>
          <span className="hidden group-open:inline">Hide Stops</span>
        </summary>
        <JourneyStops route={bus.route} startStopName={startStop} endStopName={endStop} Dark={Dark} />
      </details>
    </div>
  );
  
  const ConnectingRouteCard = ({ route, startStop, endStop }) => {
    const arrivalAtTransferStop = route.leg1.route.find(s => s.name.toLowerCase() === route.transferPoint.toLowerCase());
    const departureFromTransferStop = route.leg2.route.find(s => s.name.toLowerCase() === route.transferPoint.toLowerCase());
    let layoverMinutes = null;

    if (arrivalAtTransferStop?.arrivalTime?._seconds && departureFromTransferStop?.departureTime?._seconds) {
        const arrivalTime = new Date(arrivalAtTransferStop.arrivalTime._seconds * 1000);
        const departureTime = new Date(departureFromTransferStop.departureTime._seconds * 1000);
        if(!isNaN(arrivalTime) && !isNaN(departureTime)) {
            layoverMinutes = Math.round((departureTime - arrivalTime) / 60000);
        }
    }

    return (
      <div className={`rounded-xl border p-6 ${Dark ? 'border-purple-500/50 bg-black' : 'border-purple-300 bg-purple-50'}`}>
        <div className="flex flex-col items-center">
          <BusCard bus={route.leg1} startStop={startStop} endStop={route.transferPoint} />
          <div className={`h-8 w-px my-2 ${Dark ? 'bg-purple-700' : 'bg-purple-300'}`}></div>
          <div className="flex flex-col items-center gap-2">
            <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${Dark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
              <TransferIcon />
              <span>Change buses at <strong>{route.transferPoint}</strong></span>
            </div>
            {layoverMinutes !== null && layoverMinutes >= 0 && (
              <div className={`flex items-center gap-1.5 text-xs ${Dark ? 'text-purple-400' : 'text-purple-600'}`}>
                <ClockIcon />
                <span>Waiting time: ~{layoverMinutes} minutes</span>
              </div>
            )}
          </div>
          <div className={`h-8 w-px my-2 ${Dark ? 'bg-purple-700' : 'bg-purple-300'}`}></div>
          <BusCard bus={route.leg2} startStop={route.transferPoint} endStop={endStop} />
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${Dark ? 'bg-black text-slate-50' : 'bg-white text-slate-900'}`}>
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Plan Your Trip</h1>
          <p className={`mx-auto mt-4 max-w-2xl text-xl ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
            Enter your starting point and final destination to find all available bus routes.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-xl">
          <form className="space-y-6" onSubmit={handleFindBuses}>
            <div className="flex flex-col sm:flex-row items-end gap-4">
              
              <div className="w-full">
                <label htmlFor="st" className="block text-lg font-medium leading-6">From</label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <LocationPinIcon />
                  </div>
                  <input 
                    type="text" 
                    value={startLocation} 
                    id="st" 
                    onChange={handleInputChange} 
                    onFocus={() => setActiveInput('start')} 
                    className={`block w-full rounded-md border-0 h-12 pl-10 pr-3 text-lg ${Dark ? 'bg-white/5' : 'bg-slate-100'}`} 
                    placeholder="e.g. Amritsar" 
                    required 
                    autoComplete="off" 
                  />
                  {activeInput === 'start' && suggestion.length > 0 && (
                    <ul className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${Dark ? 'bg-slate-800' : 'bg-white'}`}>
                      {suggestion.map((item) => (
                        <li key={item} onClick={() => handleSuggestionClick(item)} className={`relative cursor-pointer select-none py-2 px-4 ${Dark ? 'text-slate-200 hover:bg-slate-700' : 'text-gray-900 hover:bg-slate-100'}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button 
                type="button" 
                onClick={handleSwap} 
                className={`mb-1 flex-shrink-0 rounded-full p-2 transition ${Dark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-500 hover:bg-slate-200'}`} 
                aria-label="Swap locations"
              >
                <SwapIcon />
              </button>

              <div className="w-full">
                <label htmlFor="end" className="block text-lg font-medium leading-6">To</label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <LocationPinIcon />
                  </div>
                  <input 
                    type="text" 
                    value={endLocation} 
                    id="end" 
                    onChange={handleInputChange} 
                    onFocus={() => setActiveInput('end')} 
                    className={`block w-full rounded-md border-0 h-12 pl-10 pr-3 text-lg ${Dark ? 'bg-white/5' : 'bg-slate-100'}`} 
                    placeholder="e.g. Ludhiana" 
                    required 
                    autoComplete="off" 
                  />
                  {activeInput === 'end' && suggestion.length > 0 && (
                    <ul className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${Dark ? 'bg-slate-800' : 'bg-white'}`}>
                      {suggestion.map((item) => (
                        <li key={item} onClick={() => handleSuggestionClick(item)} className={`relative cursor-pointer select-none py-2 px-4 ${Dark ? 'text-slate-200 hover:bg-slate-700' : 'text-gray-900 hover:bg-slate-100'}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button type="submit" disabled={isLoading} className="flex items-center justify-center w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50">
                {isLoading && <LoadingSpinner />}
                <span className={isLoading ? 'ml-2' : ''}>Find Buses</span>
              </button>
            </div>
          </form>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-4xl font-bold text-center">Available Routes</h2>
            <div className="mt-6 space-y-4">
            {isLoading && (<div className={`flex justify-center items-center gap-3 text-lg p-8 ${Dark ? 'text-slate-400' : 'text-slate-500'}`}><LoadingSpinner /><span>Finding the best routes for you...</span></div>)}
            {error && <p className="text-center text-lg text-red-600 dark:text-red-500">{error}</p>}
            
            {!isLoading && !error && searched && foundRoutes.length === 0 && (<div className={`rounded-lg border-2 border-dashed p-12 text-center text-gray-500 ${Dark ? 'border-slate-700' : 'border-slate-300'}`}><NoResultsIcon /><p className="text-lg mt-4">No direct or connecting buses found for this route.</p></div>)}

            {!isLoading && !error && foundRoutes.map((route, index) => {
                if (route.type === 'direct') {
                return (
                    <div key={index} className={`rounded-xl border p-1 ${Dark ? 'border-slate-800' : 'border-slate-200'}`}>
                        <BusCard bus={route} startStop={startLocation} endStop={endLocation} />
                    </div>
                );
                }
                if (route.type === 'connection') {
                return <ConnectingRouteCard key={index} route={route} startStop={startLocation} endStop={endLocation} />;
                }
                return null;
            })}

            {!searched && !isLoading && (<div className={`rounded-lg border-2 border-dashed p-12 text-center text-gray-500 ${Dark ? 'border-slate-700' : 'border-slate-300'}`}><p className="text-lg">Enter your locations to find available buses.</p></div>)}
            </div>
        </div>
      </div>
    </div>
  );
}