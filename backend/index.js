const express = require('express');
const foodRoutes = require('./routes/restaurant');
const loginRoutes = require('./routes/login');
const cartRoutes = require('./routes/cart');
const cookieParser = require('cookie-parser');
const {TokenManager} = require('./controllers/Login');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

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
  console.log(req)
  res.sendFile(`index.html`, { root: './compiled_frontend/' });
})

app.get("/dashboard", async (req, res) => {
  req.cookies?.token
    ? (await TokenManager.getTokenDocument(req.cookies?.token)).admin
      ? res.sendFile(`index.html`, { root: './compiled_frontend/' })
      : res.sendStatus(403)
    : res.sendStatus(403)
});

