const express = require('express');
const { addApp, getAppWithDetails } = require('../../controllers/AppController');
const { validateAppFieldsApp, upload } = require('../../middlewares/validateAppFields');

const router = express.Router();

router
    .post('/create', upload.single('image'), validateAppFieldsApp, addApp)
    .get('/consult', getAppWithDetails)


module.exports = router;    