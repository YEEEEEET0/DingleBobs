const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/restaurant');
const loginRoutes = require('./routes/login');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/assets', express.static('./compiled_frontend/assets'))

// Routes
app.use('/auth', loginRoutes);
app.use('/food', foodRoutes);
app.use('/cart', cartRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(`index.html`, {root: './compiled_frontend/'});
})

app.get("/dashboard", (req, res) => {
  res.sendFile(`index.html`, {root: './compiled_frontend/'});
})

