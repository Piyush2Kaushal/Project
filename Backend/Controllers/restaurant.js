const Restaurant = require("../Models/restaurant");
exports.getAllRestaurants = (req, res) => {
  Restaurant.find()
    .then((result) => {
      console.log(result);

      res.status(200).json({
        message: "restaurants fetched",
        restaurants: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in Database",
        error: error,
      });
    });
};

exports.getAllRestaurantsByLocation = (req, res) => {
  const cityName = req.params.city;
  // Restaurant.find({ city: new RegExp('^' + cityName + '$', 'i' )})
  // Restaurant.find({ city: new RegExp(cityName, 'i' )})
  Restaurant.find({ city: cityName })
    .then((result) => {
      res.status(200).json({
        message: `Restaurant fetched for city ${cityName}`,
        restaurants: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in Database",
        error: error,
      });
    });
};

exports.restaurantFilter = (req, res) => {
  let { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;
  console.log(mealtype);

  // Default values for sorting and pagination
  sort = sort ? sort : 1;
  page = page ? page : 1;

  const ItemsPerPage = 2;

  let startIndex = ItemsPerPage * (page - 1);
  let endIndex = ItemsPerPage * page;

  let filterObj = {};

  // Apply filters based on user input
  if (mealtype) filterObj["mealtype_id"] = mealtype;
  if (location) filterObj["location_id"] = location;

  if (cuisine && cuisine.length > 0) {
    filterObj["cuisine.id"] = { $in: cuisine };
  }

  if (lcost && hcost) {
    filterObj["min_price"] = { $lte: hcost, $gte: lcost };
  }

  // Fetch filtered restaurants from the database
  Restaurant.find(filterObj)
    .sort({ min_price: sort })
    .then((result) => {
      console.log(result);

      // Pagination Logic
      const paginatedResponse = result.slice(startIndex, endIndex);

      // Calculate total number of pages
      const totalItems = result.length;
      const totalPages = Math.ceil(totalItems / ItemsPerPage);

      // Generate page array
      let arr = [];
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i);
      }

      // Return paginated response and page information
      res.status(200).json({
        message: "restaurants fetched successfully",
        restaurants: paginatedResponse,
        pageCount: arr, // Array of page numbers
        currentPage: page, // Current page number
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error filtering in Database",
        error: error,
      });
    });
};

exports.getRestaurantDetailsById = (req, res) => {
  const restId = req.params.restId;

  Restaurant.findById(restId)
    .then((response) => {
      if (response) {
        res.status(200).json({
          message: "Restaurant fetched successfully",
          restaurant: response, // Key is "restaurant"
        });
      } else {
        res.status(404).json({
          message: "Restaurant not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
