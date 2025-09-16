import React from 'react';
// import {createRoot} from "react-dom/client";
import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
export default function MapC(){
    return (
        <div className="h-130 w-full">
            <APIProvider apiKey={"AIzaSyARSqYspchcCQGDRl1izB0_GaqQ6A2Yz6w"}>
                <Map
                    defaultZoom={13}
                    minZoom={10}
                    defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                    mapId="roadmap"
                    fullscreenControl={false}
                    mapTypeControl={false}
                    streetViewControl={false}
                    zoomControl={false}
                >

                </Map>
            </APIProvider>
        </div>

    )
}