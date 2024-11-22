const express = require('express');
const db = require('./src/database/db');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

// Routes
const AppRoutes = require('./src/v1/routes/AppRoutes.js');
const Tags = require('./src/v1/routes/TagRoutes.js');
const MethodAccess = require('./src/v1/routes/MethodAccessRoutes.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

const port = 3000 || 8080;
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/// APIS V1
app.use('/app', AppRoutes);
app.use('/tag', Tags);
app.use('/access-method', MethodAccess);

app.get('/', async (req, res) => {
  console.log('hOLA')
  return 'Hola';
});

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});