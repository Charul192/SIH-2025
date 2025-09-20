// Haversine formula: distance between two lat/lng in meters
function haversineDistance(coord1, coord2) {
    const R = 6371000; // radius of Earth in meters
    const toRad = x => (x * Math.PI) / 180;

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);

    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in meters
}

// Interpolate between two points by fraction (0 → start, 1 → end)
function interpolate(coord1, coord2, fraction) {
    const lat = coord1.lat + (coord2.lat - coord1.lat) * fraction;
    const lng = coord1.lng + (coord2.lng - coord1.lng) * fraction;
    return { lat, lng };
}

// Generate spaced coordinates along waypoints
function generateRouteCoordinates(waypoints, speed, interval, tolerance = 5) {
    const stepDistance = speed * interval; // meters between each coordinate
    let points = [];
    let remainingDist = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
        const start = waypoints[i];
        const end = waypoints[i + 1];
        const segmentDistance = haversineDistance(start, end);

        let distCovered = remainingDist;

        while (distCovered + stepDistance <= segmentDistance) {
            const fraction = (distCovered + stepDistance) / segmentDistance;
            const newPoint = interpolate(start, end, fraction);

            // ✅ Stop if new point is very close to the final destination
            const distToFinal = haversineDistance(newPoint, waypoints[waypoints.length - 1]);
            if (distToFinal <= tolerance) {
                points.push(waypoints[waypoints.length - 1]); // snap to destination
                return points; // stop generating further
            }

            points.push(newPoint);
            distCovered += stepDistance;
        }

        remainingDist = segmentDistance - distCovered;
    }

    // Ensure the final destination is always included
    const lastPoint = waypoints[waypoints.length - 1];
    if (!points.length || haversineDistance(points[points.length - 1], lastPoint) > tolerance) {
        points.push(lastPoint);
    }

    return points;
}

// Example usage:
const waypoints = [
    { lat: 28.7041, lng: 77.1025 }, // Delhi
    { lat: 28.5355, lng: 77.3910 }, // Noida
    { lat: 28.4089, lng: 77.3178 }  // Faridabad
];

const speed = 15; // meters per second (~54 km/h)
const interval = 10; // seeconds
export const routePoints = generateRouteCoordinates(waypoints, speed, interval, 10); // tolerance = 10m

console.log(routePoints);

