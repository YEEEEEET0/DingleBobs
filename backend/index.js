const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/restaurant');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// MongoDB Atlas connection URL
const mongoURI =
  'mongodb+srv://ambit:f1jepKOsQbpv6tBv@cluster0.uryu669.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Routes
  app.use('/auth', authRoutes);
  app.use('/food', foodRoutes);
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
