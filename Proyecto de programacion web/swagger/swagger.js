const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de E-commerce con JWT',
    version: '1.0.0',
    description: 'Documentación de la API',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Comentar con @swagger
};

module.exports = swaggerJSDoc(options);
