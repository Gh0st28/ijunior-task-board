import { Request, Response } from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../services/taskService';

export function index(req: Request, res: Response): void {
    const tasks = getAllTasks();
    res.status(200).json(tasks);
}

export function show(req: Request, res: Response): void {
    const task = getTaskById(String(req.params.id));
    if (!task) {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        return;
    }
    res.status(200).json(task);
}

export function store(req: Request, res: Response): void {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ mensagem: 'O título é obrigatório' });
        return;
    }
    const task = createTask(title);
    res.status(201).json(task);
}

export function update(req: Request, res: Response): void {
    const { title, completed } = req.body;
    const task = updateTask(String(req.params.id), title, completed);
    if (!task) {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        return;
    }
    res.status(200).json(task);
}

export function destroy(req: Request, res: Response): void {
    const deleted = deleteTask(String(req.params.id));
    if (!deleted) {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        return;
    }
    res.status(204).send();
}