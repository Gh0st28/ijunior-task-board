import { useState, ChangeEvent } from "react";
import { OrdemDeServico, Status } from "../types";

//Interface para as informações esperadas
interface Props {
    onAdicionar: (ordem: OrdemDeServico) => void;
}

//Formulário para criação de nova ordem
export default function FormNovaOrdem({ onAdicionar }: Props) {

    //Definições iniciais
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [status, setStatus] = useState<Status>("Aberto");

    //Função que lida com a submissão de novas ordens
    function handleSubmit() {

        //Alerta caso algum item obrigatório (marcado na página com *) esteja faltando
        if (!titulo || !responsavel) {
            alert("Título e responsável são obrigatórios");
            return;
        }
        
        //Construção de uma nova ordem a partir do template de OrdemDeServico
        const novaOrdem: OrdemDeServico = {
            id: Date.now(),
            titulo,
            descricao,
            responsavel,
            status,
            criadaEm: new Date().toLocaleDateString("pt-BR"),
        };

        //Passa os dados para App.tsx
        onAdicionar(novaOrdem);

        //Reseta os campos do formulário
        setTitulo("");
        setDescricao("");
        setResponsavel("");
        setStatus("Aberto");
    }

    return (

        //Estrutura do form
        <div className="bg-zinc-800 rounded-xl p-6 flex flex-col gap-4 shadow-md">
            //Título do form
            <h2 className="text-white font-semibold text-lg">Nova ordem de serviço</h2>

            //Espaço monolinha de input para o título (obrigatório)
            <input
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                placeholder="Título *"
                value={titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
            />

            //Espaço multi-linha de input para a descrição (opcional)
            <textarea
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400 resize-none"
                placeholder="Descrição (opcional)"
                rows={3}
                value={descricao}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)}
            />

            //Espaço monolinha de input para o responsável
            <input
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                placeholder="Resposável *"
                value={responsavel}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setResponsavel(e.target.value)}
            />

            //Menu dropdown para a atribuição de status da ordem
            <select
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2"
                value={status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as Status)}
            >
                <option value="Aberto">Aberto</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
            </select>

            //Botão que adiciona ordem à lista
            <button
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
                onClick={handleSubmit}
            >
                Adicionar ordem
            </button>
        </div>
    );
}