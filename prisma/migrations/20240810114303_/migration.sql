-- AlterTable
ALTER TABLE `usuarios` MODIFY `funcao` ENUM('ADMINISTRADOR', 'GERENTE', 'FUNCIONARIO', 'FINANCEIRO') NOT NULL DEFAULT 'FUNCIONARIO';
