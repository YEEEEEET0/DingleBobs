import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const RestaurantCard = ({ restaurant }) => {
  const { name, imageurl, rating } = restaurant;

  return (
    <Col >
      <Link to={`/restaurants/${name}`} className="card-link"> {/* Use Link component with 'to' instead of 'a' */}
        <Card className="custom-card">
          <Card.Img variant="top" src={imageurl} alt={name} className="card-image" />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <p className='places-stars'>
              Rating: {rating}
              <svg fill="#FFFF00" xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.830-4.730-3.659-3.516c-.329-.314-.158-.888.283-.950l4.898-.696 2.187-4.328c.197-.390.730-.390.927 0l2.187 4.328 4.898.696c.441.062.612.636.283.950l-3.659 3.516.830 4.730c.078.443-.360.790-.746.592L8 13.187l-3.389 2.256z" />
              </svg>
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
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
        const response = await fetch('http://localhost:3000/food/restaurants');
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
