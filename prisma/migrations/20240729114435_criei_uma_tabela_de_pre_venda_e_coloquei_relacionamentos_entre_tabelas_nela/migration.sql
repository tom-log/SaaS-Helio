-- CreateTable
CREATE TABLE `PreVendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `unidade` INTEGER NOT NULL,
    `codigo` BIGINT NOT NULL,
    `dataVenda` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `empresaId` INTEGER NOT NULL,
    `usuariosId` INTEGER NULL,

    INDEX `preVendas_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PreVendas` ADD CONSTRAINT `PreVendas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreVendas` ADD CONSTRAINT `PreVendas_usuariosId_fkey` FOREIGN KEY (`usuariosId`) REFERENCES `Usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
