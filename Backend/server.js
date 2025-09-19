import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from "./firebase.js";

// Load environment variables right at the beginning
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

// API Endpoint to get a bus by its ID
app.get('/api/bus/:id', async (req, res) => {
  try {
    const busId = Number(req.params.id);
    if (isNaN(busId)) {
      return res.status(400).send({ error: 'Invalid Bus ID format.' });
    }
    const busesRef = db.collection('buses');
    const q = busesRef.where('busId', '==', busId);
    const snapshot = await q.get();

    if (snapshot.empty) {
      return res.status(404).send({ error: 'Bus not found' });
    }
    
    const busData = snapshot.docs[0].data();
    res.status(200).json(busData);
  } catch (error) {
    console.error('Error fetching bus from Firestore:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// API Endpoint to find direct and connecting routes
app.get('/api/routes', async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Start and end locations are required.' });
  }

  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  try {
    const busesRef = db.collection('buses');
    const snapshot = await busesRef.get();
    if (snapshot.empty) {
      return res.json([]);
    }
    const allBuses = snapshot.docs.map(doc => doc.data());

    const directRoutes = [];
    allBuses.forEach(bus => {
      const fromIndex = bus.route.findIndex(stop => stop.name.toLowerCase() === fromLower);
      const toIndex = bus.route.findIndex(stop => stop.name.toLowerCase() === toLower);

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
        directRoutes.push({ ...bus, type: 'direct' });
      }
    });

    if (directRoutes.length > 0) {
      return res.json(directRoutes);
    }

    const connectingRoutes = [];
    const startBuses = allBuses.filter(bus => bus.route.some(stop => stop.name.toLowerCase() === fromLower));
    const endBuses = allBuses.filter(bus => bus.route.some(stop => stop.name.toLowerCase() === toLower));

    startBuses.forEach(startBus => {
      endBuses.forEach(endBus => {
        if (startBus.busId === endBus.busId) return;

        const fromIndexInStartBus = startBus.route.findIndex(s => s.name.toLowerCase() === fromLower);

        startBus.route.slice(fromIndexInStartBus + 1).forEach(transferStop => {
          const toIndexInEndBus = endBus.route.findIndex(s => s.name.toLowerCase() === toLower);
          const transferIndexInEndBus = endBus.route.findIndex(s => s.name.toLowerCase() === transferStop.name.toLowerCase());

          if (transferIndexInEndBus !== -1 && toIndexInEndBus !== -1 && transferIndexInEndBus < toIndexInEndBus) {
            if (!connectingRoutes.some(c => c.leg1.busId === startBus.busId && c.leg2.busId === endBus.busId)) {
              connectingRoutes.push({
                type: 'connection',
                transferPoint: transferStop.name,
                leg1: startBus,
                leg2: endBus
              });
            }
          }
        });
      });
    });

    res.json(connectingRoutes);

  } catch (error) {
    console.error('Error finding routes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`✅ Backend server is running at http://localhost:${port}`);
});

