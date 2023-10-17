import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Card, Col } from 'react-bootstrap';
import RestaurantController from '../../controllers/Restaurant';

const RestaurantCard = ({ restaurant }) => {
  const { name, image, rating } = restaurant;

  return (
    <Col sm={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={image} alt={name} />
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
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

// App
const PlacesCards = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const restaurantController = new RestaurantController(connection);

    async function fetchRestaurants() {
      await restaurantController.init();
      const allRestaurants = await restaurantController.getAllRestaurants();
      setRestaurants(allRestaurants);
      await restaurantController.close();
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
