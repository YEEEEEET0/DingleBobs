import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Card, Col } from 'react-bootstrap';
import axios from 'axios';

const RestaurantCard = ({ restaurant }) => {
  const { name, imageurl, rating } = restaurant;

  return (
    <Col sm={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={imageurl} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Rating: {rating}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

// App
const PlacesCards = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/food/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    }

    fetchRestaurants();
  }, []);


  return (
    <Container>
      <Row>
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </Row>
    </Container>
  );
};

export default PlacesCards;
