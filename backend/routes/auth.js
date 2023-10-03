const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to handle user login
router.post('/login', authController.loginUser);

module.exports = router;
