import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit() {
        try {
            await api.post('/auth/register', { name, email, password })
            navigate('/login')
        } catch {
            setError('Erro ao criar conta. Tente outro email')
        }
    }

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
            <div className="bg-zinc-800 tounded-xl p-8 flex flex-col gap-4 w-full max-w-sm shadow-lg">
                <h1 className="text-white text-2xl font-bold text-center">Criar conta</h1>

                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
                    onClick={handleSubmit}
                >
                    Registrar
                </button>

                <p className="text-zinc-400 text-sm text-center">
                    Já tem conte?{' '}
                    <Link to='/login' className="text-blue-400 hover:text-blue-300">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    )
}