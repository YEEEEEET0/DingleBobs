import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Slides from './components/homepage/slides';
import Navbar from './components/homepage/navbar';
import PlacesCards from './components/homepage/placesCards';
import NavBlob from './components/homepage/navBlob';
import RestaurantDetail from './components/homepage/restaurantDetail';

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

const Dashboard = () => {
  return (
    <div className='dashbody'>
      <NavBlob />
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="restaurants/:name" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
