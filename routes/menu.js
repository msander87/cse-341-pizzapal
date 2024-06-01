const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu");
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require("../middleware/validate");

router.get(
  "/product",
  menuController.getAllProducts,
);

router.get(
  "/product/:id",
  menuController.getSingleProduct,
  // #swagger.description = "Get a single product"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.get(
  "/topping",
  menuController.getAllToppings,
);

router.get(
  "/topping/:id",
  menuController.getSingleTopping,
  // #swagger.description = "Get a single topping"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.get(
  "/size",
  menuController.getAllSizes,
);

router.get(
  "/size/:id",
  menuController.getSingleSize,
  // #swagger.description = "Get a single size"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.get(
  "/crust",
  menuController.getAllCrusts,
);

router.get(
  "/crust/:id",
  menuController.getSingleCrust,
  // #swagger.description = "Get a single crust"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.post(
  "/product",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.createProduct,
  // #swagger.description = "Create a product"
);

router.post(
  "/topping",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.createTopping,
  // #swagger.description = "Create a topping"
);

router.post(
  "/size",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.createSize,
  // #swagger.description = "Create a size"
);

router.post(
  "/crust",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.createCrust,
  // #swagger.description = "Create a crust"
);

router.put(
  "/product/:id",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.updateProduct,
  // #swagger.description = "Update a product"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.put(
  "/topping/:id",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.updateTopping,
  // #swagger.description = "Update a topping"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.put(
  "/size/:id",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.updateSize,
  // #swagger.description = "Update a size"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.put(
  "/crust/:id",
  isAuthenticated,
  validation.validateMenuItem,
  menuController.updateCrust,
  // #swagger.description = "Update a crust"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
  "/product/:id",
  isAuthenticated,
  menuController.deleteProduct,
  // #swagger.description = "Delete a product"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
  "/topping/:id",
  isAuthenticated,
  menuController.deleteTopping,
  // #swagger.description = "Delete a topping"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
  "/size/:id",
  isAuthenticated,
  menuController.deleteSize,
  // #swagger.description = "Delete a size"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
  "/crust/:id",
  isAuthenticated,
  menuController.deleteCrust,
  // #swagger.description = "Delete a crust"
  // #swagger.parameters['id'] = { description: 'Object ID' }
);

module.exports = router;
