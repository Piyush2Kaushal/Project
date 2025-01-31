// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/Zomato");

const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
