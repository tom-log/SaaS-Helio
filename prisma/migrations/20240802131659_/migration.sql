/*
  Warnings:

  - You are about to alter the column `valor` on the `estoques` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `codigo` on the `estoques` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `estoques` MODIFY `valor` DECIMAL(10, 2) NOT NULL,
    MODIFY `codigo` INTEGER NOT NULL;
