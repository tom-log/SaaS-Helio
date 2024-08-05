"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const PaginaDeLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		signIn("credentials", {
			...data,
			callbackUrl: "/dashboard",
		});
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			
			<div className='max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md'>
				<h2 className='text-2xl font-bold mb-6 text-center'>Entrar</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-700'>
							Email
						</label>
						<input
							type='email'
							id='email'
							className='w-full px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-gray-700'>
							Senha
						</label>
						<input
							type='password'
							id='password'
							className='w-full px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'>
						Entrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default PaginaDeLogin;
