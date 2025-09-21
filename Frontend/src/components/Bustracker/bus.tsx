// --- Interfaces for Stronger Typing ---
interface IBusRoute {
  start: { name: string };
  end: { name: string };
}

export interface IBusData {
  busNumber: string;
  operator: string;
  headsign: string;
  startTime: Date;
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
      
      // --- THIS IS THE FIX ---
      // This is a cleaner way to check if the route and its legs are valid.
      if (!route || !route.legs.length) {
        throw new Error("No route legs found.");
      }

      this.renderer.setDirections(result);
      this.createRouteMarkers(route);

      this.routeCoordinates = [];
      route.legs[0].steps.forEach(step => {
        step.path.forEach(point => this.routeCoordinates.push(point));
      });
      
      this.startAnimation(route);
    } catch (e) {
      console.error(`Could not get route for bus ${this.busData.busNumber}:`, e);
      alert(`Error finding route for bus ${this.busData.busNumber}.`);
    }
  }

  private createRouteMarkers(route: google.maps.DirectionsRoute): void {
    const startLocation = route.legs[0].start_location!;
    const endLocation = route.legs[0].end_location!;

    this.startMarker = new google.maps.Marker({
      position: startLocation, map: map, title: `Start: ${route.legs[0].start_address}`,
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#22c55e', fillOpacity: 1, strokeColor: 'white', strokeWeight: 2 }
    });

    this.endMarker = new google.maps.Marker({
      position: endLocation, map: map, title: `End: ${route.legs[0].end_address}`,
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#ef4444', fillOpacity: 1, strokeColor: 'white', strokeWeight: 2 }
    });

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(startLocation);
    bounds.extend(endLocation);
    map.fitBounds(bounds, { top: 100, bottom: 100, left: 100, right: 100 });
  }

  private startAnimation(route: google.maps.DirectionsRoute): void {
    if (this.animationTimeout) clearTimeout(this.animationTimeout);

    const totalDurationSeconds = route.legs[0].duration?.value || 0;
    const timeElapsedSeconds = (new Date().getTime() - this.busData.startTime.getTime()) / 1000;
    const progress = Math.min(timeElapsedSeconds / totalDurationSeconds, 1);

    let cumulativeDistance = 0;
    const totalDistance = route.legs[0].distance?.value || 0;
    const startDistance = totalDistance * progress;
    
    let startIndex = 0;
    for(let i = 0; i < this.routeCoordinates.length - 1; i++) {
        cumulativeDistance += google.maps.geometry.spherical.computeDistanceBetween(
            this.routeCoordinates[i],
            this.routeCoordinates[i+1]
        );
        if (cumulativeDistance >= startDistance) {
            startIndex = i + 1;
            break;
        }
    }
    this.animationIndex = startIndex;

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: this.routeCoordinates[this.animationIndex],
        map: map,
        title: `${this.busData.operator} (${this.busData.headsign})`,
        icon: { url: "http://maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png", scaledSize: new google.maps.Size(40, 40), anchor: new google.maps.Point(20, 20) },
      });
    } else {
      this.marker.setPosition(this.routeCoordinates[this.animationIndex]);
    }
    
    this.animateNextStep(route);
  }

  private animateNextStep(route: google.maps.DirectionsRoute): void {
    if (this.animationIndex >= this.routeCoordinates.length - 1) {
      this.cleanup(false);
      return;
    }

    const totalDistance = route.legs[0].distance?.value || 0;
    const totalDuration = route.legs[0].duration?.value || 1;
    const averageSpeedMps = totalDistance / totalDuration;

    const currentPoint = this.routeCoordinates[this.animationIndex];
    const nextPoint = this.routeCoordinates[this.animationIndex + 1];
    const segmentDistance = google.maps.geometry.spherical.computeDistanceBetween(currentPoint, nextPoint);
    const timeForSegmentMs = (segmentDistance / averageSpeedMps) * 1000;

    this.animationTimeout = window.setTimeout(() => {
      this.animationIndex++;
      this.marker!.setPosition(this.routeCoordinates[this.animationIndex]);
      this.animateNextStep(route);
    }, timeForSegmentMs);
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

export function initMap(mapContainer: HTMLElement): void {
  map = new google.maps.Map(mapContainer, {
    zoom: 12, center: { lat: 28.9845, lng: 77.0178 },
    mapId: import.meta.env.VITE_MAPS_KEY as string,
    disableDefaultUI: true,
  });
}

export function startBusAnimation(busData: IBusData): void {
  if (!map) {
    console.error("Map not initialized. Call initMap first.");
    return;
  }
  if (currentAnimator) {
    currentAnimator.cleanup();
  }
  const onAnimationComplete = () => { currentAnimator = null; };
  currentAnimator = new BusAnimator(busData, map, onAnimationComplete);
  currentAnimator.initialize();
}