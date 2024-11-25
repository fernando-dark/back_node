const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for Liverpool',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development Server',
        },
      ],
    },
    apis: ['./src/**/*.js'],
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  module.exports = swaggerSpec;