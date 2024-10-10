/*
  Warnings:

  - You are about to alter the column `valor` on the `prevendas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `valor` on the `vendas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `prevendas` MODIFY `valor` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `vendas` MODIFY `valor` DOUBLE NOT NULL;
