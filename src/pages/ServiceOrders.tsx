import { useState, useEffect } from 'react'
import { Client, ServiceOrder, CreateServiceOrderData } from '../types/index'
import { getAllServiceOrder, createServiceOrder, deleteServiceOrder } from '../services/serviceOrderService'
import { getAllClients } from '../services/clientService'
import React from 'react'

export default function ServiceOrders() {
    const [orders, setOrders] = useState<ServiceOrder[]>([])
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [clientId, setClientId] = useState('')
    const [device, setDevice] = useState('')
    const [issue, setIssue] = useState('')
    const [status, setStatus] = useState<'open' | 'in_progress' | 'done'>('open')

    useEffect(() => {
        fetchAll()
    }, [])

    async function fetchAll() {
        try {
            setLoading(true)
            const [ordersData, clientsData] = await Promise.all([
                getAllServiceOrder(),
                getAllClients()
            ])
            setOrders(ordersData)
            setClients(clientsData)
            if (clientsData.length > 0) {
                setClientId(String(clientsData[0].id))
            }
        } catch (error) {
            console.error('Erro encontrado ao buscar dados: ', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleCreate() {
        if (!device || !issue || !clientId) {
            alert('Todos os campos são obrigatórios')
            return
        }

        const data: CreateServiceOrderData = { clientId: Number(clientId), device, issue, status }

        try {
            await createServiceOrder(data)
            setDevice('')
            setIssue('')
            setStatus('open')
            fetchAll()
        } catch (error) {
            console.error('Erro encontrado ao criar ordem', error)
        }
    }

    async function handleDelete(id: number) {
        try {
            await deleteServiceOrder(id)
            fetchAll()
        } catch (error) {
            console.error('Erro encontrado ao deletar ordem', error)
        }
    }

    function clientName(id: number): string {
        const client = clients.find((c) => c.id === id)
        if (client) return client.name
        return "Cliente não reconhecido"
    }
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-white text-xl font-semibold">Ordens de serviço</h2>
            <div className="bg-zinc-800 flex flex-col gap-4 rounded-xl p-6">
                <h3 className="text-white font-semibold">Nova ordem</h3>
                <select
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                >
                    <option value="">Selecione um cliente</option>
                    {clients.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400"
                    placeholder="Aparelho *"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                />
                <textarea
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 placeholder-zinc-400 resize-none"
                    placeholder="Problema *"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                />
                <select
                    className="bg-zinc-700 text-white text-sm rounded-lg px-3 py-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'done')}
                >
                    <option value='open'>Aberto</option>
                    <option value='in_progress'>Em andamento</option>
                    <option value='done'>Conluído</option>
                </select>
                <button
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors self-end"
                    onClick={handleCreate}
                >
                    Registrar ordem
                </button>
            </div>

            {loading ? (
                <p className="text-zinc-400 text-center">Carregando ordens...</p>
            ) : orders.length === 0 ? (
                <p className="text-zinc-500 text-center">Nenhuma ordem registrada</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-zinc-600 rounded-xl p-4 flex justify-between items-start gap-4"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-white font-semibold">{order.device}</span>
                                <span className="text-zinc-400 text-sm">{order.issue}</span>
                                <span className="text-zinc-500 text-xs">Cliente: {clientName(order.client_id)}</span>
                                <span className={`text-xs px-2 py-1 rounded-full text-white w-fit ${
                                    order.status === 'done' ? 'bg-green-500' :
                                    order.status === 'in_progress' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <button
                                className="bg-red-500 hover:bg-red-500 text-white text-sm rounded-lg px-3 py-2 transition-colors flex-shrink-0"
                                onClick={() => handleDelete(order.id)}
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