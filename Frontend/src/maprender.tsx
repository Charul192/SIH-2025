import React from "react";
import {createRoot} from "react-dom/client"
import {APIProvider, Map} from "@vis.gl/react-google-maps"
const App = () => {
    return (
        < APIProvider apiKey={"AIzaSyARSqYspchcCQGDRl1izB0_GaqQ6A2Yz6w"}>
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