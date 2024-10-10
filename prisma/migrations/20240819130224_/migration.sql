/*
  Warnings:

  - You are about to alter the column `id` on the `prevendas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `preVendaId` to the `PreVendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PreVendas_id_key` ON `prevendas`;

-- AlterTable
ALTER TABLE `prevendas` ADD COLUMN `preVendaId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
