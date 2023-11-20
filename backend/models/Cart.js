const { MongoClient, ObjectId } = require('mongodb');

class CartModel {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }

  async createCartIfNotExists(username) {
    try {
      const user = await this.db.collection('login').findOne({ username });

      if (!user || !user.cart) {
        const newCart = {
          items: [],
          // Add more fields as needed
        };

        await this.db.collection('login').updateOne(
          { username },
          { $set: { cart: newCart } },
          { upsert: true }
        );
      }
    } catch (error) {
      return 'Error creating cart';
    }
  }

  async getUserCartByUsername(username) {
    try {
      // Create cart if it doesn't exist for the provided username
      await this.createCartIfNotExists(username);

      const user = await this.db.collection('login').findOne({ username });
      return user ? user.cart : null;
    } catch (error) {
      return 'Error fetching user cart';
    }
  }

  async updateUserCart(username, cartData) {
    try {
      // Create cart if it doesn't exist for the provided username
      await this.createCartIfNotExists(username);

      const result = await this.db.collection('login').updateOne(
        { username },
        { $set: { cart: cartData } }
      );
      return result.modifiedCount;
    } catch (error) {
      return 'Error updating user cart';
    }
  }

  async insertDishToCart(username, dish) {
    try {
      const userCart = await this.getUserCartByUsername(username);

      if (!userCart) {
        return 'Cart not found for user';
      }

      userCart.push(dish);

      await this.updateUserCart(username, userCart);

      return userCart;
    } catch (error) {
      return 'Error inserting dish to cart';
    }
  }

  async removeDishFromCart(username, dishId) {
    try {
      const userCart = await this.getUserCartByUsername(username);

      if (!userCart) {
        return 'Cart not found for user';
      }

      const index = userCart.findIndex(item => item._id === dishId);

      if (index !== -1) {
        userCart.splice(index, 1);

        // Update the cart in the database
        await this.updateUserCart(username, userCart);
      }

      return userCart;
    } catch (error) {
      return 'Error removing dish from cart';
    }
  }
}

module.exports = CartModel;