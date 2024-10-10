/*
  Warnings:

  - The primary key for the `prevendas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `PreVendas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `prevendas` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `PreVendas_id_key` ON `PreVendas`(`id`);
