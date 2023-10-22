const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/restaurant');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', //frontend
  optionsSuccessStatus: 200, // might choke on 204 so default 200
};

app.use(cors(corsOptions));

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
