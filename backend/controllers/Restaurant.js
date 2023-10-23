const { MongoClient } = require('mongodb/lib');
const RestaurantModel = require('../models/Restaurant');

class RestaurantController {
  constructor(conIrl) {
    const mongo = new MongoClient(conIrl);
    this.restaurantModel = new RestaurantModel(mongo, "foodorder");
  }

  async init() {
    await this.restaurantModel.connect();
  }

  async addRestaurant(restaurantData) {
    return await this.restaurantModel.addRestaurant(restaurantData);
  }

  async removeRestaurant(restaurantId) {
    return await this.restaurantModel.removeRestaurant(restaurantId);
  }

  async updateRestaurant(restaurantId, updates) {
    return await this.restaurantModel.updateRestaurant(restaurantId, updates);
  }

  async getAllRestaurants() {
    return await this.restaurantModel.getAllRestaurants();
  }

  async getRestaurantByName(restaurantName) {
    return await this.restaurantModel.getRestaurantByName(restaurantName);
  }

  async getAllOrders() {
    return await this.restaurantModel.getAllOrders();
  }

  async close() {
    await this.restaurantModel.disconnect();
  }
}

module.exports = RestaurantController;




