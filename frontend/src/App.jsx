import React from 'react';
import Slides from './components/homepage/slides';
import Navbar from './components/homepage/navbar';
import PlacesCards from './components/homepage/placesCards';

const App = () => {
  return (
    <div data>
      <Navbar />
      <Slides />
      <div>
        <PlacesCards />
      </div>
    </div>
  );
}

export default App;
