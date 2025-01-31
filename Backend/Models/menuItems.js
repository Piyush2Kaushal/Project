const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId, // Assuming it's linked to the Restaurant model by ObjectId
      ref: "Restaurant",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "menuItems" }
);

module.exports = mongoose.model("menuItems", menuSchema);
