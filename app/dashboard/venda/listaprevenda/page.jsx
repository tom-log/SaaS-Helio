"use client";
import {
	AcaoAnalise,
	excluirPreVenda,
	getPreVenda,
} from "@/backend/db/preVenda";
import { useEffect, useState } from "react";
import {
	FaCheckCircle,
	FaShoppingCart,
	FaTimesCircle,
	FaTrash,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { usuario as buscarUsuarioAPI } from "@/backend/db/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

const ListaPreVenda = () => {
	const [preVendaData, setPreVendaData] = useState([]);
	const [usuario, setUsuario] = useState(null);
	const [tempoRestante, setTempoRestante] = useState(60);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Buscando usuário
				const usuarioResposta = await buscarUsuarioAPI();
				setUsuario(usuarioResposta);

				// Buscando pré-venda
				const preVendaResposta = await getPreVenda();
				setPreVendaData(preVendaResposta);

				setIsLoading(false); // Dados carregados
			} catch (erro) {
				console.error("Erro ao carregar dados:", erro);
			}
		};

		fetchData();

		const intervalo = setInterval(() => {
			setTempoRestante((prevTempo) => {
				if (prevTempo === 1) {
					fetchData();
					return 60;
				}
				return prevTempo - 1;
			});
		}, 1000);

		return () => clearInterval(intervalo);
	}, []);

	const formatarValor = (valor) => {
		return valor.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	const formatarData = (data) => {
		const [ano, mes, dia] = data.split("-");
		return `${dia}/${mes}/${ano}`;
	};

	const preVendaMap = {};

	preVendaData.forEach((item) => {
		const preVendaId = item.preVendaId;

		if (!preVendaMap[preVendaId]) {
			preVendaMap[preVendaId] = {
				statusAnalise: item.analise,
				vendedor: item.vendedor.nome,
				valorTotal: 0,
				dataEntrega: item.dataEntrega,
				cliente: item.cliente,
				preVendaId: item.preVendaId,
				itens: [],
			};
		}
		preVendaMap[preVendaId].valorTotal += item.valor;
		preVendaMap[preVendaId].itens.push(item);
	});

	const obterCorStatus = (status) => {
		switch (status) {
			case "ANALISE":
				return "bg-yellow-400";
			case "DEFERIDO":
				return "bg-green-500";
			case "INDEFERIDO":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const Excluir = async (preVendaId) => {
		try {
			const resultado = await excluirPreVenda(preVendaId);
			if (resultado) {
				setPreVendaData(
					preVendaData.filter((item) => item.preVendaId !== preVendaId)
				);
				toast.success("Excluído com sucesso");
				router.push(ROUTES.PREVENDA);
			}
		} catch (error) {
			toast.error("Erro ao excluir");
			console.error("Erro ao excluir pre-venda:", error);
		}
	};

	const acaoAnalise = async (analise, preVendaId) => {
		try {
			const resultado = await AcaoAnalise(analise, preVendaId);
			if (resultado) {
				const novasPreVendas = preVendaData.map((item) => {
					if (item.preVendaId === preVendaId) {
						return { ...item, analise }; // Atualiza o status de análise
					}
					return item;
				});
				setPreVendaData(novasPreVendas);
				toast.success("Atualizado com sucesso");
			}
		} catch (error) {
			toast.error("Erro ao atualizar");
			console.error("Erro ao realizar a ação de análise:", error);
		}
	};

	return (
		<div className='p-6'>
			<ToastContainer limit={20} />
			<h1 className='text-3xl font-bold text-center mb-8 text-blue-600 uppercase'>Pré-Venda</h1>
			<div className="mb-4 w-screen -mx-6">
				<div className="w-full bg-gray-200 h-2.5">
					<div
						className="bg-green-600 h-2.5 transition-all duration-1000 ease-linear"
						style={{ width: `${(tempoRestante / 60) * 100}%` }}
					></div>
				</div>
				<p className="text-sm text-gray-600 mt-1 px-6">
					Próxima atualização em {tempoRestante} segundo{tempoRestante !== 1 ? 's' : ''}
				</p>
			</div>
			<table className='min-w-full bg-white'>
				<thead>
					<tr>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Cliente
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Identidade
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							CPF
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Valor Total
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Data de Entrega
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Vendedor
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Status Análise
						</th>
						<th className='py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-800'>
							Ações
						</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(preVendaMap).map((preVendaId) => (
						<tr
							key={preVendaId}
							className='hover:bg-gray-300 hover:shadow-lg transition duration-300 ease-in-out'>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-800 uppercase'>
								{preVendaMap[preVendaId].cliente.nome}
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-600 uppercase'>
								{preVendaMap[preVendaId].cliente.identidade}
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-600 uppercase'>
								{preVendaMap[preVendaId].cliente.cpf}
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-800 uppercase'>
								{formatarValor(preVendaMap[preVendaId].valorTotal)}
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-600 uppercase'>
								{preVendaMap[preVendaId].dataEntrega}
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-600 uppercase'>
								{preVendaMap[preVendaId].vendedor}
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-800'>
								<div className='flex items-center'>
									<div
										className={`w-5 h-5 rounded-full ${obterCorStatus(
											preVendaMap[preVendaId].statusAnalise
										)}`}></div>
									<span className='ml-2 uppercase'>
										{preVendaMap[preVendaId].statusAnalise}
									</span>
								</div>
							</td>
							<td className='py-2 px-4 border-b border-gray-200 text-sm text-gray-800'>
								<div className='flex space-x-2'>
									<Link
										href={`${ROUTES.LISTA_PREVENDA}/${preVendaMap[preVendaId].preVendaId}`}>
										<button
											title='Visualizar'
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded'>
											<FaShoppingCart />
										</button>
									</Link>
									{usuario &&
									usuario.some((usr) =>
										["GERENTE", "FINANCEIRO"].includes(usr.funcao)
									) ? (
										<>
											<button
												title='Aprovar'
												onClick={() =>
													acaoAnalise(
														"DEFERIDO",
														preVendaMap[preVendaId].preVendaId
													)
												}
												className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded'>
												<FaCheckCircle />
											</button>
											<button
												title='Desaprovar'
												onClick={() =>
													acaoAnalise(
														"INDEFERIDO",
														preVendaMap[preVendaId].preVendaId
													)
												}
												className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded'>
												<FaTimesCircle />
											</button>
											<button
												title='Excluir'
												onClick={() =>
													Excluir(preVendaMap[preVendaId].preVendaId)
												}
												className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded'>
												<FaTrash />
											</button>
										</>
									) : (
										""
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListaPreVenda;