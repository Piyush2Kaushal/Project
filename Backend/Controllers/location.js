const Location = require("../Models/location");
exports.getAllLocation = (req, res) => {
  Location.find()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "location fetched successfully",
        locations: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in Database",
        error: error,
      });
    });
};
