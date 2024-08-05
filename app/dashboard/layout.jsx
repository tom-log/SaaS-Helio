"use client";
import Header from "@/components/header";
import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }) => {
	return (
		<div>
			<Header />
			<main className='bg-slate-600 text-white font-mono text-base h-[calc(100vh-40px)]'>{children}</main>
		</div>
	);
};

export default DashboardLayout;
