# BusEasy: Real-Time Public Transport Tracking for Small Cities

BusEasy is a software project developed for the **Smart India Hackathon 2025** under the "Transportation & Logistics" theme[cite: 2, 6]. It directly addresses the problem statement **SIH25013 - Real-Time Public Transport Tracking for Small Cities**[cite: 4, 5].

Our mission is to provide a reliable, low-cost, and scalable solution that brings clarity and real-time information to local bus networks in tier-2 and tier-3 towns, making daily commutes stress-free and predictable.

## 🌟 Key Features

* **🚌 Real-Time Tracking:** See live bus locations on an interactive map to plan your journey and avoid long waits at the stop[cite: 12, 13].
* **🗺️ Journey Planner:** Enter your start and destination to get the most convenient direct and indirect bus routes for your trip[cite: 18, 19].
* **📅 Schedules:** Get one-tap access to clear and easy-to-read bus timings and routes for hassle-free planning[cite: 33, 34, 35].
* **🔔 Smart Alerts:** Receive timely updates on upcoming stops and arrival times for a smooth travel experience[cite: 14, 15].
* **🌐 Low-Bandwidth Reliability:** Our platform is optimized to work seamlessly even in areas with slow internet, ensuring accessibility for everyone[cite: 16, 17]. We achieve this through lazy loading of heavy components and using WebSockets for an efficient, real-time connection[cite: 64, 66].
* **🗣️ Regional Language Support:** The interface supports multiple local languages, ensuring that everyone, including non-English speakers, can use the system comfortably[cite: 20, 23, 68].

## 🌱 Impact and Benefits

BusEasy is designed to create a high social impact by improving the public transportation ecosystem[cite: 22].

* **Environmental:** Promotes the use of public transport, leading to lower carbon emissions, cleaner air, and more fuel-efficient fleet operations for a greener city[cite: 73, 82, 83, 84].
* **Economic:** Saves valuable time for daily commuters, reduces operational costs for fleet owners, and minimizes economic losses caused by traffic congestion[cite: 74, 75, 76, 81].
* **Social:** Enhances mobility and accessibility for all citizens, improves quality of life by reducing travel stress, and promotes digital inclusion in smaller towns[cite: 85, 86, 87, 88].

## 🛠️ Technology Stack

Our platform is built with modern, reliable, and scalable open-source technologies to keep costs low and ensure maintainability[cite: 24, 61].

* **Frontend:** React (for a dynamic and responsive UI)[cite: 39, 43].
* **Backend:** Node.js with a backend framework like Express[cite: 41, 46].
* **Database:**
    * **Firestore:** Used for loading static data like routes and schedules[cite: 48].
    * **Realtime Database:** Used for instantly updating and receiving live bus locations[cite: 45, 48].
* **Real-Time Communication:** WebSockets for a persistent, low-latency connection between the client and server[cite: 64].
* **Maps & Geolocation:** Utilizes mapping APIs for location services and visualization[cite: 44].

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/buseasy.git](https://github.com/your-username/buseasy.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd buseasy
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up your environment variables** by creating a `.env` file and adding the necessary keys (e.g., Firebase credentials, Maps API Key).
5.  **Run the application:**
    ```sh
    npm start
    ```

## 👥 Core Team (Team Lorem Ipsum)

* Aashwat Jain [cite: 103]
* Aniket Kedia [cite: 102]
* Bhavuk Mittal [cite: 105]
* Charul [cite: 101]
* Harman Singla [cite: 100]
* Pranav [cite: 104]

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
