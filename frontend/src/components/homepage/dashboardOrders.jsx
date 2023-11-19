import React, { useEffect, useState } from 'react';
import NavBlob from './navBlob';
import { Dropdown, Modal, Button, Carousel } from 'react-bootstrap';


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

                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Body>
                        {/* Carousel to navigate through dishes */}
                        <Carousel activeIndex={selectedDishIndex} onSelect={handleSelectDish}>
                            {selectedRestaurant &&
                                selectedRestaurant.dishes.map((dish, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={dish.imageurl}
                                            alt={dish.Name}
                                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                                        />
                                        <Carousel.Caption>
                                            <h3>{dish.Name}</h3>
                                            {/* Add other dish details */}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                        </Carousel>

                        {/* Add your form or input fields for modifying or adding items */}
                        {/* Use modifiedItem state to pre-fill form fields for modification */}
                        <form>
                            {/* Your form or input fields go here */}
                        </form>
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