import {useState, useEffect } from 'react'
import { Client, CreateClientData } from '../types/index'
import { getAllClients, createClient, deleteClient } from '../services/clientService'

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetchClients()
    }, [])

    async function fetchClients() {
        try {
            setLoading(true)
            const data = await getAllClients()
            setClients(data)
        } catch (error) {
            console.error('Erro encontrado ao buscar clientes: ', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleCreate() {
        if(!name || !phone || !email) {
            alert('Todos os campos são obrigatórios')
            return
        }

        const data: CreateClientData = { name, phone, email }

        try {
            await createClient(data)
            setName('')
            setPhone('')
            setEmail('')
            fetchClients()
        } catch (error) {
            console.error('Erro encontrado ao criar cliente: ', error)
        }
    }

    async function handleDelete(id: number) {
        try {
            await deleteClient(id)
            fetchClients()
        } catch (error) {
            console.error('Erro encontrado ao deletar cliente: ', error)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-white text-xl font-semibold">Clientes</h2>
            <div className="bg-zinc-800 rounded-xl p-6 flex flex-col gap-4">
                <h3 className="text-white font-semibold">Novo cliente</h3>
                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400 flex-1"
                    placeholder="Nome *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400 flex-1"
                    placeholder="Telefone *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400 flex-1"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors self-end"
                    onClick={handleCreate}
                >
                    Cadastrar
                </button>
            </div>

            {loading ? (
                <p className="text-zinc-400 text-center">Carregando clientes...</p>
            ) : clients.length === 0 ? (
                <p className="text-zinc-500 text-center">Nenhum cliente cadastrado</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="bg-zinc-800 rounded-xl p-4 flex justify-between items-center"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-white font-semibold">{client.name}</span>
                                <span className="text-zinc-400 text=sm">{client.email}</span>
                                <span className="text-zinc-500 text-xs">{client.phone}</span>
                            </div>
                            <button
                                className="bg-red-600 hover:bg-red-500 text-white text-sm rouded-lg px-3 py-2 transition-colors"
                                onClick={() => handleDelete(client.id)}
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}