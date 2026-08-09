import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit() {
        try {
            await login(email, password)
            navigate('/')
        } catch {
            setError('Email ou senha inválidos')
        }
    }

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
            <div className="bg-zinc-800 rounded-xl p-8 flex flex-col gap-4 w-full max-w-sm shadow-lg">
                <h1 className="text-white text-2xl font-bold text-center">iTask Board</h1>
                <p className="text-zinc-400 text-sm text-center">Faça login para continuar</p>

                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

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
                    Entrar    
                </button>

                <p className="text-zinc-400 text-sm text-center">
                    Não tem conta?{' '}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300">
                        Criar conta
                    </Link>
                </p>                
            </div>
        </div>
    )
}