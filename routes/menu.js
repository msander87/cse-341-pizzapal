const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');
const {isAuthenticated} = require('../middleware/authenticate');
const validation = require('../middleware/validate');


    
router.get(
    '/',
    menuController.getMenu
    // #swagger.description = "Get all menu items"
);

router.get(
    //#swagger.tags=['Menu']
    '/product',
    async (req, res) => {
        try {
            const products = await menuController.getAllProducts();
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(products);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },
    // #swagger.description = "Get all products"
);

router.get(
    '/product/:id',
    menuController.getSingleProduct,
    // #swagger.description = "Get a single product"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.get(
    //#swagger.tags=['Menu']
    '/topping',
    async (req, res) => {
        try {
            const toppings = await menuController.getAllToppings();
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(toppings);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },
    // #swagger.description = "Get all toppings"
);

router.get(
    '/topping/:id',
    menuController.getSingleTopping,
    // #swagger.description = "Get a single topping"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.get(
    //#swagger.tags=['Menu']
    '/size',
    async (req, res) => {
        try {
            const sizes = await menuController.getAllSizes();
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(sizes);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },
    // #swagger.description = "Get all sizes"
);

router.get(
    '/size/:id',
    menuController.getSingleSize,
    // #swagger.description = "Get a single size"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.get(
    //#swagger.tags=['Menu']
    '/crust',
    async (req, res) => {
        try {
            const crusts = await menuController.getAllCrusts();
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(crusts);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },
    // #swagger.description = "Get all crusts"
);

router.get(
    '/crust/:id',
    menuController.getSingleCrust,
    // #swagger.description = "Get a single crust"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.post(
    '/product',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.createProduct,
    // #swagger.description = "Create a product"
);

router.post(
    '/topping',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.createTopping,
    // #swagger.description = "Create a topping"
);

router.post(
    '/size',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.createSize,
    // #swagger.description = "Create a size"
);

router.post(
    '/crust',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.createCrust,
    // #swagger.description = "Create a crust"
);

router.put(
    '/product/:id',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.updateProduct,
    // #swagger.description = "Update a product"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.put(
    '/topping/:id',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.updateTopping,
    // #swagger.description = "Update a topping"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.put(
    '/size/:id',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.updateSize,
    // #swagger.description = "Update a size"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.put(
    '/crust/:id',
    isAuthenticated,
    validation.validateMenuItem,
    menuController.updateCrust,
    // #swagger.description = "Update a crust"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
    '/product/:id',
    isAuthenticated,
    menuController.deleteProduct,
    // #swagger.description = "Delete a product"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
    '/topping/:id',
    isAuthenticated,
    menuController.deleteTopping,
    // #swagger.description = "Delete a topping"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
    '/size/:id',
    isAuthenticated,
    menuController.deleteSize,
    // #swagger.description = "Delete a size"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
    '/crust/:id',
    isAuthenticated,
    menuController.deleteCrust,
    // #swagger.description = "Delete a crust"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

module.exports = router;