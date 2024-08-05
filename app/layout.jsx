import "./globals.css";
export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body >
				<main className=" h-screen">
				{children}
				</main>
			</body>
		</html>
	);
}
