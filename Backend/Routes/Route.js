const express = require("express");
const router = express.Router();

const locationController = require("../Controllers/location");
const mealtypeController = require("../Controllers/mealtype");
const restaurantController = require("../Controllers/restaurant");
router.get("/restaurant", restaurantController.getAllRestaurants);
router.get("/locations", locationController.getAllLocation);
router.post("/filter", restaurantController.restaurantFilter);
router.get(
  "/restaurant/:restId",
  restaurantController.getRestaurantDetailsById
);
router.get("/mealtypes", mealtypeController.getAllMealtype);

const menuItemsController = require("../Controllers/menuItems");

router.get("/menuitems", menuItemsController.getMenuItemsByRestId);

module.exports = router;
