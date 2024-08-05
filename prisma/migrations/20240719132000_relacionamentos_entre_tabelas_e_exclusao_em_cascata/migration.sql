-- CreateTable
CREATE TABLE `Empresas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Empresas_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estoques` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `unidade` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `empresaId` INTEGER NOT NULL,

    INDEX `estoques_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `empresaId` INTEGER NOT NULL,
    `papel` ENUM('ADMINISTRADOR', 'GERENTE', 'EMPREGADO') NOT NULL DEFAULT 'EMPREGADO',

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    INDEX `usuarios_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `identidade` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `empresaId` INTEGER NOT NULL,

    UNIQUE INDEX `Clientes_cpf_key`(`cpf`),
    UNIQUE INDEX `Clientes_identidade_key`(`identidade`),
    UNIQUE INDEX `Clientes_email_key`(`email`),
    INDEX `clientes_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `unidade` INTEGER NOT NULL,
    `dataVenda` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vendedorId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `empresaId` INTEGER NOT NULL,

    INDEX `vendas_clienteId_fkey`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estoques` ADD CONSTRAINT `Estoques_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clientes` ADD CONSTRAINT `Clientes_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
