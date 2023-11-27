import React, { useEffect, useState } from 'react';
import NavBlob from './navBlob';
import { Dropdown, Modal, Button, Carousel, Form } from 'react-bootstrap';

const EditModal = ({ show, handleClose, editedDish, handleSave }) => {
    const [editedValues, setEditedValues] = useState({ ...editedDish });
    const [imagePreview, setImagePreview] = useState(editedDish.imageurl || '');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageurl' && files && files[0]) {
            setEditedValues({
                ...editedValues,
                [name]: URL.createObjectURL(files[0]),
            });
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setEditedValues({
                ...editedValues,
                [name]: value,
            });
            if (name === 'imageurl') {
                setImagePreview(value);
            }
        }
    };

    const handleSaveChanges = () => {
        handleSave(editedValues);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Dish</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDishName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter dish name"
                            name="Name"
                            value={editedValues.Name || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDishDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter dish description"
                            name="Description"
                            value={editedValues.Description || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDishPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter dish price"
                            name="Price"
                            value={editedValues.Price || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDishSpice">
                        <Form.Label>Spice</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter dish spice level"
                            name="Spice"
                            value={editedValues.Spice || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDishImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Paste image URL or upload"
                            name="imageurl"
                            value={editedValues.imageurl || ''}
                            onChange={handleChange}
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img src={imagePreview} alt="Preview" className="img-thumbnail" />
                            </div>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const DashboardOrders = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modifiedItem, setModifiedItem] = useState({});
    const [selectedDishIndex, setSelectedDishIndex] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleSelectDish = (selectedIndex) => {
        setSelectedDishIndex(selectedIndex);
    };

    const handleDropdownChange = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModifiedItem({});
    };

    const handleEditClick = (dish) => {
        setShowEditModal(true);
        setModifiedItem(dish);
    };

    return (
        <div className='dashbody'>
            <NavBlob loc='listNav' />

            <div className='centered-container'>
                <div className='centered-content'>
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

                    {selectedRestaurant && selectedRestaurant.dishes && selectedRestaurant.dishes.length > 0 ? (
                        <Carousel className='carousel-content' activeIndex={selectedDishIndex} onSelect={handleSelectDish}>
                            {selectedRestaurant.dishes.map((dish, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={dish.imageurl}
                                        alt={dish.Name}
                                    />
                                    <Carousel.Caption>
                                        <h3>{dish.Name}</h3>
                                        <p>Description: {dish.Description}</p>
                                        <p>Price: {dish.Price}</p>
                                        <Button variant="outline-secondary" onClick={() => handleEditClick(dish)}>
                                            <i className="bi bi-pencil"></i> Edit
                                        </Button>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <p>No dishes available</p>
                    )}


                    <EditModal show={showEditModal} handleClose={handleModalClose} editedDish={modifiedItem}></EditModal>
                </div>
            </div>
        </div>
    );
}

export default DashboardOrders;