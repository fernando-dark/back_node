const express = require('express');
const router = express.Router();

const businessController = require('../../controllers/BusinessController');

router
    .get('/consult', businessController.getAllBusiness)




module.exports = router;    