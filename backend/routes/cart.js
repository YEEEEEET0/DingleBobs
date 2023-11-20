const express = require('express');
const CartController = require('../controllers/Cart');
const router = express.Router();

const cartController = new CartController("mongodb+srv://ambit:f1jepKOsQbpv6tBv@cluster0.uryu669.mongodb.net");
cartController.init();

// GET user cart by token
router.get('/user', async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const userCart = await cartController.getUserCartByToken(token);
    if (userCart.error) {
      return res.status(400).json({ error: userCart.error });
    }
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update user cart by token
router.put('/user', async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const updatedCart = req.body.cartData; // Assuming cartData is sent in the request body
    const result = await cartController.updateUserCartByToken(token, updatedCart);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add dish to user cart by token
router.post('/user/dish', async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const newDish = req.body.dish; // Assuming dish data is sent in the request body
    const userCart = await cartController.insertDishToCartByToken(token, newDish);
    if (userCart.error) {
      return res.status(400).json({ error: userCart.error });
    }
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE remove dish from user cart by token and dish ID
router.delete('/user/dish/:dishId', async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const { dishId } = req.params;
    const userCart = await cartController.removeDishFromCartByToken(token, dishId);
    if (userCart.error) {
      return res.status(400).json({ error: userCart.error });
    }
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;