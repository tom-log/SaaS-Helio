import { signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
	return (
		<header className=' container h-[40px] flex justify-between items-center bg-black'>
			<nav>
				<ul className='flex gap-3 text-white transform uppercase font-medium'>
					<li>
						<Link
							href='/dashboard'
							className='p-2 hover:bg-blue-700 transition duration-300 ease-out hover:ease-in-out'>
							Home
						</Link>
					</li>
					<li>
						<Link
							href='/dashboard/venda'
							className='p-2 hover:bg-blue-700 transition duration-300 ease-out hover:ease-in-out'>
							Vendas
						</Link>
					</li>
					<li>
						<Link
							href='/dashboard/financeiro'
							className='p-2 hover:bg-blue-700 transition duration-300 ease-out hover:ease-in-out'>
							financeiro
						</Link>
					</li>
				</ul>
			</nav>
			<button
				onClick={() => signOut()}
				className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
				Log Out
			</button>
		</header>
	);
};

export default Header;
