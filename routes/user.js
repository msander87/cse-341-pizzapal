const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const {isAuthenticated} = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get('/', isAuthenticated, userController.getAll);

router.get('/:id', isAuthenticated, userController.getSingle);

router.post('/', isAuthenticated, validation.saveUser, userController.createDocument);

router.put('/:id', isAuthenticated, validation.saveUser, userController.updateDocument);

router.delete('/:id', isAuthenticated, userController.deleteDocument);


module.exports = router;