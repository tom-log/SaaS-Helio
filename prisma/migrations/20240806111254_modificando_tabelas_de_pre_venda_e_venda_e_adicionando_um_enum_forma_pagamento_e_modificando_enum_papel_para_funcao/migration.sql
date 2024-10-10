/*
  Warnings:

  - You are about to drop the column `papel` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `PreVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formaPagamento` to the `PreVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoId` to the `PreVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formaPagamento` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoId` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prevendas` ADD COLUMN `clienteId` INTEGER NOT NULL,
    ADD COLUMN `formaPagamento` ENUM('DINHEIRO', 'CREDITO', 'DEBITO', 'PIX', 'BOLETO') NOT NULL,
    ADD COLUMN `parcelasCredito` INTEGER NULL DEFAULT 1,
    ADD COLUMN `produtoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `papel`,
    ADD COLUMN `funcao` ENUM('ADMINISTRADOR', 'GERENTE', 'FUNCIONARIO') NOT NULL DEFAULT 'FUNCIONARIO';

-- AlterTable
ALTER TABLE `vendas` ADD COLUMN `codigo` BIGINT NOT NULL,
    ADD COLUMN `formaPagamento` ENUM('DINHEIRO', 'CREDITO', 'DEBITO', 'PIX', 'BOLETO') NOT NULL,
    ADD COLUMN `parcelasCredito` INTEGER NULL DEFAULT 1,
    ADD COLUMN `produtoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PreVendas` ADD CONSTRAINT `PreVendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
