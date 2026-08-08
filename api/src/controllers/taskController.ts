import { Request, Response } from 'express';
import { getAll, getById, createTask, updateTask, deleteTask } from '../services/taskService';

export async function index(req: Request, res: Response): Promise<void> {
    const tasks = await getAll();
    res.status(200).json(tasks);
}

export async function show(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const task = await getById(id);
    if (!task) {
        res.status(404).json({mensagem: 'Tarefa não encontrada' });
    } else {
        res.status(200).json(task);
    }
}

export async function store(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ mensagem: 'O título é obrigatório' });
        return;
    }
    const task = await createTask(title);
    res.status(201).json(task);
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { title, completed } = req.body;
    try {
        const task = await updateTask(id, title, completed);
        res.status(200).json(task);
    } catch {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
}

export async function destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
        await deleteTask(id);
        res.status(204).send();
    } catch {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
}