import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Slides from './components/homepage/slides';
import Navbar from './components/homepage/navbar';
import PlacesCards from './components/homepage/placesCards';
import RestaurantDetail from './components/homepage/restaurantDetail';
import DashboardHome from './components/homepage/dashboardHome';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slides />
      <div className='placecards-container'>
        <PlacesCards />
      </div>
    </div>
  );
}



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="restaurants/:name" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
