const mongoose = require("mongoose");

const MealtypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    meal_type: {
      type: Number,
      required: true,
    },
  },
  { collection: "mealtype" }
);

module.exports = mongoose.model("mealtype", MealtypeSchema);
