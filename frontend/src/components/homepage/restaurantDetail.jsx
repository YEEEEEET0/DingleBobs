// RestaurantDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RestaurantDetail = () => {
  // Use useParams to get the restaurant name from the URL
  const { name } = useParams();

  // Fetch the restaurant details based on the name and render the content
  // You can use the same API endpoint you used for listing restaurants.
  // For simplicity, I'm assuming you have an API that returns details based on the name.
  // You may need to adapt this part to your specific API structure.
  const [restaurant, setRestaurant] = React.useState(null);

  React.useEffect(() => {
    async function fetchRestaurantDetails() {
      try {
        const response = await fetch(`http://localhost:3000/food/restaurants/${name}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    }

    fetchRestaurantDetails();
  }, [name]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <img src={restaurant.imageurl} alt={restaurant.name} />
      <p>Rating: {restaurant.rating}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RestaurantDetail;
