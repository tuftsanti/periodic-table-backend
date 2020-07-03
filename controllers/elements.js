const {Schema, model} = require('mongoose')

const elementSchema = new Schema({
  restaurant: {
    cuisines: String,
    name: String,
    thumb: String,
    url: String,
    location: {
      address: String,
      locality: String,
      city: String,
      zipcode: Number,
    }
  },
  username: String
})

const Restaurant = model('restaurant2', restaurantSchema)

module.exports = Restaurant