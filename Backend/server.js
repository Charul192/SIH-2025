import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from "./firebase.js";
import { Client } from "@googlemaps/google-maps-services-js";

// .env file se environment variables load karein
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const googleMapsClient = new Client({});

// --- Middleware ---
app.use(cors()); // Frontend se requests allow karne ke liye
app.use(express.json()); // JSON data ko samajhne ke liye

// --- Helper Function: Bus Routes Dhoondne Ke Liye ---
async function findBusRoutes(from, to) {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  const busesRef = db.collection('buses');
  const snapshot = await busesRef.get();
  if (snapshot.empty) {
    return [];
  }
  const allBuses = snapshot.docs.map(doc => doc.data());

  // Step 1: Seedhe (Direct) routes dhoondein
  const directRoutes = [];
  allBuses.forEach(bus => {
    const fromIndex = bus.route.findIndex(stop => stop.name.toLowerCase() === fromLower);
    const toIndex = bus.route.findIndex(stop => stop.name.toLowerCase() === toLower);
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      directRoutes.push({ ...bus, type: 'direct' });
    }
  });

  if (directRoutes.length > 0) {
    return directRoutes;
  }

  // Step 2: Agar direct route na mile, toh connecting routes dhoondein
  const connectingRoutes = [];
  const startBuses = allBuses.filter(bus => bus.route.some(stop => stop.name.toLowerCase() === fromLower));
  const endBuses = allBuses.filter(bus => bus.route.some(stop => stop.name.toLowerCase() === toLower));

  startBuses.forEach(startBus => {
    endBuses.forEach(endBus => {
      if (startBus.busId === endBus.busId) return; // Ek hi bus connect nahi kar sakti

      const fromIndexInStartBus = startBus.route.findIndex(s => s.name.toLowerCase() === fromLower);
      
      startBus.route.slice(fromIndexInStartBus + 1).forEach(transferStop => {
        const toIndexInEndBus = endBus.route.findIndex(s => s.name.toLowerCase() === toLower);
        const transferIndexInEndBus = endBus.route.findIndex(s => s.name.toLowerCase() === transferStop.name.toLowerCase());

        if (transferIndexInEndBus !== -1 && toIndexInEndBus !== -1 && transferIndexInEndBus < toIndexInEndBus) {
          if (!connectingRoutes.some(c => c.leg1.busId === startBus.busId && c.leg2.busId === endBus.busId)) {
            connectingRoutes.push({ type: 'connection', transferPoint: transferStop.name, leg1: startBus, leg2: endBus });
          }
        }
      });
    });
  });

  return connectingRoutes;
}

// --- API Endpoints ---

// GET: Google Maps se directions (raasta) lene ke liye
app.get('/api/directions', async (req, res) => {
  const { origin, destination } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required.' });
  }

  if (!process.env.VITE_API_KEY) {
        return res.status(500).json({ error: 'API key is not configured on the server.' });
    }

  try {
    const response = await googleMapsClient.directions({
      params: {
        origin,
        destination,
        mode: 'driving',
        key: import.meta.VITE_API_KEY, // Yeh key .env file se aayegi
      },
      timeout: 2000,
    });

    if (response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const leg = route.legs[0];
      res.json({
        polyline: route.overview_polyline.points,
        duration: leg.duration.value, // Safar ka samay seconds mein
      });
    } else {
      res.status(404).json({ error: 'No routes found.' });
    }
  } catch (error) {
    console.error('Error fetching directions:', error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: 'Failed to fetch directions.' });
  }
});

// GET: Ek bus ki jaankari ID se lene ke liye
app.get('/api/bus/:id', async (req, res) => {
  try {
    const busId = Number(req.params.id);
    if (isNaN(busId)) return res.status(400).send({ error: 'Invalid Bus ID format.' });
    
    const q = db.collection('buses').where('busId', '==', busId);
    const snapshot = await q.get();

    if (snapshot.empty) return res.status(404).send({ error: 'Bus not found' });
    
    res.status(200).json(snapshot.docs[0].data());
  } catch (error) {
    console.error('Error fetching bus from Firestore:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// GET: Sabhi buses ki list lene ke liye
app.get('/api/buses', async (req, res) => {
  try {
    const snapshot = await db.collection('buses').get();
    const allBuses = snapshot.docs.map(doc => doc.data());
    res.status(200).json(allBuses);
  } catch (error) {
    console.error('Error fetching all buses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Trip planner ke liye routes dhoondne ke liye
app.get('/api/routes', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ error: 'Start and end locations are required.' });
  
  try {
    const routes = await findBusRoutes(from, to);
    res.json(routes);
  } catch (error) {
    console.error('Error finding routes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Server ko start karein
app.listen(port, () => {
  console.log(`✅ Backend server is running at http://localhost:${port}`);
});