import React from "react";
import MapC from "../LIve_Location/Map.jsx"
import axios from "axios"
function handleClick(){
  let value = document.getElementById("lookup").value;
  const isFiveDigitNumber = (input) => {
    return /^\d{5}$/.test(input);
  };
  if(!value || !isFiveDigitNumber(value)){
    console.log("You haven't entered anything in the input");
  }
  axios.post(`http://localhost:3000/trackbus/${value}`, )

}
export default function Bustracker() {
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Track Your Bus
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Enter a bus number below to get its real-time location and arrival
            information.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <form className="flex items-center gap-x-4">
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Enter Bus Number..."
            />
            <button
              type="submit"
              id={"lookup"}
              onClick={handleClick}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="aspect-h-9 aspect-w-16">
            <div className="flex h-full w-full items-center justify-center rounded-lg border border-gray-700 bg-zinc-900">
              {/*<p className="text-gray-500">Map Placeholder</p>*/}
              <MapC />
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-gray-700 bg-zinc-900 p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Bus 42A</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Route: Downtown to University
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-right">
                <p className="text-lg font-medium text-green-400">On Time</p>
                <p className="mt-1 text-sm text-gray-300">
                  Last updated: a few seconds ago
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-700 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Current Location
                </p>
                <p className="mt-1 font-semibold text-white">Near City Hall</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Next Stop</p>
                <p className="mt-1 font-semibold text-white">Grand Library</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Estimated Arrival (ETA)
                </p>
                <p className="mt-1 font-semibold text-white">5 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
