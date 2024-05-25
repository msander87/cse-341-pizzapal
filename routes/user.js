const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const {isAuthenticated} = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get(
    '/', 
    isAuthenticated, 
    userController.getAll,
    // #swagger.description = "Get all users"
);

router.get(
    '/:id', 
    isAuthenticated, 
    userController.
    getSingle,
    // #swagger.description = "Get a single user"
    // #swagger.parameters['id'] = { description: 'User OAuth ID'}
);

router.post(
    '/', 
    isAuthenticated, 
    validation.saveUser, 
    userController.createDocument
    // #swagger.description = "Create a new user"
);

router.put(
    '/:id', 
    isAuthenticated, 
    validation.saveUser, 
    userController.updateDocument
    // #swagger.description = "Update a user"
    // #swagger.parameters['id'] = { description: 'User OAuth ID'}
);

router.delete(
    '/:id', 
    isAuthenticated, 
    userController.deleteDocument
    // #swagger.description = "Delete a user"
    // #swagger.parameters['id'] = { description: 'User OAuth ID'}
);


module.exports = router;