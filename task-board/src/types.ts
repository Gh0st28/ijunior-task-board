export type Status = "Aberto" | "Em andamento" | "Concluído";

export interface OrdemDeServico {
    id: number;
    titulo: string;
    descricao: string;
    responsavel: string;
    status: Status;
    criadaEm: string;
}