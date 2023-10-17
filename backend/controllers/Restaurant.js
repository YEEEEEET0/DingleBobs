const RestaurantModel = require('../models/Restaurant');

class RestaurantController {
  constructor(conIrl) {
    this.restaurantModel = new RestaurantModel(conIrl, "foodorder");
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

  async close() {
    await this.restaurantModel.disconnect();
  }
}

module.exports = RestaurantController;




