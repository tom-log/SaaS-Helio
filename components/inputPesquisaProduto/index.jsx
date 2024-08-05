"use client";
import { useState, useCallback } from "react";
import { obterPorCodigoOuNome } from "@/backend/db";

export default function InputEstoque({ onProdutosSelecionados }) {
	const [codigo, setCodigo] = useState("");
	const [sugestaoCodigo, setSugestaoCodigo] = useState([]);

	const buscarCodigo = useCallback(async (codigo) => {
		if (!codigo) return;
		try {
			const resposta = await obterPorCodigoOuNome(codigo);
			setSugestaoCodigo(resposta);
		} catch (err) {
			console.error("Erro ao buscar código:", err);
		}
	}, []);

	const handlerProdutoSelecionado = (produtoSelecionado) => {
		setCodigo("");
		setSugestaoCodigo([]);
		onProdutosSelecionados(produtoSelecionado);
	};

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='flex flex-col items-center gap-2 relative'>
				<label htmlFor='codigo'>Produto</label>
				<input
					id='codigo'
					type='text'
					className='border-2 rounded-xl px-2 py-1 w-[250px] border-black text-black'
					value={codigo}
					onChange={(e) => {
						setCodigo(e.target.value);
						if (e.target.value.trim() !== "") {
							buscarCodigo(e.target.value);
						} else {
							setSugestaoCodigo([]);
						}
					}}
				/>
				{sugestaoCodigo.length > 0 && (
					<div className='absolute top-full left-0 right-0 mt-1 border-2 border-gray-300 rounded-lg shadow-md mx-2 w-[400px] bg-white z-10'>
						<ul className='space-y-1 max-h-[300px] overflow-y-auto p-2'>
							{sugestaoCodigo.slice(0, 6).map((item) => (
								<li
									className='flex flex-col bg-gray-100 text-gray-800 hover:bg-blue-100 rounded-md p-3 transition duration-300 ease-in-out cursor-pointer'
									key={item.id}
									onClick={() => handlerProdutoSelecionado(item)}>
									<span className='font-semibold'>
										{item.produto.toUpperCase()}
									</span>
									<div className='flex justify-between mt-1 text-sm'>
										<span className='text-green-600'>
											{new Intl.NumberFormat("pt-BR", {
												style: "currency",
												currency: "BRL",
											}).format(item.valor)}
										</span>
										<span className='text-gray-600'>Código: {item.codigo}</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
