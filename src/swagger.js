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
  if (type === 'array') return [];
  if (type === 'object') return {};
  return 'exemplo';
}

function inferParamExample(param) {
  const name = (param?.name || '').toLowerCase();
  const type = param?.schema?.type;

  if (name.includes('id')) return 1;
  if (name.includes('data')) return '2026-03-17';
  if (name.includes('mes')) return 3;
  if (name.includes('ano')) return 2026;
  if (name.includes('email')) return 'usuario@empresa.com';

  return inferExampleByType(type);
}

function getMainResource(path) {
  const clean = String(path || '').replace(/^\/+/, '');
  const segments = clean.split('/').filter(Boolean);
  if (!segments.length) return 'default';

  if (segments[0] === 'auth' && segments[1] === 'signin') return 'auth-signin';
  if (segments[0] === 'vendas' && segments[1] === 'reports') return 'vendas-reports';
  if (segments[0] === 'relatorio') return 'relatorio';

  return segments[0];
}

function getEntityExampleByResource(resource) {
  const map = {
    usuarios: { id: 1, nome: 'Joao Silva', email: 'joao@empresa.com', categoria: 'auditor' },
    categorias: { id: 1, descricao: 'Operacional' },
    anotacao: { id: 1, auditoriaId: 10, texto: 'Ajustar procedimento no caixa' },
    auditoria: { id: 10, lojaId: 3, status: 'em_andamento' },
    avoperacional: { id: 1, descricao: 'Avaliacao operacional' },
    cadavoperacional: { id: 1, descricao: 'Cadastro av operacional' },
    cadquestoes: { id: 1, pergunta: 'O uniforme esta completo?' },
    cadsexo: { id: 1, descricao: 'Masculino' },
    formadepagamento: { id: 1, descricao: 'Cartao de credito' },
    loja: { id: 3, nome: 'Loja Centro', codigo: 'LJ003' },
    motivodepausa: { id: 1, descricao: 'Intervalo' },
    motivoperdas: { id: 1, descricao: 'Falta de estoque' },
    questoes: { id: 1, pergunta: 'Atendimento cordial?' },
    pausa: { id: 1, auditoriaId: 10, motivoDePausaId: 1, status: 'ativa' },
    perdas: { id: 1, auditoriaId: 10, motivoPerdaId: 1, valor: 129.9 },
    vendas: { id: 1, lojaId: 3, data: '2026-03-17', valor: 3490.75 },
    fluxo: { id: 1, lojaId: 3, data: '2026-03-17', totalClientes: 128 },
  };

  return map[resource] || { id: 1, descricao: 'Exemplo de retorno' };
}

function getRequestExample(path, method, resource) {
  const byResource = {
    'auth-signin': { email: 'admin@empresa.com', senha: '123456' },
    usuarios: { nome: 'Joao Silva', email: 'joao@empresa.com', senha: '123456', categoria: 'auditor' },
    categorias: { descricao: 'Operacional' },
    anotacao: { auditoriaId: 10, texto: 'Observacao registrada durante a auditoria' },
    auditoria: { lojaId: 3, status: 'em_andamento' },
    avoperacional: { descricao: 'Checklist de abertura' },
    cadavoperacional: { descricao: 'Novo item operacional' },
    cadquestoes: { pergunta: 'A vitrine foi organizada?' },
    cadsexo: { descricao: 'Feminino' },
    formadepagamento: { descricao: 'PIX' },
    loja: { nome: 'Loja Centro', codigo: 'LJ003' },
    motivodepausa: { descricao: 'Pausa tecnica' },
    motivoperdas: { descricao: 'Cliente desistiu da compra' },
    questoes: { pergunta: 'Os equipamentos estao funcionando?' },
    pausa: { auditoriaId: 10, motivoDePausaId: 1, status: 'ativa' },
    perdas: { auditoriaId: 10, motivoPerdaId: 1, valor: 89.5 },
    vendas: { lojaId: 3, data: '2026-03-17', valor: 3490.75 },
    fluxo: { lojaId: 3, data: '2026-03-17', totalClientes: 128 },
  };

  if (method === 'put' || method === 'patch') {
    const current = byResource[resource];
    if (current) return { ...current, atualizadoEm: '2026-03-17T10:00:00Z' };
  }

  return byResource[resource] || { exemplo: `Payload para ${path}` };
}

