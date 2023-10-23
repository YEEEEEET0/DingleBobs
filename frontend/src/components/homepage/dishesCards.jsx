import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const DishCard = ({ dish, addToCart }) => {
  const { Name, Description, Price, Spice, imageurl } = dish;

  return (
    <Col className="dish-container">
      <Card className="custom-card">
        <Card.Img variant="top" src={imageurl} alt={Name} className="card-image" />
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
          <Card.Text>
            Description: {Description}<br />
            Price: {Price}<br />
            Spice: {Spice}
            <p className='cart'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-cart clickable"
                viewBox="0 0 16 16"
                onClick={() => addToCart(Name)}
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </p>
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
  addToCart: PropTypes.func.isRequired,
};

const DishesCards = () => {
  const { name } = useParams();
  const [dishes, setDishes] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const clearConfirmationMessage = () => {
    setConfirmationMessage('');
  };

  const addToCart = (dishName) => {
    setConfirmationMessage(`${dishName} added to cart`);
    
    // Clear the confirmation message after 5 seconds
    setTimeout(clearConfirmationMessage, 5000);
  };

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
    <div className='food-container'>
      <Row>
        {dishes.map((dish, index) => (
          <DishCard key={index} dish={dish} addToCart={addToCart} />
        ))}
      </Row>
      {confirmationMessage && (
        <div className="confirmation-message">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default DishesCards;
