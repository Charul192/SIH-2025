import React from "react";
import {createRoot} from "react-dom/client"
import {APIProvider, Map} from "@vis.gl/react-google-maps"
import dotenv from "dotenv"
dotenv.config();
const App = () => {
    return (
        <APIProvider apiKey={process.env.GOOGLE_API_KEY ?? ""}>
            <Map 
                defaultZoom={13}
                defaultCenter={ { lat: -33.860664, lng: 151.208138 } } >
                
            </Map>
        </ APIProvider>
    );
}
const root = createRoot(document.getElementById('map') as HTMLElement);
root.render(<App />)
export default App