import React, {useEffect, useState, useRef, useCallback} from 'react';
import {createRoot} from 'react-dom/client';

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  MapCameraChangedEvent,
  Pin
} from '@vis.gl/react-google-maps';

import {MarkerClusterer} from '@googlemaps/markerclusterer';
import type {Marker} from '@googlemaps/markerclusterer';


const TrackBus = () => {
  console.log(import.meta.env.VITE_MAPS_API)
  return(
    <div id='root' className='py-14 h-170'>
    <APIProvider apiKey={import.meta.env.VITE_MAPS_API} onLoad={() => console.log('Maps API has loaded.')}>
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: 28.7041, lng:77.1025 }}
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }
      mapId='da37f3254c6a6d1c'
      >
    </Map>
  </APIProvider>
  </div>
  )

};

export default TrackBus
