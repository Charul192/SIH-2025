import admin from 'firebase-admin';

// IMPORTANT: Paste your entire array of bus objects directly here.
// I have included the first and last objects as an example.
// You must replace this with your full list of 20 buses.
const busesData = [
  {
    "busNumber": 1,
    "operator": "Bhawani Travels",
    "phoneNumber": "+91 1860 30010101",
    "headsign": "Volvo A/C Sleeper (2+1)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Amritsar",
        "lat": 31.63398,
        "lng": 74.872261
      },
      "stops": [
        {
          "name": "Beas",
          "lat": 31.515,
          "lng": 75.291,
          "eta": "2025-09-13T16:55:00Z"
        },
        {
          "name": "Kartarpur",
          "lat": 31.441,
          "lng": 75.498,
          "eta": "2025-09-13T17:20:00Z"
        }
      ],
      "end": {
        "name": "Jalandhar",
        "lat": 31.326,
        "lng": 75.5762
      }
    },
    "startTime": "2025-09-13T16:00:00Z",
    "eta": "1h 45m",
    "endTime": "2025-09-13T17:45:00Z"
  },
  {
    "busNumber": 2,
    "operator": "Pritam Bus Service",
    "phoneNumber": "+91 1860 30010102",
    "headsign": "Non-A/C Seater (3+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Ludhiana",
        "lat": 30.900965,
        "lng": 75.85727
      },
      "stops": [
        {
          "name": "Doraha",
          "lat": 30.8,
          "lng": 76.03,
          "eta": "2025-09-13T18:10:00Z"
        },
        {
          "name": "Sirhind",
          "lat": 30.6432,
          "lng": 76.3842,
          "eta": "2025-09-13T18:55:00Z"
        }
      ],
      "end": {
        "name": "Patiala",
        "lat": 30.3398,
        "lng": 76.3869
      }
    },
    "startTime": "2025-09-13T17:30:00Z",
    "eta": "2h 10m",
    "endTime": "2025-09-13T19:40:00Z"
  },
  {
    "busNumber": 3,
    "operator": "Chandigarh Travels",
    "phoneNumber": "+91 1860 30010103",
    "headsign": "Mercedes Benz A/C Seater (2+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Chandigarh",
        "lat": 30.7333,
        "lng": 76.7794
      },
      "stops": [
        {
          "name": "Kharar",
          "lat": 30.75,
          "lng": 76.64,
          "eta": "2025-09-13T19:10:00Z"
        },
        {
          "name": "Ropar",
          "lat": 30.9664,
          "lng": 76.5331,
          "eta": "2025-09-13T19:55:00Z"
        },
        {
          "name": "Hoshiarpur",
          "lat": 31.51,
          "lng": 75.91,
          "eta": "2025-09-13T21:10:00Z"
        },
        {
          "name": "Dasuya",
          "lat": 31.81,
          "lng": 75.66,
          "eta": "2025-09-13T21:55:00Z"
        }
      ],
      "end": {
        "name": "Pathankot",
        "lat": 32.2618,
        "lng": 75.6669
      }
    },
    "startTime": "2025-09-13T18:45:00Z",
    "eta": "4h 0m",
    "endTime": "2025-09-13T22:45:00Z"
  },
  {
    "busNumber": 4,
    "operator": "Happy Journey Tours",
    "phoneNumber": "+91 1860 30010104",
    "headsign": "A/C Seater / Sleeper (2+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Bathinda",
        "lat": 30.2072,
        "lng": 74.9455
      },
      "stops": [
        {
          "name": "Faridkot",
          "lat": 30.675,
          "lng": 74.754,
          "eta": "2025-09-13T20:35:00Z"
        },
        {
          "name": "Tarn Taran Sahib",
          "lat": 31.4491,
          "lng": 74.9205,
          "eta": "2025-09-13T21:50:00Z"
        }
      ],
      "end": {
        "name": "Amritsar",
        "lat": 31.63398,
        "lng": 74.872261
      }
    },
    "startTime": "2025-09-13T19:15:00Z",
    "eta": "3h 30m",
    "endTime": "2025-09-13T22:45:00Z"
  },
  {
    "busNumber": 5,
    "operator": "Khalsa Transport",
    "phoneNumber": "+91 1860 30010105",
    "headsign": "Non-A/C Sleeper",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Hoshiarpur",
        "lat": 31.5334,
        "lng": 75.9189
      },
      "stops": [
        {
          "name": "Adampur",
          "lat": 31.433,
          "lng": 75.722,
          "eta": "2025-09-13T20:35:00Z"
        },
        {
          "name": "Phagwara",
          "lat": 31.22,
          "lng": 75.77,
          "eta": "2025-09-13T21:15:00Z"
        }
      ],
      "end": {
        "name": "Ludhiana",
        "lat": 30.900965,
        "lng": 75.85727
      }
    },
    "startTime": "2025-09-13T20:00:00Z",
    "eta": "1h 55m",
    "endTime": "2025-09-13T21:55:00Z"
  },
  {
    "busNumber": 6,
    "operator": "Bhawani Travels",
    "phoneNumber": "+91 1860 30010106",
    "headsign": "Volvo A/C Sleeper (2+1)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Jalandhar",
        "lat": 31.326,
        "lng": 75.5762
      },
      "stops": [
        {
          "name": "Phagwara",
          "lat": 31.22,
          "lng": 75.77,
          "eta": "2025-09-13T21:25:00Z"
        },
        {
          "name": "Goraya",
          "lat": 31.12,
          "lng": 75.77,
          "eta": "2025-09-13T21:40:00Z"
        },
        {
          "name": "Phillaur",
          "lat": 31.02,
          "lng": 75.78,
          "eta": "2025-09-13T21:50:00Z"
        }
      ],
      "end": {
        "name": "Ludhiana",
        "lat": 30.900965,
        "lng": 75.85727
      }
    },
    "startTime": "2025-09-13T21:00:00Z",
    "eta": "1h 10m",
    "endTime": "2025-09-13T22:10:00Z"
  },
  {
    "busNumber": 7,
    "operator": "Travel Hub",
    "phoneNumber": "+91 1860 30010107",
    "headsign": "A/C Seater (2+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Patiala",
        "lat": 30.3398,
        "lng": 76.3869
      },
      "stops": [
        {
          "name": "Sangrur",
          "lat": 30.2458,
          "lng": 75.8421,
          "eta": "2025-09-13T23:40:00Z"
        },
        {
          "name": "Barnala",
          "lat": 30.38,
          "lng": 75.55,
          "eta": "2025-09-14T00:25:00Z"
        }
      ],
      "end": {
        "name": "Bathinda",
        "lat": 30.2072,
        "lng": 74.9455
      }
    },
    "startTime": "2025-09-13T22:30:00Z",
    "eta": "2h 40m",
    "endTime": "2025-09-14T01:10:00Z"
  },
  {
    "busNumber": 8,
    "operator": "Prince Travels",
    "phoneNumber": "+91 1860 30010108",
    "headsign": "Non-A/C Seater (3+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Ropar",
        "lat": 30.9704,
        "lng": 76.5369
      },
      "stops": [
        {
          "name": "Nawanshahr",
          "lat": 31.13,
          "lng": 76.12,
          "eta": "2025-09-14T06:45:00Z"
        },
        {
          "name": "Jalandhar",
          "lat": 31.326,
          "lng": 75.5762,
          "eta": "2025-09-14T07:45:00Z"
        },
        {
          "name": "Beas",
          "lat": 31.515,
          "lng": 75.291,
          "eta": "2025-09-14T08:25:00Z"
        }
      ],
      "end": {
        "name": "Amritsar",
        "lat": 31.63398,
        "lng": 74.872261
      }
    },
    "startTime": "2025-09-14T06:00:00Z",
    "eta": "3h 0m",
    "endTime": "2025-09-14T09:00:00Z"
  },
  {
    "busNumber": 9,
    "operator": "Janta Roadways",
    "phoneNumber": "+91 1860 30010109",
    "headsign": "A/C Seater (2+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Mohali",
        "lat": 30.7046,
        "lng": 76.7179
      },
      "stops": [
        {
          "name": "Sirhind",
          "lat": 30.6432,
          "lng": 76.3842,
          "eta": "2025-09-14T08:05:00Z"
        },
        {
          "name": "Ludhiana",
          "lat": 30.9,
          "lng": 75.86,
          "eta": "2025-09-14T09:05:00Z"
        },
        {
          "name": "Jagraon",
          "lat": 30.79,
          "lng": 75.47,
          "eta": "2025-09-14T09:40:00Z"
        }
      ],
      "end": {
        "name": "Moga",
        "lat": 30.8172,
        "lng": 75.1704
      }
    },
    "startTime": "2025-09-14T07:15:00Z",
    "eta": "2h 50m",
    "endTime": "2025-09-14T10:05:00Z"
  },
  {
    "busNumber": 10,
    "operator": "Bhawani Travels",
    "phoneNumber": "+91 1860 30010110",
    "headsign": "Volvo A/C Sleeper (2+1)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Ferozepur",
        "lat": 30.9254,
        "lng": 74.619
      },
      "stops": [
        {
          "name": "Zira",
          "lat": 30.97,
          "lng": 74.99,
          "eta": "2025-09-14T09:15:00Z"
        },
        {
          "name": "Nakodar",
          "lat": 31.13,
          "lng": 75.48,
          "eta": "2025-09-14T10:10:00Z"
        }
      ],
      "end": {
        "name": "Jalandhar",
        "lat": 31.326,
        "lng": 75.5762
      }
    },
    "startTime": "2025-09-14T08:30:00Z",
    "eta": "2h 30m",
    "endTime": "2025-09-14T11:00:00Z"
  },
  {
    "busNumber": 11,
    "operator": "Royal Express",
    "phoneNumber": "+91 1860 30010111",
    "headsign": "Non-A/C Seater (3+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Kapurthala",
        "lat": 31.3789,
        "lng": 75.3853
      },
      "stops": [
        {
          "name": "Phagwara",
          "lat": 31.22,
          "lng": 75.77,
          "eta": "2025-09-14T10:30:00Z"
        },
        {
          "name": "Banga",
          "lat": 31.2,
          "lng": 76,
          "eta": "2025-09-14T10:55:00Z"
        },
        {
          "name": "Ropar",
          "lat": 30.9664,
          "lng": 76.5331,
          "eta": "2025-09-14T11:55:00Z"
        }
      ],
      "end": {
        "name": "Chandigarh",
        "lat": 30.7333,
        "lng": 76.7794
      }
    },
    "startTime": "2025-09-14T09:45:00Z",
    "eta": "3h 15m",
    "endTime": "2025-09-14T13:00:00Z"
  },
  {
    "busNumber": 12,
    "operator": "Pritam Bus Service",
    "phoneNumber": "+91 1860 30010112",
    "headsign": "A/C Sleeper (2+1)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Pathankot",
        "lat": 32.2618,
        "lng": 75.6669
      },
      "stops": [
        {
          "name": "Mukerian",
          "lat": 31.95,
          "lng": 75.62,
          "eta": "2025-09-14T12:00:00Z"
        },
        {
          "name": "Dasuya",
          "lat": 31.81,
          "lng": 75.66,
          "eta": "2025-09-14T12:30:00Z"
        },
        {
          "name": "Jalandhar",
          "lat": 31.326,
          "lng": 75.5762,
          "eta": "2025-09-14T14:00:00Z"
        }
      ],
      "end": {
        "name": "Ludhiana",
        "lat": 30.900965,
        "lng": 75.85727
      }
    },
    "startTime": "2025-09-14T11:00:00Z",
    "eta": "4h 30m",
    "endTime": "2025-09-14T15:30:00Z"
  },
  {
    "busNumber": 13,
    "operator": "Happy Journey Tours",
    "phoneNumber": "+91 1860 30010113",
    "headsign": "A/C Seater (2+2)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Moga",
        "lat": 30.8172,
        "lng": 75.1704
      },
      "stops": [
        {
          "name": "Barnala",
          "lat": 30.38,
          "lng": 75.55,
          "eta": "2025-09-14T13:40:00Z"
        },
        {
          "name": "Dhuri",
          "lat": 30.37,
          "lng": 75.86,
          "eta": "2025-09-14T14:10:00Z"
        },
        {
          "name": "Sangrur",
          "lat": 30.2458,
          "lng": 75.8421,
          "eta": "2025-09-14T14:40:00Z"
        }
      ],
      "end": {
        "name": "Patiala",
        "lat": 30.3398,
        "lng": 76.3869
      }
    },
    "startTime": "2025-09-14T12:30:00Z",
    "eta": "3h 40m",
    "endTime": "2025-09-14T16:10:00Z"
  },
  {
    "busNumber": 14,
    "operator": "Khalsa Transport",
    "phoneNumber": "+91 1860 30010114",
    "headsign": "Non-A/C Sleeper",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Bathinda",
        "lat": 30.2072,
        "lng": 74.9455
      },
      "stops": [
        {
          "name": "Sangrur",
          "lat": 30.2458,
          "lng": 75.8421,
          "eta": "2025-09-14T15:45:00Z"
        },
        {
          "name": "Patiala",
          "lat": 30.34,
          "lng": 76.39,
          "eta": "2025-09-14T16:55:00Z"
        },
        {
          "name": "Rajpura",
          "lat": 30.48,
          "lng": 76.59,
          "eta": "2025-09-14T17:30:00Z"
        }
      ],
      "end": {
        "name": "Chandigarh",
        "lat": 30.7333,
        "lng": 76.7794
      }
    },
    "startTime": "2025-09-14T14:00:00Z",
    "eta": "4h 15m",
    "endTime": "2025-09-14T18:15:00Z"
  },
  {
    "busNumber": 15,
    "operator": "Janta Roadways",
    "phoneNumber": "+91 1860 30010115",
    "headsign": "Volvo A/C Sleeper (2+1)",
    "frequency": "Daily",
    "route": {
      "start": {
        "name": "Jalandhar",
        "lat": 31.326,
        "lng": 75.5762
      },
      "stops": [
        {
          "name": "Kartarpur",
          "lat": 31.441,
          "lng": 75.498,
          "eta": "2025-09-14T15:55:00Z"
        },
        {
          "name": "Beas",
          "lat": 31.515,
          "lng": 75.291,
          "eta": "2025-09-14T16:25:00Z"
        }
      ],
      "end": {
        "name": "Amritsar",
        "lat": 31.63398,
        "lng": 74.872261
      }
    },
    "startTime": "2025-09-14T15:30:00Z",
    "eta": "1h 50m",
    "endTime": "2025-09-14T17:20:00Z"
  }
];


// --- The rest of the script remains the same ---

// Initialize Firebase using the environment variable
import 'dotenv/config';
admin.initializeApp();
const db = admin.firestore();

async function importDirectData() {
  if (!Array.isArray(busesData) || busesData.length === 0) {
    console.log('No data found in the busesData array to import.');
    return;
  }

  const collectionRef = db.collection('buses');
  const batch = db.batch();
  
  console.log(`Preparing to import ${busesData.length} bus documents...`);

  busesData.forEach(bus => {
    bus.startTime = admin.firestore.Timestamp.fromDate(new Date(bus.startTime));
    bus.route.start.location = new admin.firestore.GeoPoint(bus.route.start.lat, bus.route.start.lng);
    bus.route.end.location = new admin.firestore.GeoPoint(bus.route.end.lat, bus.route.end.lng);
    
    const docRef = collectionRef.doc(); 
    batch.set(docRef, bus);
  });

  try {
    await batch.commit();
    console.log('✅ Successfully imported all bus data into Firestore!');
  } catch (error) {
    console.error('❌ Error while importing data:', error);
  }
}

// Run the function
importDirectData();