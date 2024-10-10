"use client";
import Header from "@/components/header";
import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';
const DashboardLayout = ({ children }) => {
	return (
		<div >
			<Header/>
			<main className='text-white font-mono text-base'>{children}</main>
		</div>
	);
};

export default DashboardLayout;
