import { useState, ChangeEvent } from "react";
import { OrdemDeServico, Status } from "../types";

interface Props {
    onAdicionar: (ordem: OrdemDeServico) => void;
}

export default function FormNovaOrdem({ onAdicionar }: Props) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [status, setStatus] = useState<Status>("Aberto");

    function handleSubmit() {
        if (!titulo || !responsavel) {
            alert("Título e responsável são obrigatórios");
            return;
        }

        const novaOrdem: OrdemDeServico = {
            id: Date.now(),
            titulo,
            descricao,
            responsavel,
            status,
            criadaEm: new Date().toLocaleDateString("pt-BR"),
        };

        onAdicionar(novaOrdem);

        setTitulo("");
        setDescricao("");
        setResponsavel("");
        setStatus("Aberto");
    }

    return (
        <div className="bg-zinc-800 rounded-xl p-6 flex flex-col gap-4 shadow-md">
            <h2 className="text-white font-semibold text-lg">Nova ordem de serviço</h2>
            <input
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                placeholder="Título *"
                value={titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
            />
            <textarea
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400 resize-none"
                placeholder="Descrição (opcional)"
                rows={3}
                value={descricao}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)}
            />
            <input
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                placeholder="Resposável *"
                value={responsavel}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setResponsavel(e.target.value)}
            />
            <select
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2"
                value={status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as Status)}
            >
                <option value="Aberto">Aberto</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
            </select>

            <button
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
                onClick={handleSubmit}
            >
                Adicionar ordem
            </button>
        </div>
    );
}