"use client";
import { useState } from "react";
import { obterPorCodigoOuCliente } from "@/backend/db";

export default function InputPesquisaCliente({ onClienteSelect }) {
	const [cliente, setCliente] = useState("");
	const [sugestaoClientes, setSugestaoClientes] = useState([]);

	async function buscarClientes(client) {
		if (!cliente) return null;
		try {
			const resposta = await obterPorCodigoOuCliente(client);
			setSugestaoClientes(resposta);
		} catch (err) {
			throw new Error("Erro ao buscar clientes");
		}
	}

	const handleClienteSelect = (clienteSelecionado) => {
		setCliente("");
		setSugestaoClientes([]);
		onClienteSelect([clienteSelecionado]);
	};

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='flex flex-col items-center gap-2 relative'>
				<label htmlFor='pesquisa'>Cliente</label>
				<input
					id='pesquisa'
					type='text'
					className='border-2 rounded-xl px-2 py-1 w-[250px] border-black text-black'
					value={cliente}
					onChange={(e) => {
						setCliente(e.target.value);
						if (e.target.value.trim() !== "") {
							buscarClientes(e.target.value);
						} else {
							setSugestaoClientes([]);
						}
					}}
				/>
				{sugestaoClientes.length > 0 && (
					<div className='absolute top-full left-0 right-0 mt-1 border-2 border-gray-300 rounded-lg shadow-md mx-2 w-[400px] bg-white z-10'>
						<ul className='space-y-1 max-h-[300px] overflow-y-auto p-2'>
							{sugestaoClientes.slice(0, 6).map((cliente) => (
								<li
									className='flex flex-col bg-gray-100 text-gray-800 hover:bg-blue-100 rounded-md p-3 transition duration-300 ease-in-out cursor-pointer'
									key={cliente.id}
									onClick={() => handleClienteSelect(cliente)}>
									<span className='font-semibold'>
										{cliente.nome.toUpperCase()}
									</span>
									<div className='flex justify-between mt-1 text-sm'>
										<span className='text-gray-600'>CPF: {cliente.cpf}</span>
										<span className='text-blue-600'>
											Telefone: {cliente.telefone}
										</span>
									</div>
									<div className='text-sm text-gray-600 mt-1'>
										Identidade: {cliente.identidade}
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
