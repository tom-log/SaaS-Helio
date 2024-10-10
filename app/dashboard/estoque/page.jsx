"use client";

import { useEffect, useState, useRef } from "react";
import { inserirEstoque, buscarEstoque, excluirEstoque } from "@/backend/db/estoque";
import Quagga from "quagga"; // Importando QuaggaJS
import JsBarcode from "jsbarcode"; // Importando JsBarcode

const Estoque = () => {
	const [estoques, setEstoques] = useState([]);
	const [codigoBarras, setCodigoBarras] = useState("");
	const [scanning, setScanning] = useState(false);
	const videoRef = useRef(null);

	const fetchEstoque = async () => {
		const dados = await buscarEstoque(); // Função para buscar os dados do estoque
		setEstoques(dados);
	};

	useEffect(() => {
		fetchEstoque(); // Busca os dados ao montar o componente
	}, []);

	const gerarCodigoBarras = () => {
		const codigo = Math.floor(10000000 + Math.random() * 90000000).toString(); // Gera um número aleatório de 8 dígitos
		return codigo;
	};
	

	const handleFormEstoque = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const produto = formData.get("produto");
		const valor = formData.get("valor");
		const unidade = formData.get("unidade");

		if (!produto || !valor || !unidade) {
			alert("Insira um produto nos campos");
			return;
		}

		const novoCodigo = gerarCodigoBarras(); // Gera o código de barras aleatório

		try {
			await inserirEstoque(produto, parseInt(valor), parseInt(unidade), novoCodigo); // Insere o estoque com o novo código de barras
			setCodigoBarras(novoCodigo); // Armazena o código gerado

			fetchEstoque(); // Atualiza a lista de estoques
			event.target.reset(); // Limpa os campos do formulário
		} catch (error) {
			alert("Erro ao inserir Produto");
		}
	};

	const handleDelete = async (id) => {
		try {
			await excluirEstoque(id); // Chama a função para excluir o estoque
			fetchEstoque(); // Atualiza a lista de estoques após a exclusão
		} catch (error) {
			alert("Erro ao excluir Produto");
		}
	};

	const startScanner = () => {
		setScanning(true);
		Quagga.init(
			{
				inputStream: {
					type: "LiveStream",
					target: videoRef.current, // Ref para o elemento de vídeo
				},
				decoder: {
					readers: ["code_128_reader"], // Tipos de códigos de barras a serem lidos
				},
			},
			(err) => {
				if (err) {
					console.log(err);
					setScanning(false);
					return;
				}
				Quagga.start();
			}
		);

		Quagga.onDetected((data) => {
			setCodigoBarras(data.codeResult.code); // Captura o código de barras detectado
			setScanning(false);
			Quagga.stop();
		});
	};

	useEffect(() => {
		if (codigoBarras) {
			const canvas = document.createElement("canvas");
			JsBarcode(canvas, codigoBarras, {
				format: "CODE128",
				displayValue: true,
				fontSize: 18,
				height: 100,
			});
			document.body.appendChild(canvas); // Adiciona o canvas ao corpo da página
		}
	}, [codigoBarras]);

	return (
		<div className='container bg-slate-600 p-4'>
			<h1 className='text-2xl font-bold mb-4'>Estoque</h1>
			<form onSubmit={handleFormEstoque} className='mb-4'>
				<label className='block mb-2'>Nome do produto</label>
				<input
					type='text'
					placeholder='Nome do produto'
					name='produto'
					className='border p-2 mb-4 w-full text-black'
				/>
				<label className='block mb-2'>Valor</label>
				<input
					type='number'
					placeholder='Valor'
					name='valor'
					className='border p-2 mb-4 w-full text-black'
				/>
				<label className='block mb-2'>Unidade</label>
				<input
					type='number'
					placeholder='Unidade'
					name='unidade'
					className='border p-2 mb-4 w-full text-black'
				/>
				<button type='submit' className='bg-blue-500 text-white p-2 rounded'>
					Adicionar ao estoque
				</button>
				<button type='button' onClick={startScanner} className='bg-green-500 text-white p-2 rounded ml-2'>
					Ler Código de Barras
				</button>
			</form>
			<div className='mb-4'>
				<video ref={videoRef} className={`w-full ${scanning ? 'block' : 'hidden'}`}></video>
			</div>
			<table className='min-w-full border'>
				<thead>
					<tr className='bg-gray-700'>
						<th className='border px-2 py-1'>Produto</th>
						<th className='border px-2 py-1'>Valor</th>
						<th className='border px-2 py-1'>Unidade</th>
						<th className='border px-2 py-1'>Código de Barras</th>
						<th className='border px-2 py-1'>Ações</th>
					</tr>
				</thead>
				<tbody>
					{estoques.map((estoque) => (
						<tr key={estoque.id} className='hover:bg-gray-500'>
							<td className='border px-2 py-1'>{estoque.produto}</td>
							<td className='border px-2 py-1'>{estoque.valor}</td>
							<td className='border px-2 py-1'>{estoque.unidade}</td>
							<td className='border px-2 py-1'>{estoque.codigo}</td>
							<td className='border px-1 py-1'>
								<button onClick={() => alert(`Código de barras: ${estoque.codigo}`)} className='bg-green-500 text-white p-1 rounded'>
									Ver Código
								</button>
								<button onClick={() => handleDelete(estoque.id)} className='bg-red-500 text-white p-1 rounded ml-2'>
									Excluir
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Estoque;
