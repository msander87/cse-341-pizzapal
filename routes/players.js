const express = require('express');
const router = express.Router();

const playerscontroller = require('../controllers/players');
const {isAuthenticated} = require('../middleware/authenticate');
const validation = require('../middleware/validate');


    
router.get('/', playerscontroller.getAll);

router.get('/:id', playerscontroller.getSingle);

router.post('/', isAuthenticated, validation.savePlayer, playerscontroller.createDocument);

router.put('/:id', isAuthenticated, validation.savePlayer, playerscontroller.updateDocument);

router.delete('/:id', isAuthenticated, playerscontroller.deleteDocument);



module.exports = router;