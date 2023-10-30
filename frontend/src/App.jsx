import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Slides from './components/homepage/slides';
import Navbar from './components/homepage/navbar';
import PlacesCards from './components/homepage/placesCards';
import NavBlob from './components/homepage/navBlob';
import RestaurantDetail from './components/homepage/restaurantDetail';
import Widget from './components/homepage/widget';
import { Card } from 'react-bootstrap';
import { DynamicContentOrders } from './components/homepage/dynamicContent';

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
  const order_dropdownRef = useRef(null);


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
      <Widget titlename="Orders" id="orders-card">
        <div ref={order_dropdownRef} className='card-dropdown' id="orders-card-dropdown">
          <Card style={{ width: '18rem', userSelect: "none" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: "#121212" }}>
              <div>
                Specific Orders
              </div>
            </div>
            <Card.Body>
             <DynamicContentOrders parentRef={order_dropdownRef}></DynamicContentOrders>
            </Card.Body>
          </Card>
        </div>
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
      </Widget>

      <Widget titlename="payments" id="payments-card">

        <div className='card-dropdown' id="payments-card-dropdown">
          <Card style={{ width: '18rem', userSelect: "none" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
              <div>
                Specific Payments
              </div>
            </div>
            <Card.Body>
             
            </Card.Body>
          </Card>
        </div>
      
        <div className='orders-list'>
          <span>Order #1111</span>
          <span>500 Eur.</span>
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
