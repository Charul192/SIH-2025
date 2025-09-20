import axios from 'axios';

// IMPORTANT: Store your API key in an environment variable, not in your code.
const API_KEY ="AIzaSyARSqYspchcCQGDRl1izB0_GaqQ6A2Yz6w";

const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

export async function getRoute(waypoints) {
    const array = [];
    try {
        const response = await axios.post(
            url,
            // Request Body
            {
                origin: {
                    "placeId": "ChIJ88J-yM9wDjkR25iO42FRY1k" // Jodhpur
                },
                destination: {
                    "placeId": "ChIJlZ-N3f8IQTkR52IlcaQt2V4" // Thanesar
                },
                intermediates: [
                    {
                        placeId: "ChIJge_S5YkAZjkR-eZ23u4e3-A" // Jaipur
                    },
                    {

                    }
                ],
                travelMode: "DRIVE",
                routingPreference: "TRAFFIC_AWARE"
            },
            // Headers
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': API_KEY,
                    // The Field Mask: Ask for exactly what you need
                    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
                },
            }
        );

        // The route information is in the first element of the 'routes' array
        const route = response.data.routes[0];
        // console.log(route);
        // console.log(route.polyline.encodedPolyline);
        // console.log('Route Information:');
        // console.log(`Distance: ${(route.distanceMeters / 1000).toFixed(2)} km`);
        // console.log(`Duration: ${Math.floor(parseInt(route.duration) / 3600)} hours ${Math.floor((parseInt(route.duration) % 3600) / 60)} minutes`);
        // console.log(`Encoded Polyline: ${route.polyline.encodedPolyline.substring(0, 50)}...`);
        return route.polyline.encodedPolyline

    } catch (error) {
        console.error('Error fetching route:', error.response?.data || error.message);
    }
}
getRoute();
