import 'dotenv/config';
import { app } from './config/expressConfig';

const port = Number(process.env.PORT) || 3030;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido nas variáveis de ambiente')
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definido nas variáveis de ambiente')
}

app.listen(3030, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
})