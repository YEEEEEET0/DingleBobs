const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '1h', // You can adjust the token expiration time
    });

    // Set the token as a cookie in the response
    res.cookie('token', token, {
        httpOnly: true, // Secure cookies
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // Token expiration time in milliseconds (1 hour in this case)
    });
  

    res.status(200).json({ message: 'Login successful', token:token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
