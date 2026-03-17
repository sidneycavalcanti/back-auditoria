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
  apis: ['./src/docs/swaggerRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function inferExampleByType(type) {
  if (type === 'integer' || type === 'number') return 1;
  if (type === 'boolean') return true;
  return 'exemplo';
}

function ensureSwaggerExamples(spec) {
  if (!spec?.paths) return spec;

  for (const pathItem of Object.values(spec.paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    for (const operation of Object.values(pathItem)) {
      if (!operation || typeof operation !== 'object') continue;

      if (Array.isArray(operation.parameters)) {
        for (const param of operation.parameters) {
          if (!param || typeof param !== 'object') continue;
          if (param.example !== undefined) continue;

          const type = param.schema?.type;
          param.example = inferExampleByType(type);
        }
      }

      const reqJson = operation.requestBody?.content?.['application/json'];
      if (reqJson && reqJson.example === undefined) {
        reqJson.example = {
          exemplo: 'valor',
        };
      }

      if (!operation.responses || typeof operation.responses !== 'object') continue;

      for (const response of Object.values(operation.responses)) {
        if (!response || typeof response !== 'object') continue;

        response.content = response.content || {};
        const jsonContent =
          response.content['application/json'] ||
          (response.content['application/json'] = {});

        if (jsonContent.example === undefined) {
          jsonContent.example = {
            mensagem: 'Operacao realizada com sucesso',
          };
        }
      }
    }
  }

  return spec;
}

ensureSwaggerExamples(swaggerSpec);

export function setupSwagger(app) {
  app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { swaggerSpec };
