"use client";
import InputPesquisaCliente from "@/components/inputPesquisaCliente";
import InputEstoque from "@/components/inputPesquisaProduto";
import { useState, useCallback, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Venda() {
	const [clienteSelecionado, setClienteSelecionado] = useState(null);
	const [produtosSelecionados, setProdutosSelecionados] = useState([]);
	const [valorTotal, setValorTotal] = useState(0);
	const [mostrarModal, setMostrarModal] = useState(false);
	const [formaPagamento, setFormaPagamento] = useState("");
	const [parcelasCredito, setParcelasCredito] = useState(1);

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
		} else if (!clienteSelecionado) {
			toast.error("Selecione um cliente");
		} else if (produtosSelecionados.length === 0) {
			toast.error("Selecione pelo menos um produto");
		} else {
			toast.error("Selecione um cliente e pelo menos um produto");
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

	const finalizarVenda = () => {
		// Adicione o código para finalizar a venda aqui
	};

	return (
		<div className='flex h-[calc(100vh-40px)]'>
			<div className='w-[40%] flex flex-col justify-center'>
				<InputPesquisaCliente onClienteSelect={handlerClienteSelecionado} />
				<InputEstoque onProdutosSelecionados={handleProdutosSelecionados} />
			</div>
			<div className='flex flex-col bg-slate-600 w-[60%]'>
				<div className='h-[100px] flex flex-col justify-center items-center'>
					<h1 className='text-white text-xl text-center font-semibold mb-2'>
						Produtos
					</h1>
					<ToastContainer
						autoClose={2000}
						position='top-center'
					/>
					{clienteSelecionado ? (
						<div className=' bg-white rounded-lg shadow-md p-1 mb-1 w-[50%]'>
							<div className=' flex justify-between items-center'>
								<h3 className='text-xl font-semibold text-gray-800'>
									Cliente:{" "}
									<span className='text-blue-600'>
										{clienteSelecionado.nome}
									</span>
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
							<h1 className='text-1xl font-bold  text-gray-600'>
								Nenhum cliente selecionado
							</h1>
						</div>
					)}
				</div>
				<h2 className='text-white text-xl text-center font-semibold mb-2'>
					Produtos selecionados
				</h2>
				<div className='h-[300px] '>
					{produtosSelecionados.length > 0 ? (
						<div className='max-h-[300px] overflow-y-auto'>
							<ul className='mx-5'>
								{produtosSelecionados.map((produto, index) => (
									<li
										key={index}
										className='bg-gradient-to-r from-white to-gray-100 text-gray-800 rounded-lg shadow-md p-4 mb-2 flex justify-between items-center hover:shadow-lg transition duration-300 ease-in-out'>
										<div className='flex flex-col'>
											<span className='font-semibold text-lg'>
												{produto.produto}
											</span>
											<div className='flex space-x-4 text-sm mt-1'>
												<span className='text-green-600'>
													Valor: R$ {parseFloat(produto.valor).toFixed(2)}
												</span>
												<span className='text-blue-600'>
													Código: {produto.codigo}
												</span>
											</div>
										</div>
										<button
											onClick={() => removerProduto(index)}
											className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5 mr-1'
												viewBox='0 0 20 20'
												fill='currentColor'>
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
						<h1 className='text-white text-xl font-semibold mt-4'>
							Valor Total: R$ {valorTotal.toFixed(2)}
						</h1>
						<button
							onClick={abrirModalPagamento}
							className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 mr-1'
								viewBox='0 0 20 20'
								fill='currentColor'>
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
									<h2 className='text-1xl text-center '>Formas de Pagamento</h2>
									<div className='h-[100%]'>
										<div>
											<input
												type='text'
												placeholder='Valor'
												className='w-full mb-4 p-2 border rounded'
											/>
										</div>
										<div className='flex flex-wrap gap-4 mb-4'>
											{["dinheiro", "pix", "carne", "debito", "credito"].map(
												(tipo) => (
													<div
														key={tipo}
														className='flex items-center gap-2'>
														<input
															type='radio'
															name='formaPagamento'
															id={tipo}
															value={tipo}
															checked={formaPagamento === tipo}
															onChange={handleFormaPagamentoChange}
														/>
														<label
															htmlFor={tipo}
															className='capitalize'>
															{tipo}
														</label>
													</div>
												)
											)}
										</div>
										<div className='h-[100px]'>
											{formaPagamento === "credito" && (
												<div className='p-4 bg-gray-100 rounded-lg'>
													<h3 className='text-lg font-semibold mb-2'>
														Opções de Parcelamento
													</h3>
													<select
														value={parcelasCredito}
														onChange={handleParcelasCreditoChange}
														className='w-full p-2 border rounded'>
														{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
															(parcela) => (
																<option
																	key={parcela}
																	value={parcela}>
																	{parcela}x{" "}
																	{parcela === 1 ? "sem juros" : "com juros"}
																</option>
															)
														)}
													</select>
												</div>
											)}
										</div>

										<div className='mt-auto pt-4 flex justify-between'>
											<button
												onClick={fecharModalPagamento}
												className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 mr-1'
													viewBox='0 0 20 20'
													fill='currentColor'>
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
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 mr-1'
													viewBox='0 0 20 20'
													fill='currentColor'>
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
