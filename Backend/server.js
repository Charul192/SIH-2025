import express from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Use CORS middleware to allow requests from your frontend
app.use(cors());

// Initialize Firebase Admin SDK
// The GOOGLE_APPLICATION_CREDENTIALS environment variable provides the path to the key file.
admin.initializeApp();

const db = admin.firestore();

// --- API Endpoint to get a bus by its ID ---
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
      console.log(`Bus with ID ${busId} not found.`);
      return res.status(404).send({ error: 'Bus not found' });
    }
    
    // Assuming busId is unique, we send the first document found
    const busData = snapshot.docs[0].data();
    console.log(`Found bus:`, busData.headsign);
    res.status(200).json(busData);

  } catch (error) {
    console.error('Error fetching from Firestore:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend server is running at http://localhost:${port}`);
});