const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/documentation/swagger.js');

require('dotenv').config();

// Routes
const AppRoutes = require('./src/v1/routes/AppRoutes.js');

/// Catalogos
const Tags = require('./src/v1/routes/TagRoutes.js');
const MethodAccess = require('./src/v1/routes/MethodAccessRoutes.js');
const Business = require('./src/v1/routes/BussinesRoute.js');
const ANomina = require('./src/v1/routes/ANominaRoute.js');
const Society = require('./src/v1/routes/SocietyRoute.js');
const PersonalArea = require('./src/v1/routes/PersonalAreaRoute.js');
const PersonalGorup = require('./src/v1/routes/PersonaGroupRoutes.js');
const Subdivision = require('./src/v1/routes/SubdivisionRoutes.js');
const SalaryLevel = require('./src/v1/routes/SalaryLevelRoutes.js');
const PhysicalLocation = require('./src/v1/routes/PhysicalLocationRoute.js');

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
app.use('/business', Business);
app.use('/anomina', ANomina);
app.use('/society', Society);
app.use('/personal-area', PersonalArea);
app.use('/personal-group', PersonalGorup);
app.use('/subdivision', Subdivision);
app.use('/salary-level', SalaryLevel);
app.use('/physical-location', PhysicalLocation);

app.get('/', async (req, res) => {
  console.log('hOLA')
  return res.status(201).json({
    status: 'Success',
    message: 'Aplicación creada exitosamente',
    data: [],
  }); 
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});