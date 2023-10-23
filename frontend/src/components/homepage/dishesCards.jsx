import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const DishCard = ({ dish }) => {
  const { Name, Description, Price, Spice, imageurl } = dish;

  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="custom-card">
        <Card.Img variant="top" src={imageurl} alt={Name} className="card-image" />
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
          <Card.Text>
            Description: {Description}<br />
            Price: {Price}<br />
            Spice: {Spice}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Price: PropTypes.string.isRequired,
    Spice: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
  }).isRequired,
};

const DishesCards = ({  }) => {
  const { name } = useParams();
  const [dishes, setDishes] = useState([]);


  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await fetch(`http://localhost:3000/food/restaurant/${name}/dishes`);
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }

    fetchDishes();
  }, [name]);

  return (
    <Container>
      <div className='container-styling'>
      <Row>
        {dishes.map((dish, index) => (
          <DishCard key={index} dish={dish} />
        ))}
      </Row>
      </div>
    </Container>
  );
};

export default DishesCards;
