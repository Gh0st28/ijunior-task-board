import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

interface JwtPayLoad {
    id: number;
    email: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ mensagem: 'Não autenticado' });
        return;
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayLoad;
        ;req.userId = payload.id;
        next();
    } catch {
        res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
}