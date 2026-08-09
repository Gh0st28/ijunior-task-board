import { Request, Response } from "express";
import { getAllClients, getClientById, createClient, deleteClient } from "../services/clientService";

export async function index(req: Request, res:Response): Promise<void> {
    const clients = await getAllClients();
    res.status(200).json(clients);
}

export async function show(req: Request, res:Response): Promise<void> {
    const id = Number(req.params.id);
    const client = await getClientById(id);
    if (!client) {
        res.status(404).json({ mensagem: 'Cliente não encontrado' });
    } else {
        res.status(200).json(client);
    }
}

export async function store(req:Request, res:Response): Promise<void> {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email ) {
        res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        return;
    }

    const client = await createClient({ name, phone, email });
    res.status(201).json(client);
}

export async function destroy(req: Request, res:Response): Promise<void> {
    const id = Number(req.params.id);
    try {
        await deleteClient(id);
        res.status(204).send();
    } catch {
        res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
}