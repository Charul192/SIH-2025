// --- Interfaces for Stronger Typing ---
interface IBusRoute {
  start: { name: string };
  end: { name: string };
}

export interface IBusData {
  busNumber: string;
  operator: string;
  headsign: string;
  route: IBusRoute;
}

// --- Global Variables ---
let map: google.maps.Map;
let currentAnimator: BusAnimator | null = null;
const directionsService = new google.maps.DirectionsService();

/**
 * A class to manage the state and animation of a single bus.
 */
class BusAnimator {
  private busData: IBusData;
  private onComplete: () => void;
  private renderer: google.maps.DirectionsRenderer;
  private marker: google.maps.Marker | null = null;
  private startMarker: google.maps.Marker | null = null;
  private endMarker: google.maps.Marker | null = null;
  private routeCoordinates: google.maps.LatLng[] = [];
  private animationIndex = 0;
  private animationTimeout: number | null = null;

  constructor(busData: IBusData, mapInstance: google.maps.Map, onComplete: () => void) {
    this.busData = busData;
    this.onComplete = onComplete;
    this.renderer = new google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeOpacity: 0.8,
        strokeWeight: 6,
      },
    });
  }

  async initialize(): Promise<void> {
    const request: google.maps.DirectionsRequest = {
      origin: this.busData.route.start.name,
      destination: this.busData.route.end.name,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    try {
      const result = await directionsService.route(request);
      const route = result.routes[0];
      if (!route || !route.legs || route.legs.length === 0) {
        throw new Error("No route legs found.");
      }

      this.renderer.setDirections(result);
      this.createRouteMarkers(route);

      this.routeCoordinates = [];
      route.legs[0].steps.forEach(step => {
        step.path.forEach(point => {
            this.routeCoordinates.push(point);
        });
      });
      
      this.startAnimation();
    } catch (e) {
      console.error(`Could not get route for bus ${this.busData.busNumber}:`, e);
      alert(`Error finding route for bus ${this.busData.busNumber}.`);
    }
  }

  private createRouteMarkers(route: google.maps.DirectionsRoute): void {
    const startLocation = route.legs[0].start_location!;
    const endLocation = route.legs[0].end_location!;

    this.startMarker = new google.maps.Marker({
      position: startLocation,
      map: map,
      title: `Start: ${route.legs[0].start_address}`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#22c55e',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
      }
    });

    this.endMarker = new google.maps.Marker({
      position: endLocation,
      map: map,
      title: `End: ${route.legs[0].end_address}`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#ef4444',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
      }
    });

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(startLocation);
    bounds.extend(endLocation);
    map.fitBounds(bounds, { top: 100, bottom: 100, left: 100, right: 100 });
  }

  private startAnimation(): void {
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
    this.animationIndex = 0;

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: this.routeCoordinates[0],
        map: map,
        title: `${this.busData.operator} (${this.busData.headsign})`,
        icon: {
          url: "http://maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        },
      });
    } else {
      this.marker.setPosition(this.routeCoordinates[0]);
    }

    this.animateNextStep();
  }

  private animateNextStep(): void {
    if (this.animationIndex >= this.routeCoordinates.length - 1) {
      this.cleanup(false);
      return;
    }

    this.animationTimeout = window.setTimeout(() => {
      this.animationIndex++;
      this.marker!.setPosition(this.routeCoordinates[this.animationIndex]);
      this.animateNextStep();
    }, 50);
  }

  cleanup(isNewAnimationStarting = true): void {
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
    this.marker?.setMap(null);
    this.renderer?.setMap(null);
    this.startMarker?.setMap(null);
    this.endMarker?.setMap(null);
    if (this.onComplete && !isNewAnimationStarting) {
        this.onComplete();
    }
  }
}

/**
 * Initializes the Google Map inside a specific HTML element.
 */
export function initMap(mapContainer: HTMLElement): void {
  map = new google.maps.Map(mapContainer, {
    zoom: 12,
    center: { lat: 28.9845, lng: 77.0178 },
    mapId: import.meta.env.VITE_MAPS_KEY as string,
    disableDefaultUI: true,
  });
}

/**
 * Starts the animation for a single bus.
 */
export function startBusAnimation(busData: IBusData): void {
  if (!map) {
    console.error("Map not initialized. Call initMap first.");
    return;
  }

  if (currentAnimator) {
    currentAnimator.cleanup();
  }

  const onAnimationComplete = () => {
    currentAnimator = null;
  };

  currentAnimator = new BusAnimator(busData, map, onAnimationComplete);
  currentAnimator.initialize();
}