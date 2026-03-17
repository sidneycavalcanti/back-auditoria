/**
 * @swagger
 * tags:
 *   - name: Auth
 *   - name: Usuarios
 *   - name: Categorias
 *   - name: Anotacao
 *   - name: Auditoria
 *   - name: AvOperacional
 *   - name: CadAvOperacional
 *   - name: CadQuestoes
 *   - name: CadSexo
 *   - name: FormaDePagamento
 *   - name: Loja
 *   - name: MotivoDePausa
 *   - name: MotivoPerdas
 *   - name: Questoes
 *   - name: Pausa
 *   - name: Perdas
 *   - name: Vendas
 *   - name: Fluxo
 *   - name: Relatorio
 * paths:
 *   /auth/signin:
 *     post:
 *       tags: [Auth]
 *       summary: Login de usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       responses:
 *         '200': { description: OK }
 *
 *   /usuarios:
 *     get: { tags: [Usuarios], summary: Lista usuarios, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post:
 *       tags: [Usuarios]
 *       summary: Cria usuario
 *       security: [{ bearerAuth: [] }]
 *       requestBody: { required: true, content: { application/json: { schema: { type: object } } } }
 *       responses: { '201': { description: Criado } }
 *   /usuarios/{id}:
 *     get: { tags: [Usuarios], summary: Busca usuario por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put:
 *       tags: [Usuarios]
 *       summary: Atualiza usuario
 *       security: [{ bearerAuth: [] }]
 *       parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *       requestBody: { required: true, content: { application/json: { schema: { type: object } } } }
 *       responses: { '200': { description: OK } }
 *     delete: { tags: [Usuarios], summary: Remove usuario, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /categorias:
 *     get: { tags: [Categorias], summary: Lista categorias, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Categorias], summary: Cria categoria, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /categorias/{id}:
 *     get: { tags: [Categorias], summary: Busca categoria por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Categorias], summary: Atualiza categoria, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Categorias], summary: Remove categoria, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /anotacao:
 *     get: { tags: [Anotacao], summary: Lista anotacoes, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Anotacao], summary: Cria anotacao, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /anotacao/{id}:
 *     get: { tags: [Anotacao], summary: Busca anotacao por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Anotacao], summary: Atualiza anotacao, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Anotacao], summary: Remove anotacao, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /auditoria:
 *     get: { tags: [Auditoria], summary: Lista auditorias, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Auditoria], summary: Cria auditoria, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /auditoria/minha:
 *     get: { tags: [Auditoria], summary: Lista auditorias do usuario autenticado, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /auditoria/{id}:
 *     get: { tags: [Auditoria], summary: Busca auditoria por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Auditoria], summary: Atualiza auditoria, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Auditoria], summary: Remove auditoria, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /avoperacional:
 *     get: { tags: [AvOperacional], summary: Lista avoperacional, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [AvOperacional], summary: Cria avoperacional, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /avoperacional/{id}:
 *     get: { tags: [AvOperacional], summary: Busca avoperacional por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [AvOperacional], summary: Atualiza avoperacional, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [AvOperacional], summary: Remove avoperacional, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /cadavoperacional:
 *     get: { tags: [CadAvOperacional], summary: Lista cadavoperacional, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [CadAvOperacional], summary: Cria cadavoperacional, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /cadavoperacional/{id}:
 *     get: { tags: [CadAvOperacional], summary: Busca cadavoperacional por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [CadAvOperacional], summary: Atualiza cadavoperacional, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [CadAvOperacional], summary: Remove cadavoperacional, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /cadquestoes:
 *     get: { tags: [CadQuestoes], summary: Lista cadquestoes, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [CadQuestoes], summary: Cria cadquestoes, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /cadquestoes/{id}:
 *     get: { tags: [CadQuestoes], summary: Busca cadquestoes por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [CadQuestoes], summary: Atualiza cadquestoes, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [CadQuestoes], summary: Remove cadquestoes, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /cadsexo:
 *     get: { tags: [CadSexo], summary: Lista cadsexo, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [CadSexo], summary: Cria cadsexo, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /cadsexo/{id}:
 *     get: { tags: [CadSexo], summary: Busca cadsexo por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [CadSexo], summary: Atualiza cadsexo, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [CadSexo], summary: Remove cadsexo, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /formadepagamento:
 *     get: { tags: [FormaDePagamento], summary: Lista forma de pagamento, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [FormaDePagamento], summary: Cria forma de pagamento, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /formadepagamento/{id}:
 *     get: { tags: [FormaDePagamento], summary: Busca forma de pagamento por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [FormaDePagamento], summary: Atualiza forma de pagamento, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [FormaDePagamento], summary: Remove forma de pagamento, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /loja:
 *     get: { tags: [Loja], summary: Lista lojas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Loja], summary: Cria loja, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /loja/{id}:
 *     get: { tags: [Loja], summary: Busca loja por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Loja], summary: Atualiza loja, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Loja], summary: Remove loja, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /motivodepausa:
 *     get: { tags: [MotivoDePausa], summary: Lista motivos de pausa, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [MotivoDePausa], summary: Cria motivo de pausa, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /motivodepausa/{id}:
 *     get: { tags: [MotivoDePausa], summary: Busca motivo de pausa por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [MotivoDePausa], summary: Atualiza motivo de pausa, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [MotivoDePausa], summary: Remove motivo de pausa, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /motivoperdas:
 *     get: { tags: [MotivoPerdas], summary: Lista motivos de perdas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [MotivoPerdas], summary: Cria motivo de perdas, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /motivoperdas/{id}:
 *     get: { tags: [MotivoPerdas], summary: Busca motivo de perdas por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [MotivoPerdas], summary: Atualiza motivo de perdas, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [MotivoPerdas], summary: Remove motivo de perdas, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /questoes:
 *     get: { tags: [Questoes], summary: Lista questoes, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Questoes], summary: Cria questao, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /questoes/{id}:
 *     get: { tags: [Questoes], summary: Busca questao por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Questoes], summary: Atualiza questao, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Questoes], summary: Remove questao, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /pausa:
 *     get: { tags: [Pausa], summary: Lista pausas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Pausa], summary: Cria pausa, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /pausa/{id}:
 *     get: { tags: [Pausa], summary: Busca pausa por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Pausa], summary: Atualiza pausa, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Pausa], summary: Remove pausa, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *   /pausa/ativas/{auditoriaId}:
 *     get:
 *       tags: [Pausa]
 *       summary: Lista pausas ativas por auditoria
 *       security: [{ bearerAuth: [] }]
 *       parameters: [{ in: path, name: auditoriaId, required: true, schema: { type: integer } }]
 *       responses: { '200': { description: OK } }
 *
 *   /perdas:
 *     get: { tags: [Perdas], summary: Lista perdas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Perdas], summary: Cria perda, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /perdas/{id}:
 *     get: { tags: [Perdas], summary: Busca perda por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Perdas], summary: Atualiza perda, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Perdas], summary: Remove perda, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /vendas/reports/resumo-mensal:
 *     get: { tags: [Vendas], summary: Relatorio resumo mensal de vendas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /vendas/reports/resumo-diario:
 *     get: { tags: [Vendas], summary: Relatorio resumo diario de vendas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /vendas/reports/por-hora:
 *     get: { tags: [Vendas], summary: Relatorio comparativo por hora de vendas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /vendas:
 *     get: { tags: [Vendas], summary: Lista vendas, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Vendas], summary: Cria venda, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /vendas/{id}:
 *     get: { tags: [Vendas], summary: Busca venda por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Vendas], summary: Atualiza venda, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Vendas], summary: Remove venda, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /fluxo:
 *     get: { tags: [Fluxo], summary: Lista fluxo, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *     post: { tags: [Fluxo], summary: Cria fluxo, security: [{ bearerAuth: [] }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '201': { description: Criado } } }
 *   /fluxo/{id}:
 *     get: { tags: [Fluxo], summary: Busca fluxo por id, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *     put: { tags: [Fluxo], summary: Atualiza fluxo, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], requestBody: { required: true, content: { application/json: { schema: { type: object } } } }, responses: { '200': { description: OK } } }
 *     delete: { tags: [Fluxo], summary: Remove fluxo, security: [{ bearerAuth: [] }], parameters: [{ in: path, name: id, required: true, schema: { type: integer } }], responses: { '200': { description: OK } } }
 *
 *   /relatorio/mensal:
 *     get: { tags: [Relatorio], summary: Relatorio mensal, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /relatorio/vendas-perdidas-detalhado:
 *     get: { tags: [Relatorio], summary: Relatorio de vendas perdidas detalhado, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /relatorio/questionario-avaliacao:
 *     get: { tags: [Relatorio], summary: Relatorio do questionario de avaliacao, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 *   /relatorio/dashboard:
 *     get: { tags: [Relatorio], summary: Relatorio dashboard, security: [{ bearerAuth: [] }], responses: { '200': { description: OK } } }
 */
export {};

