/*
  Warnings:

  - You are about to alter the column `codigo` on the `estoques` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `estoques` MODIFY `codigo` INTEGER NOT NULL;
