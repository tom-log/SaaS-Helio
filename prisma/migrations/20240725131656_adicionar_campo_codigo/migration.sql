/*
  Warnings:

  - Added the required column `codigo` to the `Estoques` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estoques` ADD COLUMN `codigo` BIGINT NOT NULL;
