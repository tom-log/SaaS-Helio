/*
  Warnings:

  - A unique constraint covering the columns `[preVendaId]` on the table `PreVendas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PreVendas_preVendaId_key` ON `PreVendas`(`preVendaId`);
