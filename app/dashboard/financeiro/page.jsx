"use client";
import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
// Importa a biblioteca Quagga
import Quagga from "quagga";

export const Barcode = ({ value }) => {
	const barcodeRef = useRef(null);

	const handlePrint = () => {
		const printWindow = window.open("", "_blank");
		printWindow.document.write(`
			<html>
				<head>
					<title>Imprimir Código de Barras</title>
					<style>
						@media print {
							@page {
								size: A4;
								margin: 0;
							}
							body {
								display: flex;
								flex-wrap: wrap;
								justify-content: center; // Alinha ao centro
								align-items: center; // Alinha verticalmente
								height: 100vh; // Garante que ocupe toda a altura da página
							}
							svg {
								width: 100%; // Ajusta o tamanho do código de barras para 100% da largura
								max-width: 222px; // Limita a largura máxima
								margin: 10px; // Adiciona margem
							}
						}
					</style>
				</head>
				<body>
					${Array(100).fill(`<div>${barcodeRef.current.outerHTML}</div>`).join("")}
				</body>
			</html>
		`);
		printWindow.document.close();
		printWindow.print();
	};

	useEffect(() => {
		if (barcodeRef.current && value) {
			JsBarcode(barcodeRef.current, value);
		}
	}, [value]);

	return (
		<svg
			ref={barcodeRef}
			onClick={handlePrint}></svg>
	);
};

const BarcodeScanner = ({ onDetected = () => {} }) => {
	// Define um valor padrão como função vazia
	const [isOpen, setIsOpen] = useState(false); // Inicializa como fechado
	const scannerRef = useRef(null);
	const [barcodeValue, setBarcodeValue] = useState(""); // Estado para armazenar o valor do código de barras
	const [detectedCode, setDetectedCode] = useState(""); // Estado para armazenar o código detectado

	const toggleScanner = () => {
		setIsOpen((prev) => !prev); // Alterna o estado do scanner
	};

	const removeScanner = () => {
		setIsOpen(false); // Fecha o scanner
		Quagga.stop(); // Remove o listener de detecção
	};

	const generateBarcode = () => {
		const newValue = Math.floor(
			100000000 + Math.random() * 900000000
		).toString(); // Gera um valor aleatório de 9 dígitos
		setBarcodeValue(newValue); // Atualiza o estado com o novo valor
	};

	useEffect(() => {
		if (isOpen && scannerRef.current) {
			// Inicializa o Quagga apenas quando o scanner é aberto
			Quagga.init(
				{
					inputStream: {
						name: "Live",
						type: "LiveStream",
						target: scannerRef.current,
						constraints: {
							width: 650,
							height: 480,
							facingMode: "environment",
						},
					},
					decoder: {
						readers: ["code_128_reader"],
					},
				},
				(err) => {
					if (err) return console.error(err);
					Quagga.start();
				}
			);

			Quagga.onDetected((data) => {
				if (data.codeResult?.code) {
					setDetectedCode(data.codeResult.code); // Atualiza o estado com o código detectado
					onDetected(data.codeResult.code);
				}
			});

			// Adiciona um listener para parar o Quagga quando o componente é desmontado
			return () => {
				Quagga.stop(); // Para o scanner
				Quagga.offDetected(); // Remove o listener de detecção
			};
		} else {
			if (Quagga.initialized) {
				// Verifica se o Quagga foi inicializado
				Quagga.stop(); // Atualiza a tela parando o scanner se não estiver aberto
			}
		}
	}, [onDetected, isOpen]); // O efeito depende de isOpen

	return (
		<div className='flex'>
			<div className='w-[50%]'>
				<button onClick={toggleScanner}>
					{isOpen ? "Fechar Scanner" : "Abrir Scanner"}
				</button>
				{isOpen && (
					<div
						ref={scannerRef}
						id='barcode-scanner' // Adiciona posição relativa ao scanner
					></div>
				)}
				{isOpen && <button onClick={removeScanner}>Remover Scanner</button>}{" "}
				{/* Botão para remover o scanner */}
				<button onClick={generateBarcode}>Gerar Código de Barras</button>{" "}
				{/* Botão para gerar código */}
				<Barcode value={barcodeValue} />{" "}
				{/* Passa o valor gerado para o componente Barcode */}
			</div>
			<div>
				Código detectado: {detectedCode} {/* Exibe o código detectado */}
			</div>
		</div>
	);
};

export default BarcodeScanner;
