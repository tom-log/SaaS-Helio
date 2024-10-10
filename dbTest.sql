-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para mysaas
CREATE DATABASE IF NOT EXISTS `mysaas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mysaas`;

-- Copiando estrutura para tabela mysaas.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `empresaId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Clientes_cpf_key` (`cpf`),
  UNIQUE KEY `Clientes_identidade_key` (`identidade`),
  UNIQUE KEY `Clientes_email_key` (`email`),
  KEY `clientes_empresaId_fkey` (`empresaId`),
  CONSTRAINT `Clientes_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas.clientes: ~0 rows (aproximadamente)
INSERT IGNORE INTO `clientes` (`id`, `nome`, `endereco`, `cpf`, `identidade`, `cidade`, `estado`, `telefone`, `email`, `empresaId`) VALUES
	(1, 'lucas', 'rua ', '45612378995', 'mg524856', 'ipanema', 'mg', '332548545', 'lucas@gmail.com', 1);

-- Copiando estrutura para tabela mysaas.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cnpj` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `criadoEm` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Empresas_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas.empresas: ~0 rows (aproximadamente)
INSERT IGNORE INTO `empresas` (`id`, `nome`, `email`, `cnpj`, `cpf`, `cidade`, `endereco`, `criadoEm`) VALUES
	(1, 'bhimoveis', 'imoveis@gmail.com', '45465464654', '48221255', 'ipanema', 'rua prisncesa isabel', '2024-08-19 11:32:39.000'),
	(2, 'SISTEMADMIN', 'sistema@gmail.com', '66846212253', '486321889', 'ipanema', 'rua jardir silva', '2024-09-26 10:09:06.000');

-- Copiando estrutura para tabela mysaas.estoques
CREATE TABLE IF NOT EXISTS `estoques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` double NOT NULL,
  `unidade` int NOT NULL,
  `criadoEm` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `empresaId` int NOT NULL,
  `codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `estoques_empresaId_fkey` (`empresaId`),
  CONSTRAINT `Estoques_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas.estoques: ~3 rows (aproximadamente)
INSERT IGNORE INTO `estoques` (`id`, `produto`, `valor`, `unidade`, `criadoEm`, `empresaId`, `codigo`) VALUES
	(16, 'mesa', 3000, 20, '2024-08-19 18:06:20.737', 1, '37041494'),
	(17, 'celular', 800, 30, '2024-08-19 18:06:51.207', 1, '87600684'),
	(18, 'fritadeira', 900, 10, '2024-08-19 18:07:02.278', 1, '90991087');

