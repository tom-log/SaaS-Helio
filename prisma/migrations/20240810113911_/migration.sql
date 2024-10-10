/*
  Warnings:

  - The values [DEFIRIDO] on the enum `PreVendas_analise` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `prevendas` MODIFY `analise` ENUM('ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'ANALISE';
