"use server";

import prisma from "../prisma";
import { verificaSessionEmpresa } from "../verificaSessionEmpresa";

async function inserirEstoque(produto, valor, unidade, codigo) {
	const session = verificaSessionEmpresa();
	if (!session) return null;
	try {
		const estoques = await prisma.estoques.create({
			data: {
				produto,
				valor,
				unidade,
				codigo, 
				empresaId: (await session).empresa,
			},
		});
		return estoques;
	} catch (error) {
		console.error("Erro ao criar Estoque:", error);
		throw error;
	}
}

async function buscarEstoque() {
	const session = verificaSessionEmpresa();
	if (!session) return null;
	try {
		const estoques = await prisma.estoques.findMany({
			where: {
				empresaId: (await session).empresa,
			},
		});
		return estoques;
	} catch (error) {
		console.error("Erro ao buscar Estoque:", error);
		throw error;
	}
}

async function excluirEstoque(id) {
	const session = verificaSessionEmpresa();
	if (!session) return null;
	try {
		const estoques = await prisma.estoques.delete({
			where: {
				id: id, // Corrigido para passar o id corretamente
				empresaId: (await session).empresa,
			},
		});
		return estoques;
	} catch (error) {
		console.error("Erro ao excluir item do estoque:", error);
		throw error;
	}
}
export { inserirEstoque, buscarEstoque, excluirEstoque };