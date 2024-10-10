"use client";
import { useState, useEffect } from "react";
import { AcaoAnalise, getPreVendaCodigo, atualizarPreVenda } from "@/backend/db/preVenda";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { usuario as buscarUsuarioAPI } from "@/backend/db/db";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

export default function ProductPage({ params }) {
  const { id } = params;
  const idnumber = Number(id);

  const [cliente, setCliente] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [observacaoAnalise, setObservacaoAnalise] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar usuário
        const respostaUsuario = await buscarUsuarioAPI();
        setUsuario(respostaUsuario);

        // Buscar pré-venda
        const respostaPreVenda = await getPreVendaCodigo(idnumber);
        if (Array.isArray(respostaPreVenda) && respostaPreVenda.length > 0) {
          const { cliente, parcelasCredito = 1 } = respostaPreVenda[0];
          const produtosData = respostaPreVenda.map(({ produto, valor, valorPago, dataEntrega, endereco, formaPagamento, parcelasCredito, vendedor, observacao }) => ({
            produto: produto || "Produto não disponível",
            valor: valor || 0,
            valorPago: valorPago || 0,
            dataEntrega: dataEntrega || "Data de entrega não disponível",
            endereco,
            formaDePagamento: formaPagamento,
            parcelas: parcelasCredito,
            vendedor,
            observacao,
          }));

          const valorTotal = produtosData.reduce((acc, { valor }) => acc + valor, 0);
          const valorPorParcela = (valorTotal / parcelasCredito).toFixed(2);

          const clienteData = {
            nome: cliente.nome || "Nome não disponível",
            cpf: cliente.cpf || "CPF não disponível",
            identidade: cliente.identidade || "Identidade não disponível",
            endereco: `${cliente.endereco || "Endereço não cadastrado"}, ${cliente.cidade || ""} - ${cliente.estado || ""}`,
            email: cliente.email || "Email não cadastrado",
            telefone: cliente.telefone || "Telefone não cadastrado",
            valorTotal: valorTotal.toFixed(2),
            formaDePagamento: produtosData[0].formaDePagamento,
            parcelas: produtosData[0].parcelas,
            enderecoEntrega: produtosData[0].endereco || "Utilizar endereço do cliente",
            dataEntrega: produtosData[0]?.dataEntrega || "Data da Entrega não disponível",
            valorPorParcela,
            vendedor: produtosData[0].vendedor,
            observacao: produtosData[0].observacao,
            valorPago: produtosData[0].valorPago.toFixed(2),
          };

          setCliente(clienteData);
          setProdutos(produtosData);
        } else {
          setError("Dados incompletos ou ausentes na resposta da pré-venda.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(`Erro ao buscar dados: ${error.message}`);
      }
    };

    fetchData();
  }, [idnumber]);

  const acaoAnalise = async (analise, preVendaId) => {
    try {
      const resultado = await AcaoAnalise(analise, preVendaId);
      if (resultado === true) toast.success("Atualizado com sucesso");
      router.push(ROUTES.LISTA_PREVENDA);
    } catch (error) {
      toast.error("Erro ao atualizar");
      console.error("Erro ao realizar a ação de análise:", error);
    }
  };

  const atualizarPVenda = async () => {
    try {
      const dadosAtualizados = {
        id: idnumber,
        valorPago: parseFloat(cliente.valorPago),
        dataEntrega: cliente.dataEntrega,
        observacaoAnalise: observacaoAnalise
      };
      const resultado = await atualizarPreVenda(dadosAtualizados);
      if (resultado === true) {
        toast.success("Atualizado com sucesso");
        router.push(ROUTES.LISTA_PREVENDA);
      }
    } catch (error) {
      toast.error("Erro ao atualizar");
      console.error("Erro ao atualizar a pré-venda:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <ToastContainer limit={20} />
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 uppercase">
        DETALHES DO CLIENTE E PRODUTOS
      </h1>

      {error && (
        <p className="text-red-600 text-center mb-4 uppercase">{error}</p>
      )}

      {cliente && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 uppercase border-b border-gray-300 pb-2">
            INFORMAÇÕES DO CLIENTE
          </h2>
          <p className="text-lg mb-2 uppercase">{`VENDEDOR: ${cliente.vendedor.nome}`}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Nome:</strong> {cliente.nome}</p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">CPF:</strong> {cliente.cpf}</p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Identidade:</strong> {cliente.identidade}</p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Endereço:</strong> {cliente.endereco}</p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Email:</strong> {cliente.email}</p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Telefone:</strong> {cliente.telefone}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Valor Total dos Produtos:</strong> R$ {cliente.valorTotal}</p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Valor a ser pago:</strong> R$ <input value={cliente.valorPago} onChange={(e) => setCliente({...cliente, valorPago: e.target.value})} type="number" step="0.01" min="0" className="border border-gray-300 rounded px-2 py-1 w-24" /></p>
              <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Data da Entrega:</strong> <input className="border border-gray-300 rounded px-2 py-1" type="date" value={cliente.dataEntrega} onChange={(e) => setCliente({...cliente, dataEntrega: e.target.value})} /></p>
              {cliente.enderecoEntrega && <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Endereço de Entrega:</strong> {cliente.enderecoEntrega}</p>}
              {cliente.formaDePagamento === "CREDITO" && <p className="text-lg mb-2"><strong className="text-gray-700 uppercase">Valor por Parcela:</strong> {`${cliente.parcelas} X R$ ${cliente.valorPago > 0 ? (cliente.valorPago / cliente.parcelas).toFixed(2) : (cliente.valorTotal / cliente.parcelas).toFixed(2)}`}</p>}
              <p className="text-lg"><strong className="text-gray-700 uppercase">Forma de Pagamento:</strong> {cliente.formaDePagamento}</p>
              {cliente.observacaoAnalise && <p className="bg-red-400 w-[80%] text-lg mb-2"><strong className="text-gray-700 uppercase">Observação do vendedor:</strong> {cliente.observacaoAnalise}</p>}
            </div>
          </div>
        </div>
      )}
      {cliente && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 uppercase">OBSERVAÇÃO DA ANÁLISE</h2>
          <textarea value={observacaoAnalise} onChange={(e) => setObservacaoAnalise(e.target.value)} className="bg-slate-100 border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Escreva suas observações aqui..." />
          <div className="flex gap-4">
            {usuario && usuario.some((usr) => ["GERENTE", "FINANCEIRO"].includes(usr.funcao)) && (
              <>
                <button title="Deferir" onClick={() => acaoAnalise("DEFERIDO", idnumber)} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"><FaCheckCircle /> DEFERIR</button>
                <button title="Indeferir" onClick={() => acaoAnalise("INDEFERIDO", idnumber)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"><FaTimesCircle /> INDEFERIR</button>
              </>
            )}
          </div>
          <button title="Analise" onClick={atualizarPVenda} className="bg-yellow-400 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"><FaTimesCircle /> ANALISE</button>
        </div>
      )}
      {produtos.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 uppercase">INFORMAÇÕES DOS PRODUTOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-700 uppercase">{produto.produto}</h3>
                <p className="text-lg"><strong className="text-gray-600 uppercase">Valor:</strong> R$ {produto.valor.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}