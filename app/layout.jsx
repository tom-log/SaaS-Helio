import "./globals.css";
export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className=" bg-slate-600 h-screen " >
				<main >
				{children}
				</main>
			</body>
		</html>
	);
}
