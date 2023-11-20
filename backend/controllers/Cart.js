const { MongoClient } = require('mongodb');
const CartModel = require('../models/Cart');
const AccountController = require('./Login');

class CartController {
  constructor(conUrl) {
    this.cartModel = new CartModel(conUrl, "accounts");
  }

  async init() {
    await this.cartModel.connect();
  }

  async getUserCartByToken(token) {
    const username = (await AccountController.getTokenData(token)).username;
    console.log(username);
    return username ? this.cartModel.getUserCartByUsername(username) : { error: 'Invalid token' };
  }

  async updateUserCartByToken(token, cartData) {
    const username = await AccountController.getTokenData(token)?.username;
    return username ? this.cartModel.updateUserCart(username, cartData) : { error: 'Invalid token' };
  }

  async insertDishToCartByToken(token, dish) {
    const username = await AccountController.getTokenData(token)?.username;
    return username ? this.cartModel.insertDishToCart(username, dish) : { error: 'Invalid token' };
  }

  async removeDishFromCartByToken(token, dishId) {
    const username = await AccountController.getTokenData(token)?.username;
    return username ? this.cartModel.removeDishFromCart(username, dishId) : { error: 'Invalid token' };
  }

  async close() {
    await this.cartModel.disconnect();
  }
}

module.exports = CartController;