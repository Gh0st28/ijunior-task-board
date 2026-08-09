import 'dotenv/config';
import express from 'express';
import { app } from './config/expressConfig';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido nas variáveis de ambiente')
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definido nas variáveis de ambiente')
}

app.listen(3030, () => {
  console.log('🚀 Servidor rodando na porta 3030');
});