// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Route,Routes } from 'react-router-dom';
import TrackBus from './components/Trackbus';

function App() {
  return (
    // The "font-sans" class is crucial here!
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <div className="container mx-auto px-4">
        <Navbar />
        <Routes>
          <Route path='/' element={<Hero />}/>
          <Route path='/tracker' element={<TrackBus />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;