"use client";
import { usuario as buscarUsuarioAPI } from "@/backend/db/db";
import { preVenda } from "@/backend/db/preVenda";
import InputPesquisaCliente from "@/components/inputPesquisaCliente";
import InputEstoque from "@/components/inputPesquisaProduto";
import { useState, useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

export default function Venda() {
	const [clienteSelecionado, setClienteSelecionado] = useState(null);
	const [produtosSelecionados, setProdutosSelecionados] = useState([]);
	const [valorTotal, setValorTotal] = useState(0);
	const [mostrarModal, setMostrarModal] = useState(false);
	const [formaPagamento, setFormaPagamento] = useState("");
	const [parcelasCredito, setParcelasCredito] = useState(1);
	const [endereco, setEndereco] = useState("");
	const [observacao, setObservacao] = useState("");
	const [valorPago, setvalorPago] = useState(0);
	const [valorPagoExibido, setValorPagoExibido] = useState("");
	const [dataEntrega, setDataEntrega] = useState("");
	const [usuario, setUsuario] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const buscarUsuario = async () => {
			try {
				const resposta = await buscarUsuarioAPI();
				setUsuario(resposta);
			} catch (erro) {
				console.error("Erro ao buscar usuário:", erro);
			}
		};
		buscarUsuario();
	}, []);

	const handlerClienteSelecionado = useCallback((cliente) => {
		setClienteSelecionado(cliente[0]);
	}, []);

	const handleProdutosSelecionados = useCallback((produtoOuProdutos) => {
		setProdutosSelecionados((prevProdutos) => {
			const novosProdutos = Array.isArray(produtoOuProdutos)
				? [...prevProdutos, ...produtoOuProdutos]
				: [...prevProdutos, produtoOuProdutos];

			const novoValorTotal = novosProdutos.reduce(
				(total, produto) => total + parseFloat(produto.valor),
				0
			);
			setValorTotal(novoValorTotal);

			return novosProdutos;
		});
	}, []);

	const removerProduto = useCallback((index) => {
		setProdutosSelecionados((prevProdutos) => {
			const novosProdutos = prevProdutos.filter((_, i) => i !== index);
			const novoValorTotal = novosProdutos.reduce(
				(total, produto) => total + parseFloat(produto.valor),
				0
			);
			setValorTotal(novoValorTotal);
			return novosProdutos;
		});
	}, []);

	const abrirModalPagamento = () => {
		if (clienteSelecionado && produtosSelecionados.length > 0) {
			setMostrarModal(true);
		} else {
			toast.error("Selecione um cliente e pelo menos um produto");
		}
	};

	const handleChangePago = (e) => {
		const value = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
		const floatValue = parseFloat(value) / 100; // Converte para float
		setvalorPago(floatValue); // Armazena o valor como número
		const formattedValue = new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(floatValue); // Formata para exibição
		setValorPagoExibido(formattedValue); // Armazena o valor formatado para exibição

		// Atualiza o valor das parcelas com base no valor pago
		if (floatValue > 0) {
			setParcelasCredito(1); // Reseta as parcelas para 1 quando um novo valor é inserido
		} else {
			setParcelasCredito(1); // Mantém o valor padrão se não houver valor a pagar
		}
	};

	const fecharModalPagamento = () => {
		setMostrarModal(false);
	};

	const handleFormaPagamentoChange = (e) => {
		setFormaPagamento(e.target.value);
	};

	const handleParcelasCreditoChange = (e) => {
		setParcelasCredito(Number(e.target.value));
	};

	const finalizarVenda = async () => {
		if (!valorTotal && !formaPagamento) {
			toast.error("Selecione uma forma de pagamento");
			return null;
		}
		try {
			const dadosVenda = {
				produtos: produtosSelecionados,
				total: valorTotal,
				pagamento: {
					forma: formaPagamento.toUpperCase(),
					parcelas: parcelasCredito,
				},
				cliente: clienteSelecionado,
				endereco: endereco,
				observacao: observacao,
				valorPago: valorPago,
				dataEntrega: dataEntrega || new Date().toLocaleDateString('pt-BR'),
			};
			await preVenda(dadosVenda);
			toast.success("Venda realizada com sucesso");
			router.push(ROUTES.LISTA_PREVENDA);

			// Limpar todos os campos
			setClienteSelecionado(null);
			setProdutosSelecionados([]);
			setValorTotal(0);
			setFormaPagamento("");
			setParcelasCredito(1);
			setEndereco("");
			setObservacao("");
			fecharModalPagamento();
		} catch (error) {
			toast.error("Erro ao realizar a venda, confira os campos");
		}
	};

	return (
		<div className='flex h-[calc(100vh-40px)]'>
			<div className='w-[40%] flex flex-col justify-center items-center'>
				<InputPesquisaCliente onClienteSelect={handlerClienteSelecionado} />
				<InputEstoque onProdutosSelecionados={handleProdutosSelecionados} />
				<label htmlFor='endereco'>Endereço</label>
				<input
					type='text'
					placeholder='Endereço...'
					name='endereco'
					value={endereco}
					onChange={(e) => setEndereco(e.target.value)}
					autoComplete={`new-${Math.random()}`}
					className='text-black p-1 m-1 w-[250px] border-2 border-black rounded-lg'
				/>
				<label htmlFor='data'>DATA DE ENTREGA</label>
				<input
					className='text-black p-1 m-1 w-[250px] border-2 border-black rounded-lg'
					type='date'
					name='dataDeEntrega'
					min={new Date().toISOString().split("T")[0]}
					defaultValue={new Date().toISOString().split("T")[0]}
					onChange={(e) => setDataEntrega(e.target.value)}
				/>
				<label htmlFor='observacao'>Observação:</label>
				<textarea
					id='observacao'
					placeholder='Observação...'
					value={observacao}
					onChange={(e) => setObservacao(e.target.value)}
					className='text-black w-[80%]'
					rows={3}
				/>
			</div>
			<div className='flex flex-col w-[60%]'>
				<div className='h-[100px] flex flex-col justify-center items-center'>
					<h1 className='text-white text-xl text-center font-semibold mb-2'>Produtos</h1>
					<ToastContainer autoClose={2000} position='top-center' />
					{clienteSelecionado ? (
						<div className='bg-white rounded-lg shadow-md p-1 mb-1 w-[50%]'>
							<div className='flex justify-between items-center'>
								<h3 className='text-xl font-semibold text-gray-800'>
									Cliente:{" "}
									<span className='text-blue-600'>{clienteSelecionado.nome}</span>
								</h3>
								<button
									onClick={() => setClienteSelecionado(null)}
									className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out'>
									Remover
								</button>
							</div>
						</div>
					) : (
						<div className='bg-gray-100 rounded-lg w-[40%] text-center'>
							<h1 className='text-1xl font-bold text-gray-600'>Nenhum cliente selecionado</h1>
						</div>
					)}
				</div>
				<h2 className='text-white text-xl text-center font-semibold mb-2'>Produtos selecionados</h2>
				<div className='h-[300px]'>
					{produtosSelecionados.length > 0 ? (
						<div className='max-h-[300px] overflow-y-auto'>
							<ul className='mx-5'>
								{produtosSelecionados.map((produto, index) => (
									<li
										key={index}
										className='bg-gradient-to-r from-white to-gray-100 text-gray-800 rounded-lg shadow-md p-4 mb-2 flex justify-between items-center hover:shadow-lg transition duration-300 ease-in-out'>
										<div className='flex flex-col'>
											<span className='font-semibold text-lg'>{produto.produto}</span>
											<div className='flex space-x-4 text-sm mt-1'>
												<span className='text-green-600'>Valor: R$ {parseFloat(produto.valor).toFixed(2)}</span>
												<span className='text-blue-600'>Código: {produto.codigo}</span>
											</div>
										</div>
										<button
											onClick={() => removerProduto(index)}
											className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
											<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8a1 1 0 00-1-1z'
													clipRule='evenodd'
												/>
											</svg>
											Remover
										</button>
									</li>
								))}
							</ul>
						</div>
					) : (
						<div className='h-[300px] border border-spacing-2 border-white rounded-lg flex justify-center items-center'>
							<p className='text-white'>Nenhum produto selecionado</p>
						</div>
					)}
				</div>
				{produtosSelecionados.length > 0 && (
					<div>
						<h1 className='text-white text-xl font-semibold mt-4'>Valor Total: R$ {valorTotal.toFixed(2)}</h1>
						<button
							onClick={abrirModalPagamento}
							className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
							Forma de pagamento
						</button>
						{mostrarModal && (
							<div className='text-black fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
								<div className='flex flex-col bg-white w-[50%] h-[50%] p-2 rounded-lg'>
									<h2 className='text-1xl text-center'>Formas de Pagamento</h2>
									<div className='h-[100%]'>
										<div className='flex justify-between p-5'>
											<span>Valor</span>
											<p>{valorTotal.toFixed(2)}</p>
											<label htmlFor='valorPago' className='block text-sm font-medium text-gray-700'>Valor á Pagar:</label>
											<input
												type='text'
												name='valorPago'
												id='valorPago'
												value={valorPagoExibido}
												onChange={handleChangePago}
												className='mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
											/>
										</div>
										<div className='flex flex-wrap gap-4 mb-4'>
											{["dinheiro", "pix", "carne", "debito", "credito"].map((tipo) => (
												<div key={tipo} className='flex items-center gap-2'>
													<input
														type='radio'
														name='formaPagamento'
														id={tipo}
														value={tipo}
														checked={formaPagamento === tipo}
														onChange={handleFormaPagamentoChange}
													/>
													<label htmlFor={tipo} className='capitalize'>{tipo}</label>
												</div>
											))}
										</div>
										<div className='h-[100px]'>
											{formaPagamento === "credito" && (
												<div className='p-4 bg-gray-100 rounded-lg'>
													<h3 className='text-lg font-semibold mb-2'>Opções de Parcelamento</h3>
													<select
														value={parcelasCredito}
														onChange={handleParcelasCreditoChange}
														className='w-full p-2 border rounded'>
														{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcela) => {
															let valorParcela = valorPago > 0 ? valorPago / parcela : valorTotal / parcela; // Usa o valor pago se existir
															return (
																<option className='text-lg' key={parcela} value={parcela}>
																	{parcela}x de R$ {valorParcela.toFixed(2)}{" "}
																</option>
															);
														})}
													</select>
												</div>
											)}
										</div>
										<div className='mt-auto pt-4 flex justify-between'>
											<button
												onClick={fecharModalPagamento}
												className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
												<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='currentColor'>
													<path
														fillRule='evenodd'
														d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
														clipRule='evenodd'
													/>
												</svg>
												Fechar
											</button>
											<button
												onClick={finalizarVenda}
												className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
												<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='currentColor'>
													<path
														fillRule='evenodd'
														d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
														clipRule='evenodd'
													/>
												</svg>
												Finalizar
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}