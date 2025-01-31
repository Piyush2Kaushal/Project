const Mealtype = require("../Models/mealtype");
exports.getAllMealtype = (req, res) => {
  Mealtype.find()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Mealtype fetched",
        mealtypes: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in Database",
        error: error,
      });
    });
};
