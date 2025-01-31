const MenuItems = require("../Models/menuItems");
exports.getMenuItemsByRestId = (req, res) => {
  MenuItems.find()
    .then((result) => {
      console.log(result);

      res.status(200).json({
        message: "MenuItem fetched",
        menuItems: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in Database",
        error: error,
      });
    });
};