function isCollectionGet(path) {
  return !String(path).includes('{') && !String(path).includes('/reports/') && !String(path).startsWith('/relatorio/');
}

function getReportExample(path) {
  if (path.includes('/vendas/reports/resumo-mensal')) {
    return {
      periodo: '2026-03',
      totalVendas: 120,
      valorTotal: 154320.45,
    };
  }

  if (path.includes('/vendas/reports/resumo-diario')) {
    return {
      data: '2026-03-17',
      totalVendas: 14,
      valorTotal: 8420.3,
    };
  }

  if (path.includes('/vendas/reports/por-hora')) {
    return {
      data: '2026-03-17',
      horas: [{ hora: '10:00', valor: 850.4 }],
    };
  }

  if (path.includes('/relatorio/dashboard')) {
    return {
      periodo: '2026-03',
      indicadores: { vendas: 154320.45, perdas: 7240.9, auditorias: 38 },
    };
  }

  if (path.includes('/relatorio/mensal')) {
    return {
      mes: 3,
      ano: 2026,
      desempenho: { vendas: 154320.45, perdas: 7240.9 },
    };
  }

  if (path.includes('/relatorio/vendas-perdidas-detalhado')) {
    return {
      periodo: '2026-03',
      itens: [{ motivo: 'Falta de estoque', valor: 1490.5 }],
    };
  }

  if (path.includes('/relatorio/questionario-avaliacao')) {
    return {
      periodo: '2026-03',
      resultado: [{ questao: 'Atendimento cordial?', media: 4.5 }],
    };
  }

  return {
    mensagem: 'Relatorio gerado com sucesso',
  };
}

function getResponseExample(path, method, statusCode, resource) {
  const code = String(statusCode);

  if (code.startsWith('4')) {
    if (code === '401') return { erro: 'Nao autorizado', mensagem: 'Token invalido ou expirado' };
    if (code === '404') return { erro: 'Nao encontrado', mensagem: 'Registro nao localizado' };
    return { erro: 'Requisicao invalida', mensagem: 'Verifique os dados enviados' };
  }

  if (code.startsWith('5')) {
    return { erro: 'Erro interno', mensagem: 'Falha ao processar a requisicao' };
  }

  if (resource === 'vendas-reports' || resource === 'relatorio') {
    return getReportExample(path);
  }

  const entity = getEntityExampleByResource(resource);

  if (method === 'delete') {
    return { mensagem: 'Registro removido com sucesso' };
  }

  if (method === 'post' || code === '201') {
    return { mensagem: 'Registro criado com sucesso', data: entity };
  }

  if (method === 'put' || method === 'patch') {
    return { mensagem: 'Registro atualizado com sucesso', data: entity };
  }

  if (method === 'get' && isCollectionGet(path)) {
    return [entity];
  }

  return entity;
}

function ensureSwaggerExamples(spec) {
  if (!spec?.paths) return spec;

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    for (const [method, operation] of Object.entries(pathItem)) {
      if (!operation || typeof operation !== 'object') continue;
      const resource = getMainResource(path);

      if (Array.isArray(operation.parameters)) {
        for (const param of operation.parameters) {
          if (!param || typeof param !== 'object') continue;
          if (param.example !== undefined) continue;
          param.example = inferParamExample(param);
        }
      }

      const reqJson = operation.requestBody?.content?.['application/json'];
      if (reqJson && reqJson.example === undefined) {
        reqJson.example = getRequestExample(path, method, resource);
      }

      if (!operation.responses || typeof operation.responses !== 'object') continue;

      for (const [statusCode, response] of Object.entries(operation.responses)) {
        if (!response || typeof response !== 'object') continue;

        response.content = response.content || {};
        const jsonContent =
          response.content['application/json'] ||
          (response.content['application/json'] = {});

        if (jsonContent.example === undefined) {
          jsonContent.example = getResponseExample(path, method, statusCode, resource);
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
