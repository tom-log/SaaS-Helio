/*
  Warnings:

  - Added the required column `dataEntrega` to the `PreVendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prevendas` ADD COLUMN `dataEntrega` VARCHAR(191) NOT NULL;
