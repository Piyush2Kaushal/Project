const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
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
    country_name: {
      type: String,
      required: true,
    },
  },
  { collection: "location" }
);

module.exports = mongoose.model("location", LocationSchema);
