CREATE TABLE `usuario` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `password` VARCHAR(255),
  `categoriaId` INTEGER,
  `situacao` BOOLEAN,
  `username` VARCHAR(255),
  `name` VARCHAR(255),
  `updatedAt` TIMESTAMP,
  `createdAt` TIMESTAMP
);

CREATE TABLE `categoria` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `vendas` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `auditoriaId` INTEGER,
  `formadepagamentoId` INTEGER,
  `lojaId` INTEGER,
  `sexoId` INTEGER,
  `faixaetaria` INTEGER,
  `usuarioId` INTEGER,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `cadsexo` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255),
  `situacao` BOOLEAN,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `formadepagamento` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255),
  `situacao` BOOLEAN,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `motivodepausa` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255),
  `situacao` BOOLEAN,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `pausa` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `motivodepausaId` INTEGER,
  `usuarioId` INTEGER,
  `auditoriaId` INTEGER,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `anotacoes` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `auditoriaId` INTEGER,
  `usuarioId` INTEGER,
  `lojaId` INTEGER,
  `descricao` VARCHAR(255),
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `motivoperdas` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `situacao` BOOLEAN,
  `obs` TEXT,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `perdas` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `motivoperdasId` INTEGER,
  `auditoriaId` INTEGER,
  `usuarioId` INTEGER,
  `lojaId` INTEGER,
  `obs` TEXT,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `loja` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `obs` TEXT,
  `situacao` BOOLEAN,
  `tipo` BOOLEAN,
  `codigo` INTEGER,
  `luc` VARCHAR(255),
  `piso` VARCHAR(255),
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `auditoria` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `lojaId` INTEGER,
  `usuarioId` INTEGER,
  `criadorId` INTEGER,
  `data` DATETIME,
  `fluxoespeculador` INTEGER,
  `fluxoacompanhante` INTEGER,
  `fluxooutros` INTEGER,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `avoperacional` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `cadavoperacionalId` INTEGER,
  `usuarioId` INTEGER,
  `auditoriaId` INTEGER,
  `lojaId` INTEGER,
  `resposta` VARCHAR(255),
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `cadavoperacional` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `descricao` VARCHAR(255),
  `situacao` BOOLEAN,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `questoes` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `cadquestoesId` INTEGER,
  `usuarioId` INTEGER,
  `auditoriaId` INTEGER,
  `lojaId` INTEGER,
  `resposta` VARCHAR(255),
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

CREATE TABLE `cadquestoes` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `situacao` BOOLEAN,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP
);

-- Definição das chaves estrangeiras

ALTER TABLE `usuario` ADD CONSTRAINT fk_categoria FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`);

ALTER TABLE `vendas` ADD CONSTRAINT fk_formadepagamento FOREIGN KEY (`formadepagamentoId`) REFERENCES `formadepagamento`(`id`);
ALTER TABLE `vendas` ADD CONSTRAINT fk_loja FOREIGN KEY (`lojaId`) REFERENCES `loja`(`id`);
ALTER TABLE `vendas` ADD CONSTRAINT fk_sexo FOREIGN KEY (`sexoId`) REFERENCES `cadsexo`(`id`);
ALTER TABLE `vendas` ADD CONSTRAINT fk_usuario FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);

ALTER TABLE `pausa` ADD CONSTRAINT fk_motivodepausa FOREIGN KEY (`motivodepausaId`) REFERENCES `motivodepausa`(`id`);
ALTER TABLE `pausa` ADD CONSTRAINT fk_usuario_pausa FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);
ALTER TABLE `pausa` ADD CONSTRAINT fk_auditoria_pausa FOREIGN KEY (`auditoriaId`) REFERENCES `auditoria`(`id`);

ALTER TABLE `anotacoes` ADD CONSTRAINT fk_usuario_anotacoes FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);
ALTER TABLE `anotacoes` ADD CONSTRAINT fk_loja_anotacoes FOREIGN KEY (`lojaId`) REFERENCES `loja`(`id`);
ALTER TABLE `anotacoes` ADD CONSTRAINT fk_auditoria_anotacoes FOREIGN KEY (`auditoriaId`) REFERENCES `auditoria`(`id`);

ALTER TABLE `perdas` ADD CONSTRAINT fk_motivoperdas FOREIGN KEY (`motivoperdas_id`) REFERENCES `motivoperdas`(`id`);
ALTER TABLE `perdas` ADD CONSTRAINT fk_usuario_perdas FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);
ALTER TABLE `perdas` ADD CONSTRAINT fk_loja_perdas FOREIGN KEY (`lojaId`) REFERENCES `loja`(`id`);
ALTER TABLE `perdas` ADD CONSTRAINT fk_auditoria_perdas FOREIGN KEY (`auditoriaId`) REFERENCES `auditoria`(`id`);

ALTER TABLE `auditoria` ADD CONSTRAINT fk_loja_auditoria FOREIGN KEY (`lojaId`) REFERENCES `loja`(`id`);
ALTER TABLE `auditoria` ADD CONSTRAINT fk_usuario_auditoria FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);
ALTER TABLE `auditoria` ADD CONSTRAINT fk_criador_auditoria FOREIGN KEY (`criadorId`) REFERENCES `usuario`(`id`);

ALTER TABLE `avoperacional` ADD CONSTRAINT fk_cadavoperacional FOREIGN KEY (`cadavoperacional_id`) REFERENCES `cadavoperacional`(`id`);
ALTER TABLE `avoperacional` ADD CONSTRAINT fk_usuario_avoperacional FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);
ALTER TABLE `avoperacional` ADD CONSTRAINT fk_loja_avoperacional FOREIGN KEY (`lojaId`) REFERENCES `loja`(`id`);
ALTER TABLE `avoperacional` ADD CONSTRAINT fk_auditoria_avoperacional FOREIGN KEY (`auditoriaId`) REFERENCES `auditoria`(`id`);

ALTER TABLE `questoes` ADD CONSTRAINT fk_cadquestoes FOREIGN KEY (`cadquestoesId`) REFERENCES `cadquestoes`(`id`);
ALTER TABLE `questoes` ADD CONSTRAINT fk_usuario_questoes FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`);
ALTER TABLE `questoes` ADD CONSTRAINT fk_loja_questoes FOREIGN KEY (`lojaId`) REFERENCES `loja`(`id`);
ALTER TABLE `questoes` ADD CONSTRAINT fk_auditoria_questoes FOREIGN KEY (`auditoriaId`) REFERENCES `auditoria`(`id`);