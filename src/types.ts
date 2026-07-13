//Possíveis status de cada ordem
export type Status = "Aberto" | "Em andamento" | "Concluído";

//Atributos de cada ordem
export interface OrdemDeServico {
    id: number;
    titulo: string;
    descricao: string;
    responsavel: string;
    status: Status;
    criadaEm: string;
}