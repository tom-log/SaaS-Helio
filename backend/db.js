"use server";
import prisma from "./prisma";
import { verificaSessionEmpresa } from "./verificaSessionEmpresa";

async function obterPorCodigoOuNome(codigo) {
	try {
		const empresa = await verificaSessionEmpresa();
		if (!empresa) return null;
		const estoque = await prisma.estoques.findMany({
			where: {
				empresaId: empresa.empresa,
				OR: [
					{
						codigo: {
							contains: codigo,
						},
					},
					{
						produto: {
							contains: codigo,
						},
					},
				],
			},
		});
		return estoque;
	} catch (erro) {
		console.error("Erro ao obter estoque:", erro);
		throw erro;
	}
}
async function obterPorCodigoOuCliente(cliente) {
	try {
		const empresa = await verificaSessionEmpresa();
		if (!empresa) return null;
		const clientes = await prisma.clientes.findMany({
			where: {
				empresaId: empresa.empresa,
				OR: [
					{
						nome: {
							contains: cliente,
						},
					},
					{
						cpf: {
							contains: cliente,
						},
					},
					{
						identidade: {
							contains: cliente,
						},
					},
				],
			},
		});
		return clientes;
	} catch (erro) {
		console.error("Erro ao obter cliente:", erro);
		throw erro;
	}
}
export { obterPorCodigoOuNome, obterPorCodigoOuCliente };
