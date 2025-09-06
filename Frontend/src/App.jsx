import React,{ useState } from 'react';
import './App.css';
import HomePage from './assets/Homepage';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </>
  )
}

export default App;