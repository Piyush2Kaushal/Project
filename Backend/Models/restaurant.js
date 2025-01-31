const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city_id: {
      type: Number,
      required: true,
    },
    location_id: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    min_Price: {
      type: Number,
      required: true,
    },
  },
  { collection: "restaurant" }
);

module.exports = mongoose.model("restaurant", RestaurantSchema);
