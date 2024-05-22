const express = require('express');
const router = express.Router();

const clubscontroller = require('../controllers/clubs');
const {isAuthenticated} = require('../middleware/authenticate');
const validation = require('../middleware/validate');


    
router.get('/', clubscontroller.getAll);

router.get('/:id', clubscontroller.getSingle);

router.post('/', isAuthenticated, validation.saveClub, clubscontroller.createDocument);

router.put('/:id', isAuthenticated, validation.saveClub, clubscontroller.updateDocument);

router.delete('/:id', isAuthenticated, clubscontroller.deleteDocument);



module.exports = router;