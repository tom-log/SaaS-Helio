/*
  Warnings:

  - You are about to drop the column `usuariosId` on the `prevendas` table. All the data in the column will be lost.
  - Added the required column `vendedorId` to the `PreVendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `prevendas` DROP FOREIGN KEY `PreVendas_usuariosId_fkey`;

-- AlterTable
ALTER TABLE `prevendas` DROP COLUMN `usuariosId`,
    ADD COLUMN `vendedorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PreVendas` ADD CONSTRAINT `PreVendas_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
