require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const paymentRoutes = require("./Routes/paymentRoutes");

const zomatoUser = require("./Routes/Route");
//localhost:27017/
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/Zomato")
  .then((success) => console.log("MongoDB Connected...."))
  .catch((err) => console.log("Mongo Error" + err));

app.use(bodyParser.json());
app.use(express.json());
app.use("/", zomatoUser);
app.use("/api/payment", paymentRoutes);
app.listen(port, () => {
  console.log(`server is running:  ${port}....`);
});
