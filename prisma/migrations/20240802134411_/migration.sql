/*
  Warnings:

  - You are about to alter the column `valor` on the `estoques` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `estoques` MODIFY `valor` DOUBLE NOT NULL;