-- Copiando estrutura para tabela mysaas.prevendas
CREATE TABLE IF NOT EXISTS `prevendas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` double NOT NULL,
  `unidade` int NOT NULL,
  `codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `empresaId` int NOT NULL,
  `vendedorId` int NOT NULL,
  `clienteId` int NOT NULL,
  `formaPagamento` enum('DINHEIRO','CREDITO','DEBITO','PIX','BOLETO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `parcelasCredito` int DEFAULT '1',
  `produtoId` int NOT NULL,
  `endereco` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `analise` enum('ANALISE','DEFERIDO','INDEFERIDO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ANALISE',
  `dataEntrega` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preVendaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observacaoAnalise` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valorPago` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `preVendas_empresaId_fkey` (`empresaId`),
  KEY `PreVendas_vendedorId_fkey` (`vendedorId`),
  KEY `PreVendas_clienteId_fkey` (`clienteId`),
  CONSTRAINT `PreVendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `PreVendas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PreVendas_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas.prevendas: ~0 rows (aproximadamente)
INSERT IGNORE INTO `prevendas` (`id`, `produto`, `valor`, `unidade`, `codigo`, `empresaId`, `vendedorId`, `clienteId`, `formaPagamento`, `parcelasCredito`, `produtoId`, `endereco`, `observacao`, `analise`, `dataEntrega`, `preVendaId`, `observacaoAnalise`, `valorPago`) VALUES
	(41, 'fritadeira', 900, 1, '90991087', 1, 1, 1, 'CREDITO', 1, 18, 'rua princesa isabel', 'Nenhuma Observação', 'ANALISE', '2024-10-11', '445093980', '', 1500);

-- Copiando estrutura para tabela mysaas.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `criadoEm` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `empresaId` int NOT NULL,
  `funcao` enum('ADMINISTRADOR','GERENTE','FUNCIONARIO','FINANCEIRO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FUNCIONARIO',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Usuarios_email_key` (`email`),
  KEY `usuarios_empresaId_fkey` (`empresaId`),
  CONSTRAINT `Usuarios_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas.usuarios: ~3 rows (aproximadamente)
INSERT IGNORE INTO `usuarios` (`id`, `nome`, `email`, `senha`, `criadoEm`, `empresaId`, `funcao`) VALUES
	(1, 'helio', 'helio@gmail.com', '123', '2024-08-19 11:33:09.000', 1, 'GERENTE'),
	(2, 'admin', 'admin@gmail.com', '4556', '2024-09-26 10:09:57.000', 2, 'ADMINISTRADOR'),
	(3, 'neto', 'neto@gmail.com', '333', '2024-09-26 16:06:01.000', 1, 'FUNCIONARIO');

-- Copiando estrutura para tabela mysaas.vendas
CREATE TABLE IF NOT EXISTS `vendas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` double NOT NULL,
  `unidade` int NOT NULL,
  `dataVenda` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `vendedorId` int NOT NULL,
  `clienteId` int NOT NULL,
  `empresaId` int NOT NULL,
  `codigo` bigint NOT NULL,
  `formaPagamento` enum('DINHEIRO','CREDITO','DEBITO','PIX','BOLETO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `parcelasCredito` int DEFAULT '1',
  `produtoId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendas_clienteId_fkey` (`clienteId`),
  KEY `Vendas_vendedorId_fkey` (`vendedorId`),
  KEY `Vendas_empresaId_fkey` (`empresaId`),
  CONSTRAINT `Vendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Vendas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Vendas_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas.vendas: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela mysaas._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela mysaas._prisma_migrations: ~0 rows (aproximadamente)
