import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Back Auditoria API',
      version: '1.0.0',
      description: 'Documentação Swagger das rotas da API de auditoria',
    },
  servers: [
  {
    url: process.env.NODE_ENV === 'production'
      ? 'https://back-auditoria.onrender.com'
      : 'http://localhost:3000',
  },
],
components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Procura anotações JSDoc dentro dos arquivos de rota
  apis: ['./src/routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
