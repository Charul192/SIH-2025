import admin from 'firebase-admin';
import 'dotenv/config';

// The full, correct data for all 20 buses.
const busesData = [
  {
    "busId": 1,
    "operator": "Singh Travels",
    "phoneNumber": "+91 1860 30010201",
    "headsign": "Volvo A/C Sleeper (2+1)",
    "frequency": 127,
    "currentLocation": { "lat": 31.63398, "lng": 74.872261 },
    "startTime": "2025-09-17T06:30:00Z",
    "eta": "2h 45m",
    "route": [
      {
        "name": "Amritsar Bus Stand", "lat": 31.63398, "lng": 74.872261, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T06:30:00Z"
      },
      {
        "name": "Beas", "lat": 31.5174, "lng": 75.2913, "isCrossed": false,
        "arrivalTime": "2025-09-17T07:10:00Z", "departureTime": "2025-09-17T07:12:00Z"
      },
      {
        "name": "Jalandhar (Rama Mandi Chowk)", "lat": 31.2988, "lng": 75.6033, "isCrossed": false,
        "arrivalTime": "2025-09-17T07:50:00Z", "departureTime": "2025-09-17T08:00:00Z"
      },
      {
        "name": "Phillaur", "lat": 31.0263, "lng": 75.7865, "isCrossed": false,
        "arrivalTime": "2025-09-17T08:40:00Z", "departureTime": "2025-09-17T08:42:00Z"
      },
      {
        "name": "Ludhiana Bus Stand", "lat": 30.900965, "lng": 75.85727, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:15:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 2,
    "operator": "Punjab Roadways",
    "phoneNumber": "+91 1860 30010202",
    "headsign": "Non-A/C Seater (3+2)",
    "frequency": 127,
    "currentLocation": { "lat": 30.3398, "lng": 76.3869 },
    "startTime": "2025-09-17T07:15:00Z",
    "eta": "1h 30m",
    "route": [
      {
        "name": "Patiala Bus Stand", "lat": 30.3398, "lng": 76.3869, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T07:15:00Z"
      },
      {
        "name": "Rajpura Town", "lat": 30.4811, "lng": 76.5950, "isCrossed": false,
        "arrivalTime": "2025-09-17T07:45:00Z", "departureTime": "2025-09-17T07:50:00Z"
      },
      {
        "name": "Zirakpur Crossing", "lat": 30.6483, "lng": 76.8171, "isCrossed": false,
        "arrivalTime": "2025-09-17T08:20:00Z", "departureTime": "2025-09-17T08:25:00Z"
      },
      {
        "name": "Chandigarh (ISBT Sector 43)", "lat": 30.7333, "lng": 76.7794, "isCrossed": false,
        "arrivalTime": "2025-09-17T08:45:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 3,
    "operator": "Golden Temple Express",
    "phoneNumber": "+91 1860 30010203",
    "headsign": "Mercedes Benz A/C Seater (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 31.3260, "lng": 75.5762 },
    "startTime": "2025-09-17T08:00:00Z",
    "eta": "2h 15m",
    "route": [
      {
        "name": "Jalandhar Bus Stand", "lat": 31.3260, "lng": 75.5762, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T08:00:00Z"
      },
      {
        "name": "Dasuya", "lat": 31.8172, "lng": 75.6565, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:00:00Z", "departureTime": "2025-09-17T09:05:00Z"
      },
      {
        "name": "Mukerian", "lat": 31.9515, "lng": 75.6173, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:25:00Z", "departureTime": "2025-09-17T09:30:00Z"
      },
      {
        "name": "Pathankot Bus Stand", "lat": 32.2618, "lng": 75.6669, "isCrossed": false,
        "arrivalTime": "2025-09-17T10:15:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 4,
    "operator": "Bhawani Travels",
    "phoneNumber": "+91 1860 30010204",
    "headsign": "A/C Seater / Sleeper (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 30.2072, "lng": 74.9455 },
    "startTime": "2025-09-17T09:45:00Z",
    "eta": "1h 55m",
    "route": [
      {
        "name": "Bathinda Bus Stand", "lat": 30.2072, "lng": 74.9455, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T09:45:00Z"
      },
      {
        "name": "Goniana", "lat": 30.3151, "lng": 74.9082, "isCrossed": false,
        "arrivalTime": "2025-09-17T10:05:00Z", "departureTime": "2025-09-17T10:07:00Z"
      },
      {
        "name": "Kot Kapura", "lat": 30.5843, "lng": 74.8252, "isCrossed": false,
        "arrivalTime": "2025-09-17T10:35:00Z", "departureTime": "2025-09-17T10:40:00Z"
      },
      {
        "name": "Faridkot", "lat": 30.6751, "lng": 74.7552, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:00:00Z", "departureTime": "2025-09-17T11:05:00Z"
      },
      {
        "name": "Ferozepur Cantt", "lat": 30.9254, "lng": 74.6190, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:40:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 5,
    "operator": "Khalsa Transport",
    "phoneNumber": "+91 1860 30010205",
    "headsign": "Non-A/C Sleeper",
    "frequency": 127,
    "currentLocation": { "lat": 31.5334, "lng": 75.9189 },
    "startTime": "2025-09-17T10:30:00Z",
    "eta": "1h 10m",
    "route": [
      {
        "name": "Hoshiarpur Bus Stand", "lat": 31.5334, "lng": 75.9189, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T10:30:00Z"
      },
      {
        "name": "Adampur Doaba", "lat": 31.4331, "lng": 75.7247, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:05:00Z", "departureTime": "2025-09-17T11:10:00Z"
      },
      {
        "name": "Jalandhar Cantt", "lat": 31.2781, "lng": 75.6209, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:30:00Z", "departureTime": "2025-09-17T11:32:00Z"
      },
      {
        "name": "Jalandhar Bus Stand", "lat": 31.3260, "lng": 75.5762, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:40:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 6,
    "operator": "Pritam Bus Service",
    "phoneNumber": "+91 1860 30010206",
    "headsign": "A/C Sleeper (2+1)",
    "frequency": 127,
    "currentLocation": { "lat": 30.900965, "lng": 75.857270 },
    "startTime": "2025-09-17T11:00:00Z",
    "eta": "1h 40m",
    "route": [
      {
        "name": "Ludhiana Bus Stand", "lat": 30.900965, "lng": 75.857270, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T11:00:00Z"
      },
      {
        "name": "Mullanpur Dakha", "lat": 30.8647, "lng": 75.6885, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:30:00Z", "departureTime": "2025-09-17T11:32:00Z"
      },
      {
        "name": "Jagraon", "lat": 30.7876, "lng": 75.4789, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:55:00Z", "departureTime": "2025-09-17T12:00:00Z"
      },
      {
        "name": "Moga Bus Stand", "lat": 30.8172, "lng": 75.1704, "isCrossed": false,
        "arrivalTime": "2025-09-17T12:40:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 7,
    "operator": "Happy Journey Tours",
    "phoneNumber": "+91 1860 30010209",
    "headsign": "Volvo A/C Seater (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 32.2618, "lng": 75.6669 },
    "startTime": "2025-09-17T14:00:00Z",
    "eta": "2h 30m",
    "route": [
      {
        "name": "Pathankot Bus Stand", "lat": 32.2618, "lng": 75.6669, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T14:00:00Z"
      },
      {
        "name": "Dinanagar", "lat": 32.1386, "lng": 75.4764, "isCrossed": false,
        "arrivalTime": "2025-09-17T14:25:00Z", "departureTime": "2025-09-17T14:27:00Z"
      },
      {
        "name": "Gurdaspur", "lat": 32.0416, "lng": 75.4053, "isCrossed": false,
        "arrivalTime": "2025-09-17T14:55:00Z", "departureTime": "2025-09-17T15:00:00Z"
      },
      {
        "name": "Batala", "lat": 31.8185, "lng": 75.2026, "isCrossed": false,
        "arrivalTime": "2025-09-17T15:40:00Z", "departureTime": "2025-09-17T15:45:00Z"
      },
      {
        "name": "Amritsar Bus Stand", "lat": 31.633980, "lng": 74.872261, "isCrossed": false,
        "arrivalTime": "2025-09-17T16:30:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 8,
    "operator": "Royal Express",
    "phoneNumber": "+91 1860 30010220",
    "headsign": "Non-A/C Sleeper",
    "frequency": 127,
    "currentLocation": { "lat": 30.3398, "lng": 76.3869 },
    "startTime": "2025-09-17T09:00:00Z",
    "eta": "1h 35m",
    "route": [
      {
        "name": "Patiala Bus Stand", "lat": 30.3398, "lng": 76.3869, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T09:00:00Z"
      },
      {
        "name": "Bhawanigarh", "lat": 30.2915, "lng": 76.0421, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:40:00Z", "departureTime": "2025-09-17T09:42:00Z"
      },
      {
        "name": "Sangrur Bus Stand", "lat": 30.255, "lng": 75.842, "isCrossed": false,
        "arrivalTime": "2025-09-17T10:35:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 9,
    "operator": "Janta Roadways",
    "phoneNumber": "+91 1860 30010219",
    "headsign": "A/C Sleeper (2+1)",
    "frequency": 127,
    "currentLocation": { "lat": 32.0416, "lng": 75.4053 },
    "startTime": "2025-09-17T08:20:00Z",
    "eta": "1h 00m",
    "route": [
      {
        "name": "Gurdaspur", "lat": 32.0416, "lng": 75.4053, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T08:20:00Z"
      },
      {
        "name": "Dinanagar", "lat": 32.1386, "lng": 75.4764, "isCrossed": false,
        "arrivalTime": "2025-09-17T08:45:00Z", "departureTime": "2025-09-17T08:47:00Z"
      },
      {
        "name": "Pathankot Bus Stand", "lat": 32.2618, "lng": 75.6669, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:20:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 10,
    "operator": "Himachal Roadways (HRTC)",
    "phoneNumber": "+91 1860 30010221",
    "headsign": "HIM-GOURAV A/C (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 30.7333, "lng": 76.7794 },
    "startTime": "2025-09-17T09:00:00Z",
    "eta": "4h 30m",
    "route": [
      {
        "name": "Chandigarh (ISBT Sector 43)", "lat": 30.7333, "lng": 76.7794, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T09:00:00Z"
      },
      {
        "name": "Kalka", "lat": 30.8351, "lng": 76.9351, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:45:00Z", "departureTime": "2025-09-17T09:50:00Z"
      },
      {
        "name": "Dharampur", "lat": 30.9023, "lng": 77.0205, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:00:00Z", "departureTime": "2025-09-17T11:05:00Z"
      },
      {
        "name": "Solan", "lat": 30.9079, "lng": 77.0984, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:45:00Z", "departureTime": "2025-09-17T11:50:00Z"
      },
      {
        "name": "Shimla (ISBT Tutikandi)", "lat": 31.0967, "lng": 77.1466, "isCrossed": false,
        "arrivalTime": "2025-09-17T13:30:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 11,
    "operator": "Indo Canadian Travels",
    "phoneNumber": "+91 1860 30010222",
    "headsign": "Mercedes-Benz Super Luxury",
    "frequency": 127,
    "currentLocation": { "lat": 31.63398, "lng": 74.872261 },
    "startTime": "2025-09-17T21:00:00Z",
    "eta": "8h 15m",
    "route": [
      {
        "name": "Amritsar (Opp. Bus Stand)", "lat": 31.63398, "lng": 74.872261, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T21:00:00Z"
      },
      {
        "name": "Jalandhar Bypass", "lat": 31.2988, "lng": 75.6033, "isCrossed": false,
        "arrivalTime": "2025-09-17T22:15:00Z", "departureTime": "2025-09-17T22:20:00Z"
      },
      {
        "name": "Ludhiana (Samrala Chowk)", "lat": 30.9084, "lng": 75.8783, "isCrossed": false,
        "arrivalTime": "2025-09-17T23:20:00Z", "departureTime": "2025-09-17T23:25:00Z"
      },
      {
        "name": "Ambala Cantt", "lat": 30.3475, "lng": 76.8436, "isCrossed": false,
        "arrivalTime": "2025-09-18T01:00:00Z", "departureTime": "2025-09-18T01:15:00Z"
      },
      {
        "name": "Karnal Bypass", "lat": 29.7027, "lng": 76.9926, "isCrossed": false,
        "arrivalTime": "2025-09-18T02:20:00Z", "departureTime": "2025-09-18T02:22:00Z"
      },
      {
        "name": "Sonipat (Murthal Dhaba)", "lat": 29.0289, "lng": 77.0658, "isCrossed": false,
        "arrivalTime": "2025-09-18T03:30:00Z", "departureTime": "2025-09-18T03:35:00Z"
      },
      {
        "name": "Delhi (ISBT Kashmiri Gate)", "lat": 28.6672, "lng": 77.2323, "isCrossed": false,
        "arrivalTime": "2025-09-18T05:15:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 12,
    "operator": "PEPSU (PRTC)",
    "phoneNumber": "+91 1860 30010223",
    "headsign": "Ordinary Seater (3+2)",
    "frequency": 127,
    "currentLocation": { "lat": 30.900965, "lng": 75.85727 },
    "startTime": "2025-09-17T13:00:00Z",
    "eta": "2h 00m",
    "route": [
      {
        "name": "Ludhiana Bus Stand", "lat": 30.900965, "lng": 75.85727, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T13:00:00Z"
      },
      {
        "name": "Doraha", "lat": 30.7963, "lng": 76.0264, "isCrossed": false,
        "arrivalTime": "2025-09-17T13:35:00Z", "departureTime": "2025-09-17T13:37:00Z"
      },
      {
        "name": "Sirhind", "lat": 30.6231, "lng": 76.3881, "isCrossed": false,
        "arrivalTime": "2025-09-17T14:15:00Z", "departureTime": "2025-09-17T14:20:00Z"
      },
      {
        "name": "Patiala Bus Stand", "lat": 30.3398, "lng": 76.3869, "isCrossed": false,
        "arrivalTime": "2025-09-17T15:00:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 13,
    "operator": "Haryana Roadways",
    "phoneNumber": "+91 1860 30010224",
    "headsign": "Ordinary Bus",
    "frequency": 127,
    "currentLocation": { "lat": 30.2072, "lng": 74.9455 },
    "startTime": "2025-09-17T15:30:00Z",
    "eta": "2h 10m",
    "route": [
      {
        "name": "Bathinda Bus Stand", "lat": 30.2072, "lng": 74.9455, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T15:30:00Z"
      },
      {
        "name": "Kalanwali", "lat": 29.8354, "lng": 74.9602, "isCrossed": false,
        "arrivalTime": "2025-09-17T16:15:00Z", "departureTime": "2025-09-17T16:17:00Z"
      },
      {
        "name": "Mandi Dabwali", "lat": 29.9536, "lng": 74.7262, "isCrossed": false,
        "arrivalTime": "2025-09-17T16:40:00Z", "departureTime": "2025-09-17T16:45:00Z"
      },
      {
        "name": "Sirsa Bus Stand", "lat": 29.5352, "lng": 75.0232, "isCrossed": false,
        "arrivalTime": "2025-09-17T17:40:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 14,
    "operator": "Private Tourist Bus",
    "phoneNumber": "+91 1860 30010225",
    "headsign": "A/C Mini Coach (2+1)",
    "frequency": 84,
    "currentLocation": { "lat": 32.2618, "lng": 75.6669 },
    "startTime": "2025-09-17T10:00:00Z",
    "eta": "2h 30m",
    "route": [
      {
        "name": "Pathankot Cantt", "lat": 32.2618, "lng": 75.6669, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T10:00:00Z"
      },
      {
        "name": "Dunera", "lat": 32.4173, "lng": 75.8672, "isCrossed": false,
        "arrivalTime": "2025-09-17T10:50:00Z", "departureTime": "2025-09-17T10:52:00Z"
      },
      {
        "name": "Banikhet", "lat": 32.5516, "lng": 75.9529, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:45:00Z", "departureTime": "2025-09-17T11:50:00Z"
      },
      {
        "name": "Dalhousie Bus Stand", "lat": 32.5323, "lng": 75.9796, "isCrossed": false,
        "arrivalTime": "2025-09-17T12:30:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 15,
    "operator": "CTU",
    "phoneNumber": "+91 1860 30010226",
    "headsign": "A/C Bus",
    "frequency": 127,
    "currentLocation": { "lat": 30.7046, "lng": 76.7179 },
    "startTime": "2025-09-17T16:00:00Z",
    "eta": "1h 45m",
    "route": [
      {
        "name": "Mohali Bus Stand Phase 8", "lat": 30.7046, "lng": 76.7179, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T16:00:00Z"
      },
      {
        "name": "Zirakpur Crossing", "lat": 30.6483, "lng": 76.8171, "isCrossed": false,
        "arrivalTime": "2025-09-17T16:30:00Z", "departureTime": "2025-09-17T16:35:00Z"
      },
      {
        "name": "Dera Bassi", "lat": 30.5973, "lng": 76.8488, "isCrossed": false,
        "arrivalTime": "2025-09-17T16:55:00Z", "departureTime": "2025-09-17T16:57:00Z"
      },
      {
        "name": "Ambala Cantt Bus Stand", "lat": 30.3475, "lng": 76.8436, "isCrossed": false,
        "arrivalTime": "2025-09-17T17:45:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 16,
    "operator": "Punjab Roadways",
    "phoneNumber": "+91 1860 30010227",
    "headsign": "Ordinary Bus",
    "frequency": 127,
    "currentLocation": { "lat": 30.9254, "lng": 74.6190 },
    "startTime": "2025-09-17T12:30:00Z",
    "eta": "2h 20m",
    "route": [
      {
        "name": "Ferozepur Bus Stand", "lat": 30.9254, "lng": 74.6190, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T12:30:00Z"
      },
      {
        "name": "Jalalabad", "lat": 30.6083, "lng": 74.2562, "isCrossed": false,
        "arrivalTime": "2025-09-17T13:30:00Z", "departureTime": "2025-09-17T13:35:00Z"
      },
      {
        "name": "Fazilka", "lat": 30.4027, "lng": 74.0264, "isCrossed": false,
        "arrivalTime": "2025-09-17T14:10:00Z", "departureTime": "2025-09-17T14:15:00Z"
      },
      {
        "name": "Abohar Bus Stand", "lat": 30.1437, "lng": 74.1952, "isCrossed": false,
        "arrivalTime": "2025-09-17T14:50:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 17,
    "operator": "J&K SRTC",
    "phoneNumber": "+91 1860 30010228",
    "headsign": "A/C Seater (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 31.63398, "lng": 74.872261 },
    "startTime": "2025-09-17T07:00:00Z",
    "eta": "5h 30m",
    "route": [
      {
        "name": "Amritsar Bus Stand", "lat": 31.63398, "lng": 74.872261, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T07:00:00Z"
      },
      {
        "name": "Gurdaspur Bypass", "lat": 32.0416, "lng": 75.4053, "isCrossed": false,
        "arrivalTime": "2025-09-17T08:30:00Z", "departureTime": "2025-09-17T08:32:00Z"
      },
      {
        "name": "Pathankot", "lat": 32.2618, "lng": 75.6669, "isCrossed": false,
        "arrivalTime": "2025-09-17T09:15:00Z", "departureTime": "2025-09-17T09:25:00Z"
      },
      {
        "name": "Kathua", "lat": 32.3811, "lng": 75.5230, "isCrossed": false,
        "arrivalTime": "2025-09-17T10:15:00Z", "departureTime": "2025-09-17T10:20:00Z"
      },
      {
        "name": "Samba", "lat": 32.5638, "lng": 75.1235, "isCrossed": false,
        "arrivalTime": "2025-09-17T11:30:00Z", "departureTime": "2025-09-17T11:32:00Z"
      },
      {
        "name": "Jammu Bus Stand", "lat": 32.7056, "lng": 74.8560, "isCrossed": false,
        "arrivalTime": "2025-09-17T12:30:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 18,
    "operator": "PEPSU (PRTC)",
    "phoneNumber": "+91 1860 30010229",
    "headsign": "Volvo A/C Seater (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 30.900965, "lng": 75.85727 },
    "startTime": "2025-09-17T23:30:00Z",
    "eta": "5h 15m",
    "route": [
      {
        "name": "Ludhiana Bus Stand", "lat": 30.900965, "lng": 75.85727, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T23:30:00Z"
      },
      {
        "name": "Rajpura", "lat": 30.4811, "lng": 76.5950, "isCrossed": false,
        "arrivalTime": "2025-09-18T00:50:00Z", "departureTime": "2025-09-18T00:52:00Z"
      },
      {
        "name": "Ambala Cantt", "lat": 30.3475, "lng": 76.8436, "isCrossed": false,
        "arrivalTime": "2025-09-18T01:20:00Z", "departureTime": "2025-09-18T01:30:00Z"
      },
      {
        "name": "Karnal", "lat": 29.6857, "lng": 76.9905, "isCrossed": false,
        "arrivalTime": "2025-09-18T02:30:00Z", "departureTime": "2025-09-18T02:32:00Z"
      },
      {
        "name": "Panipat", "lat": 29.3909, "lng": 76.9635, "isCrossed": false,
        "arrivalTime": "2025-09-18T03:10:00Z", "departureTime": "2025-09-18T03:12:00Z"
      },
      {
        "name": "Delhi (ISBT Kashmiri Gate)", "lat": 28.6672, "lng": 77.2323, "isCrossed": false,
        "arrivalTime": "2025-09-18T04:45:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 19,
    "operator": "Himachal Roadways (HRTC)",
    "phoneNumber": "+91 1860 30010230",
    "headsign": "HIM-MANI Deluxe",
    "frequency": 127,
    "currentLocation": { "lat": 30.7333, "lng": 76.7794 },
    "startTime": "2025-09-17T20:00:00Z",
    "eta": "9h 30m",
    "route": [
      {
        "name": "Chandigarh (ISBT Sector 43)", "lat": 30.7333, "lng": 76.7794, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T20:00:00Z"
      },
      {
        "name": "Kiratpur Sahib", "lat": 31.1818, "lng": 76.5714, "isCrossed": false,
        "arrivalTime": "2025-09-17T21:20:00Z", "departureTime": "2025-09-17T21:22:00Z"
      },
      {
        "name": "Bilaspur (HP)", "lat": 31.3316, "lng": 76.7570, "isCrossed": false,
        "arrivalTime": "2025-09-17T22:45:00Z", "departureTime": "2025-09-17T22:55:00Z"
      },
      {
        "name": "Mandi", "lat": 31.7088, "lng": 76.9324, "isCrossed": false,
        "arrivalTime": "2025-09-18T01:00:00Z", "departureTime": "2025-09-18T01:10:00Z"
      },
      {
        "name": "Kullu", "lat": 31.9576, "lng": 77.1094, "isCrossed": false,
        "arrivalTime": "2025-09-18T03:30:00Z", "departureTime": "2025-09-18T03:40:00Z"
      },
      {
        "name": "Manali (Private Bus Stand)", "lat": 32.2396, "lng": 77.1887, "isCrossed": false,
        "arrivalTime": "2025-09-18T05:30:00Z", "departureTime": null
      }
    ]
  },
  {
    "busId": 20,
    "operator": "Travel Hub",
    "phoneNumber": "+91 1860 30010207",
    "headsign": "A/C Seater (2+2)",
    "frequency": 127,
    "currentLocation": { "lat": 30.7046, "lng": 76.7179 },
    "startTime": "2025-09-17T12:20:00Z",
    "eta": "1h 25m",
    "route": [
      {
        "name": "Mohali Bus Stand", "lat": 30.7046, "lng": 76.7179, "isCrossed": false,
        "arrivalTime": null, "departureTime": "2025-09-17T12:20:00Z"
      },
      {
        "name": "Banur", "lat": 30.5599, "lng": 76.7107, "isCrossed": false,
        "arrivalTime": "2025-09-17T12:50:00Z", "departureTime": "2025-09-17T12:52:00Z"
      },
      {
        "name": "Rajpura", "lat": 30.4811, "lng": 76.5950, "isCrossed": false,
        "arrivalTime": "2025-09-17T13:15:00Z", "departureTime": "2025-09-17T13:20:00Z"
      },
      {
        "name": "Patiala Bus Stand", "lat": 30.3398, "lng": 76.3869, "isCrossed": false,
        "arrivalTime": "2025-09-17T13:45:00Z", "departureTime": null
      }
    ]
  }
];

// Initialize Firebase Admin SDK
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

  // Process each bus object to be Firestore-compatible
  busesData.forEach(bus => {
    // Create a deep copy to avoid modifying the original object in memory
    const processedBus = JSON.parse(JSON.stringify(bus));

    // 1. Convert main startTime string to Firestore Timestamp
    processedBus.startTime = admin.firestore.Timestamp.fromDate(new Date(bus.startTime));

    // 2. Convert main currentLocation to Firestore GeoPoint
    if (processedBus.currentLocation && processedBus.currentLocation.lat !== undefined) {
      processedBus.currentLocation = new admin.firestore.GeoPoint(
        processedBus.currentLocation.lat,
        processedBus.currentLocation.lng
      );
    }
    
    // 3. Process the route array
    if (Array.isArray(processedBus.route)) {
      processedBus.route.forEach(stop => {
        // Convert lat/lng to a GeoPoint and add it as a 'location' field
        if (stop.lat !== undefined && stop.lng !== undefined) {
          stop.location = new admin.firestore.GeoPoint(stop.lat, stop.lng);
          // Clean up original lat/lng fields
          delete stop.lat;
          delete stop.lng;
        }

        // Convert arrivalTime string to Firestore Timestamp (handles null)
        stop.arrivalTime = stop.arrivalTime 
          ? admin.firestore.Timestamp.fromDate(new Date(stop.arrivalTime)) 
          : null;
        
        // Convert departureTime string to Firestore Timestamp (handles null)
        stop.departureTime = stop.departureTime 
          ? admin.firestore.Timestamp.fromDate(new Date(stop.departureTime)) 
          : null;
      });
    }
    
    // Add the fully processed bus object to the batch
    const docRef = collectionRef.doc(); // Auto-generate document ID
    batch.set(docRef, processedBus);
  });

  // Commit the batch to Firestore
  try {
    await batch.commit();
    console.log(`✅ Successfully imported all ${busesData.length} bus documents into Firestore!`);
  } catch (error) {
    console.error('❌ Error while importing data:', error);
  }
}

// Run the function
importDirectData();