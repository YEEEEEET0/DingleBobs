import React from 'react';
import PropTypes from 'prop-types';
import ExampleCarouselImage from '../../assets/images/borgerMIAU.jpg';
import { Container, Row, Card, Col } from 'react-bootstrap';

// RestaurantModel
class RestaurantModel {
  constructor(name, image, rating) {
    this.name = name;
    this.image = image;
    this.rating = rating;
  }
}

// RestaurantCard
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
  const restaurantData = [
    {
      name: 'Burger king',
      image: ExampleCarouselImage,
      rating: 4.5,
    },
    {
      name: 'Mcdonalds',
      image: ExampleCarouselImage,
      rating: 3.8,
    },
    // Add more restaurant objects as needed
  ];

  const restaurants = restaurantData.map((data, index) => new RestaurantModel(data.name, data.image, data.rating));

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