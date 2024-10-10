/*
  Warnings:

  - You are about to drop the column `valorDesconto` on the `prevendas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `prevendas` DROP COLUMN `valorDesconto`,
    ADD COLUMN `valorPago` DOUBLE NULL;
