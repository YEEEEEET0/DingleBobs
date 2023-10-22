import React from 'react';
import Slides from './components/homepage/slides';
import Navbar from './components/homepage/navbar';
import PlacesCards from './components/homepage/placesCards';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBlob from './components/homepage/navBlob';

const Home = () => {
  return (
    <div data>
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
    <div data className='dashbody'>
      <NavBlob />

    </div>
  );
}



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
