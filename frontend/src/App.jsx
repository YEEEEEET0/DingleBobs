import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Slides from './components/homepage/slides';
import Navbar from './components/homepage/navbar';
import PlacesCards from './components/homepage/placesCards';
import NavBlob from './components/homepage/navBlob';
import RestaurantDetail from './components/homepage/restaurantDetail';
import Widget from './components/homepage/widget';

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
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await fetch('http://localhost:3000/food/restaurants/orders', {
          headers: {
            "Authorization": token
          }
        });

        if (response.status === 403) {
          setError('No access');
        } else {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);


  return (
    <div className='dashbody'>
      <NavBlob />
      <Widget id="orders-card">
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            Object.keys(orders).map((restaurantName, index) => (
              <div className='orders-list' key={index}>
                <span>{restaurantName}</span>
                <span>{orders[restaurantName].length}</span>
              </div>
            ))
          )}
        </div>
      </Widget>
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
