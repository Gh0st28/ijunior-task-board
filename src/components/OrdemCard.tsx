import { OrdemDeServico, Status } from "../types";
import { ChangeEvent } from "react";

interface Props {
    ordem: OrdemDeServico;
    onMudarStatus: (id: number, novoStatus: Status) => void;
}

const corStatus: { [key in Status]: string } = {
    "Aberto": "bg-red-500",
    "Em andamento": "bg-yellow-500",
    "Concluído": "bg-green-500",
};

export default function OrdemCard({ ordem, onMudarStatus }: Props) {
    return (
        <div className="bg-zinc-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
            <div classname="flex items-center justify-between">
                <h2 className="text-white font-semibold text-lg">{ordem.titulo}</h2>
                <span
                    className={`text-white text-xs px-2 py-1 rounded-full ${corStatus[ordem.status]}`}
                    >{ordem.status}
                </span>
            </div>
            <p className="text-zinc-400 text-sm">{ordem.descricao}</p>
            <div className="text-zinc-500 text-xs flex justify-between">
                <span>Responsável: {ordem.responsavel}</span>
                <span>Data: {ordem.criadaEm}</span>
            </div>
            <select
                className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 mt-1"
                value={ordem.status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                    onMudarStatus(ordem.id, e.target.value as Status)}
            >
                <option value="Aberto">Aberto</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
            </select>
        </div>
    );
}