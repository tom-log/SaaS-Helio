"use client";

import { usuario as buscarUsuarioAPI } from "@/backend/db/db";
import { ROUTES } from "@/routes/routes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
	const [usuario, setUsuario] = useState(null);

	useEffect(() => {
		async function buscarUsuario() {
			try {
				const resposta = await buscarUsuarioAPI();
				setUsuario(resposta);
			} catch (erro) {
				console.error("Erro ao buscar usuário:", erro);
			}
		}
		buscarUsuario();
	}, []);

	return (
		<header className='container h-[50px] flex justify-between items-center bg-gray-900 shadow-lg p-4 rounded-lg'>
			<nav>
				<ul className='flex gap-8 text-white transform uppercase font-bold'>
					<li>
						<Link
							href='/dashboard'
							className='p-2 hover:bg-blue-600 transition duration-300 ease-out hover:scale-105 rounded-md'>
							Home
						</Link>
					</li>
					<li className='relative group'>
						<Link
							href={ROUTES.VENDA}
							className='p-2 hover:bg-blue-600 transition duration-300 ease-out hover:scale-105 rounded-md'>
							Vendas
						</Link>
						<div className='absolute w-[150px] hidden group-hover:block bg-white text-black rounded-md shadow-lg'>
							<Link href={ROUTES.LISTA_PREVENDA} className='block p-2 hover:bg-blue-500 rounded-md'>Listar Pré-Venda</Link>
							<Link href={ROUTES.PREVENDA} className='block p-2 hover:bg-blue-500 rounded-md'>Pré-venda</Link>
							<Link href={ROUTES.LISTA_PREVENDA} className='block p-2 hover:bg-blue-500 rounded-md'>Listar Pré-Venda</Link>
							<Link href={ROUTES.PREVENDA} className='block p-2 hover:bg-blue-500 rounded-md'>Pré-venda</Link>
							<Link href={ROUTES.LISTA_PREVENDA} className='block p-2 hover:bg-blue-500 rounded-md'>Listar Pré-Venda</Link>
							<Link href={ROUTES.PREVENDA} className='block p-2 hover:bg-blue-500 rounded-md'>Pré-venda</Link>
						</div>
					</li>
					<li>
						<Link
							href={ROUTES.CAIXA}
							className='p-2 hover:bg-blue-600 transition duration-300 ease-out hover:scale-105 rounded-md'>
							Caixa
						</Link>
					</li>
					<li>
						<Link
							href={ROUTES.ESTOQUE}
							className='p-2 hover:bg-blue-600 transition duration-300 ease-out hover:scale-105 rounded-md'>
							Estoque
						</Link>
					</li>
					<li>
						<Link
							href={ROUTES.FINANCEIRO}
							className='p-2 hover:bg-blue-600 transition duration-300 ease-out hover:scale-105 rounded-md'>
							financeiro
						</Link>
					</li>
					<li>
						<Link
							href={ROUTES.CLIENTE}
							className='p-2 hover:bg-blue-600 transition duration-300 ease-out hover:scale-105 rounded-md'>
							Clientes
						</Link>
					</li>
				</ul>
			</nav>
			{usuario && (
				<div className='text-white'>
					{usuario.map((user, index) => (
						<h1 key={index} className='text-lg font-semibold'>
							Usuario(a) {user.nome.toUpperCase()} - {user.email} -{" "}
							{user.funcao}
						</h1>
					))}
				</div>
			)}
			<button
				onClick={() => signOut()}
				className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105'>
				Log Out
			</button>
		</header>
	);
};

export default Header;