INSERT IGNORE INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('05bc674a-0c30-43fb-b656-60725378de69', '2af08b4f3cc0f7159b315c48b578bf5af8395785c94816ece71b5d7f02786640', '2024-08-19 14:25:00.189', '20240819130224_', NULL, NULL, '2024-08-19 14:25:00.034', 1),
	('080dbc6e-0435-431b-85ad-09a2c71246c7', '7bd13e5c3dd3fd1b85935aa7b3458a954a20d66a7237898f9e40b2c4d85405dd', '2024-08-19 14:24:58.782', '20240802131659_', NULL, NULL, '2024-08-19 14:24:58.694', 1),
	('08f5b78d-168c-45c1-8760-77e815897fc5', '3681595b98f867b3d6e8151bf185210744d1a2fd59e9fa949de7c75534ab4700', '2024-08-19 14:24:58.261', '20240725131656_adicionar_campo_codigo', NULL, NULL, '2024-08-19 14:24:58.236', 1),
	('141e5962-f28b-4395-8736-038bf31708e4', '4bc83bfa9855c083dce2ffc810c8d2a0c485137b00135a0797c7c904b0dd450f', '2024-08-19 14:24:58.528', '20240731143205_troquei_o_int_para_string_do_codigo', NULL, NULL, '2024-08-19 14:24:58.448', 1),
	('1901540b-5040-41b7-8940-dd550fec3f8f', '23ee1e8e88959900fd1bb6fd0356ee83c6d4fc4209232ecb07774477562ce4ba', '2024-08-19 14:24:59.683', '20240810112533_', NULL, NULL, '2024-08-19 14:24:59.610', 1),
	('36ebf0ca-f560-460b-a2e3-626d47d40124', 'a4a01dce1366a7b05fb5940171a4e4af4947e7aae6366e82587fc0c146542155', '2024-08-19 14:24:59.897', '20240819123848_id_agora_e_uma_string_em_prevenda', NULL, NULL, '2024-08-19 14:24:59.818', 1),
	('48c20b27-4097-4d6c-9765-76cdbc879f42', 'd3fbf3fd9f0a63c8cefe2cec422a732806a66645958e2b61ba1d21334f39578d', '2024-08-22 12:29:19.466', '20240822122904_2_campos_a_mais_em_pre_venda_valor_desconto_e_observacao_analise', NULL, NULL, '2024-08-22 12:29:19.440', 1),
	('534d357c-f785-47ac-bfd3-e24d0d036d06', '122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec', '2024-10-03 11:49:40.963', '20241003114843_', NULL, NULL, '2024-10-03 11:49:40.958', 1),
	('5bc338e1-8a43-4782-8d91-da627b43fdc0', 'c548bd68b70eba60457667228b7627f05cd99f8781263b6d1ea352f547760c7e', '2024-08-19 14:24:59.315', '20240806113930_removi_a_campo_de_data_da_venda_do_pre_venda', NULL, NULL, '2024-08-19 14:24:59.289', 1),
	('715a2c61-9318-49b0-8446-b58fa5f60225', '122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec', '2024-10-03 11:48:37.626', '20241003114709_', NULL, NULL, '2024-10-03 11:48:37.619', 1),
	('752d3584-e4df-49c6-ba71-9305a9285dea', '9d71cda2f1df7952754ce4fbfea5b8a2d254c0db2dee563d6eb7c86d5141b90a', '2024-08-19 14:24:58.941', '20240802134411_', NULL, NULL, '2024-08-19 14:24:58.856', 1),
	('75651200-a026-48c6-89a9-f1f1246db7f3', '24090b76be48866dcdc14f049726ce2dbf686bdf5f08c93fc3bc105ee5808cb2', '2024-10-03 11:47:03.488', '20241003114548_', NULL, NULL, '2024-10-03 11:47:03.458', 1),
	('79ad1ad0-2274-46aa-b1c1-a8097ef95df4', 'ee3c4799a55c4313e0e5abb2b8d225f4858cbc4674380567a52298d7be61bcb2', '2024-08-19 14:24:59.556', '20240806131220_troquei_os_valor_para_float', NULL, NULL, '2024-08-19 14:24:59.416', 1),
	('8373a219-f449-45c1-b43b-57ad03b40589', 'af13596db2dd02fc1e7fd75fe2b49ffdf683f0b09f6bc3014037481d81bb3dd6', '2024-08-19 14:25:23.430', '20240819142507_', NULL, NULL, '2024-08-19 14:25:23.408', 1),
	('84db6e53-4b69-4f61-9ecd-b471144e2e08', '4bc83bfa9855c083dce2ffc810c8d2a0c485137b00135a0797c7c904b0dd450f', '2024-08-19 14:24:58.692', '20240801195324_em_model_estoque_mudei_o_codigo_para_string', NULL, NULL, '2024-08-19 14:24:58.618', 1),
	('8801123c-f446-4868-ade6-a402cf46ed3e', '2c1aa63049d21be3b90378488a73c089182a207a4e262349d4d8874e23727291', '2024-08-19 14:24:58.446', '20240729114435_criei_uma_tabela_de_pre_venda_e_coloquei_relacionamentos_entre_tabelas_nela', NULL, NULL, '2024-08-19 14:24:58.263', 1),
	('891a2fa5-91f7-4731-b1bd-6d8e016eb538', '71227e7e6b565c31f11b74e4d47ab151223b5fd38f8a31a60686501cb5e62248', '2024-08-19 14:24:59.816', '20240814200528_criando_um_data_entrega_na_pre_venda', NULL, NULL, '2024-08-19 14:24:59.789', 1),
	('8c7a6ed6-a1fc-454b-a8f5-70f6a48e2c60', '888a654ade476e4344e5a36ef3922755dff95af349e48262afb6bbd64b817891', '2024-08-19 14:24:59.413', '20240806130436_em_pre_vendas_co_campo_codigo_coloquei_string', NULL, NULL, '2024-08-19 14:24:59.317', 1),
	('9bf9116a-2394-49c0-b822-6927aa99097d', 'a5315e492e9a00b1d810f90dc31688b2136062b1c34bf286b58d4e03bf05503e', '2024-08-19 14:24:59.116', '20240805174955_na_tabela_de_pre_venda_coloquei_vuncionario_que_vendeu_para_saber_quem_foi', NULL, NULL, '2024-08-19 14:24:58.943', 1),
	('a07a2188-ae50-4662-803f-d4e0328a8c0e', '4b2dd6c1442e82287939b421b238b1e96616b1a6507d7eaa3fe36eb7a1b4496b', '2024-08-19 14:24:59.608', '20240810110037_criei_campo_de_analise_da_pre_venda', NULL, NULL, '2024-08-19 14:24:59.583', 1),
	('a34656d7-b86b-477b-b766-6e3aad0b7307', 'cac1abac9d0e30967963be91e5b0f09d779bf599a682181d5315e9ee268353b6', '2024-08-19 14:24:58.233', '20240719132000_relacionamentos_entre_tabelas_e_exclusao_em_cascata', NULL, NULL, '2024-08-19 14:24:57.496', 1),
	('a6c31842-b4f5-4921-9c0c-5ff4f33e89d2', 'bba4fd981afae987ad087e8ab86c6bb3b80006d0e3af93996f3abc87943236a9', '2024-08-19 14:25:00.032', '20240819125618_', NULL, NULL, '2024-08-19 14:24:59.899', 1),
	('af11cee5-383a-457c-9981-93b8de9f8baf', '4bc83bfa9855c083dce2ffc810c8d2a0c485137b00135a0797c7c904b0dd450f', '2024-08-19 14:24:58.853', '20240802132339_', NULL, NULL, '2024-08-19 14:24:58.787', 1),
	('b0ea1847-57db-46fd-bb7b-3158b43a2cee', '462fb90d06c08769e5fcc13f29ebcc969c8e02953a3967788927fa1f146427a7', '2024-08-19 14:24:58.615', '20240731144938_', NULL, NULL, '2024-08-19 14:24:58.533', 1),
	('ba6f4065-b67a-472d-9e41-75fc90edd3ad', '7da929cccdb4e32488ce4e2e64891a39e079ef3a4df5ad50ea66164531d8da9e', '2024-08-19 14:24:59.580', '20240810104538_na_tabela_pre_venda_criei_endereco_e_observacao', NULL, NULL, '2024-08-19 14:24:59.558', 1),
	('c9e1e2d6-6213-4e8a-985f-02860b36e701', '0af364bce0efc8ca148fdc9a81568c65102e7d7540f128a94f7166e6054fdfcd', '2024-08-19 14:24:59.787', '20240810114303_', NULL, NULL, '2024-08-19 14:24:59.760', 1),
	('d0d14adf-c3cc-4fc2-ac69-4153ec6acc1d', 'cb734272d06b95dcbf01bcd3cd67be55b865d7e95d467c709fffa078c4d3cf74', '2024-08-19 14:25:00.215', '20240819142253_', NULL, NULL, '2024-08-19 14:25:00.191', 1),
	('da4cd0df-1ac9-4a2d-9cf0-e9abc60b73dd', 'c5a3d9c0f42eebe33d343a80218107ace5d433d1a275d87c1ff027ddf557f733', '2024-08-19 14:24:59.758', '20240810113911_', NULL, NULL, '2024-08-19 14:24:59.685', 1),
	('f92803cf-c4cc-4f87-9ca2-0acf7d5c8a02', '122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec', '2024-10-03 11:50:44.024', '20241003114957_em_pre_venda_colocamos_um_valorpago', NULL, NULL, '2024-10-03 11:50:44.010', 1),
	('ff68f952-4f26-43b8-bbf7-b8ee945fd29d', '7768de55c5d8f0283cc4d0594d73188605c5d1804cf9a3935c9a9e73c7f72041', '2024-08-19 14:24:59.287', '20240806111254_modificando_tabelas_de_pre_venda_e_venda_e_adicionando_um_enum_forma_pagamento_e_modificando_enum_papel_para_funcao', NULL, NULL, '2024-08-19 14:24:59.118', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
