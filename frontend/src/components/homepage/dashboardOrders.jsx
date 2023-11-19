import React, { useEffect, useState } from 'react';
import NavBlob from './navBlob';
import { Dropdown, Modal, Button } from 'react-bootstrap';

const DashboardOrders = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modifiedItem, setModifiedItem] = useState({});

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

    const handleDropdownChange = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const handleModifyItem = (item) => {
        setModifiedItem(item);
        setShowModal(true);
    };

    const handleAddNewItem = () => {
        // Implement logic to add a new item
        setShowModal(true);
    };

    const handleModalSave = () => {
        // Implement logic to save the modified or new item
        const updatedDishes = selectedRestaurant.dishes.map((dish) => {
            if (dish === modifiedItem) {
                // Modify existing item
                return {
                    ...dish,
                    Name: itemName,
                    Description: itemDescription,
                    Price: itemPrice,
                    Spice: itemSpice,
                };
            }
            return dish;
        });

        // Update the state with the modified dishes
        const updatedRestaurants = restaurants.map((restaurant) => {
            if (restaurant === selectedRestaurant) {
                return {
                    ...restaurant,
                    dishes: updatedDishes,
                };
            }
            return restaurant;
        });

        setRestaurants(updatedRestaurants);
        handleModalClose();
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModifiedItem({});
    };

    return (
        <div className='dashbody'>
            <NavBlob loc='listNav' />

            <div className='w-20 d-flex justify-content-end'>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedRestaurant ? selectedRestaurant.name : 'Select a Restaurant'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {restaurants.map((restaurant) => (
                            <Dropdown.Item key={restaurant._id} onClick={() => handleDropdownChange(restaurant)}>
                                {restaurant.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {selectedRestaurant && (
                    <div>
                        <h2>{selectedRestaurant.name}</h2>
                        <img
                            src={selectedRestaurant.imageurl}
                            alt={selectedRestaurant.name}
                            className="img-fluid" // Bootstrap's responsive image class
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <p>Rating: {selectedRestaurant.rating}</p>

                        <h3>Menu:</h3>
                        <ul>
                            {selectedRestaurant.dishes.map((dish, index) => (
                                <li key={index}>
                                    <h4>{dish.Name}</h4>
                                    <p>Description: {dish.Description}</p>
                                    <p>Price: {dish.Price}</p>
                                    <p>Spice: {dish.Spice}</p>
                                    <img
                                        src={dish.imageurl}
                                        alt={dish.Name}
                                        className="img-fluid" // Bootstrap's responsive image class
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <Button onClick={() => handleModifyItem(dish)}>Modify</Button>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={handleAddNewItem}>Add New Item</Button>
                    </div>
                )}

                {/* Modal for modifying or adding items */}
                <Modal show={showModal} onHide={handleModalClose}>
                    {/* Add your form or input fields for modifying or adding items */}
                    {/* Use modifiedItem state to pre-fill form fields for modification */}
                    <Modal.Body>
                        {/* Your form or input fields go here */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleModalSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default DashboardOrders;