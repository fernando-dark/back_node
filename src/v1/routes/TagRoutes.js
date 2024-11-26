const express = require('express');
const router = express.Router();

const tagController = require('../../controllers/TagController');

router
    .get('/consult', tagController.getAllTags)




module.exports = router;    