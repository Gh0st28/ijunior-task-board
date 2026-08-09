import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'

export async function register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {;
        res.status(400).json({ mensagem: 'Todos os campos são obrigatórios'});
        return;
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        res.status(400).json({ mensagem: 'Email já cadastrado' });
        return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hash }
    });
    res.status(201).json({ id: user.id, name: user.name, email: user.email});
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ mensagem: 'Email e senha são obrigatórios'});
        return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({ id: user.id, name: user.name, email: user.email });
}

export async function logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('token');
    res.status(200).json({ mensagem: 'Logout realizado' });
}

export async function me(req: Request, res: Response): Promise<void> {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ mensagem: 'Não autenticado' });
        return;
    }

    const user = await prisma.user.findUnique({ where: { id:userId } });
    if (!user) {
        res.status(404).json({ mensagem: 'Usuário não encontrado' });
        return;
    }
    res.status(200).json({ id: user.id, name: user.name, email: user.email });
}