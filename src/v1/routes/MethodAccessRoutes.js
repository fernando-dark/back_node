const express = require('express');
const router = express.Router();

const MethodAccessController = require('../../controllers/MethodAccessController');

router
    .get('/consult', MethodAccessController.getAllMethodAccess)




module.exports = router; 