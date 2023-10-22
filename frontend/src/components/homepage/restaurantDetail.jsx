// RestaurantDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import RestaurantAbout from './restaurantAbout'


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
        const response = await fetch(`http://localhost:3000/food/restaurants/name/${name}`);
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
    <div className='all-info'>
        <div className='thumbnail'>
            <h2>{restaurant.name}</h2>

            <img src={restaurant.imageurl} alt={restaurant.name}/>

            <p>Rating: {restaurant.rating} <svg fill="#FFFF00" xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.830-4.730-3.659-3.516c-.329-.314-.158-.888.283-.950l4.898-.696 2.187-4.328c.197-.390.730-.390.927 0l2.187 4.328 4.898.696c.441.062.612.636.283.950l-3.659 3.516.830 4.730c.078.443-.360.790-.746.592L8 13.187l-3.389 2.256z" />
                </svg></p>
        </div>
      
      <RestaurantAbout/>

      <div className='bottom-test'>test</div>
      
    </div>
  );
};

export default RestaurantDetail;
