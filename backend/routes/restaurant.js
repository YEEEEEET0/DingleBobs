const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/Restaurant');
const restaurantController = new RestaurantController('mongodb+srv://ambit:f1jepKOsQbpv6tBv@cluster0.uryu669.mongodb.net');

// Initialize the controller
restaurantController.init();

// Route to add a restaurant
router.post('/restaurants', async (req, res) => {
  try {
    const result = await restaurantController.addRestaurant(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to remove a restaurant
router.delete('/restaurants/:restaurantId', async (req, res) => {
  try {
    const result = await restaurantController.removeRestaurant(req.params.restaurantId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update a restaurant
router.put('/restaurants/:restaurantId', async (req, res) => {
  try {
    const result = await restaurantController.updateRestaurant(req.params.restaurantId, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const result = await restaurantController.getAllRestaurants();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Close the connection when the application is terminated
process.on('SIGINT', async () => {
  await restaurantController.close();
  process.exit(0);
});

module.exports = router;