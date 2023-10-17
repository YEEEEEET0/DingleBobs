const { MongoClient, ObjectId } = require('mongodb');

class RestaurantModel {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = url;
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

  async addRestaurant(restaurant) {
    try {
      const result = await this.db.collection('restaurants').insertOne(restaurant);
      return result.insertedId;
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  }

  async removeRestaurant(restaurantId) {
    try {
      const result = await this.db.collection('restaurants').deleteOne({ _id: ObjectId(restaurantId) });
      return result.deletedCount;
    } catch (error) {
      console.error('Error removing restaurant:', error);
    }
  }

  async updateRestaurant(restaurantId, updates) {
    try {
      const result = await this.db.collection('restaurants').updateOne(
        { _id: ObjectId(restaurantId) },
        { $set: updates }
      );
      return result.modifiedCount;
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  }

  async getAllRestaurants() {
    try {
      const restaurants = await this.db.collection('restaurants').find().toArray();
      return restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }
}

module.exports = RestaurantModel;