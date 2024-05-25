const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');
const {isAuthenticated} = require('../middleware/authenticate');
const validation = require('../middleware/validate');


    
router.get(
    '/', 
    isAuthenticated, 
    orderController.getAll
);

router.get(
    '/:id', 
    isAuthenticated, 
    orderController.getSingle
);

router.post(
    '/:id', 
    isAuthenticated, 
    validation.saveOrder, 
    orderController.createDocument
);

router.put(
    '/:id', 
    isAuthenticated, 
    validation.saveOrder, 
    orderController.updateDocument);

router.delete(
    '/:id', 
    isAuthenticated, 
    orderController.deleteDocument
);


module.exports = router;