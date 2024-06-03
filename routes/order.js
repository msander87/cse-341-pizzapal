const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');
const {
    isAuthenticated
} = require('../middleware/authenticate');
const validation = require('../middleware/validate');



router.get(
    '/',
    isAuthenticated,
    orderController.getAll
    // #swagger.description = "Get all orders"
);

router.get(
    '/:id',
    isAuthenticated,
    orderController.getSingle
    // #swagger.description = "Get a single order"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.post(
    '/:id',
    isAuthenticated,
    validation.saveOrder,
    orderController.createDocument
    // #swagger.description = "Create a new order"
    // #swagger.parameters['id'] = { description: 'Customer ID' }
);

router.put(
    '/:id',
    isAuthenticated,
    validation.saveOrder,
    orderController.updateDocument
    // #swagger.description = "Update an order"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);

router.delete(
    '/:id',
    isAuthenticated,
    orderController.deleteDocument
    // #swagger.description = "Delete an order"
    // #swagger.parameters['id'] = { description: 'Object ID' }
);


module.exports = router;