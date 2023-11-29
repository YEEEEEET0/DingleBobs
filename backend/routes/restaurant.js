const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/Restaurant');
const {AccountController} = require('../controllers/Login');
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

router.get('/restaurants/name/:restaurantName', async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    const result = await restaurantController.getRestaurantByName(restaurantName);
    if (!result) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/restaurant/:restaurantName/dishes', async (req, res) => {
  try {
    const { restaurantName } = req.params;
    const restaurant = await restaurantController.getRestaurantByName(restaurantName);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { name, dishes } = restaurant;

    return res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/restaurants/orders', async (req, res) => {
  try {
    const isSane = await AccountController.sanityCheck(req.headers.authorization, req.ip);
    if (!isSane) return res.status(403).json({ message: 'Accesss denied' });

    const allOrders = await restaurantController.getAllOrders(); //getAllOrders

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    const ordersByRestaurant = {};

    allOrders.forEach(order => {
      if (!ordersByRestaurant[order.restaurantName]) {
        ordersByRestaurant[order.restaurantName] = [];
      }
      const { restaurantName, restaurantId, ...orderDetails } = order;
      ordersByRestaurant[order.restaurantName].push(orderDetails);
    });



    return res.status(200).json(ordersByRestaurant);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Close the connection when the application is terminated
process.on('SIGINT', async () => {
  await restaurantController.close();
  process.exit(0);
});

module.exports = router;