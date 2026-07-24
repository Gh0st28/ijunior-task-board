import { useState, useEffect } from 'react'
import { ServiceOrder } from '../types/index'
import { getAllServiceOrder } from '../services/serviceOrderService'
import React from 'react'

export default function Dashboard() {
    const [orders, setOrders] = useState<ServiceOrder[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getAllServiceOrder()
                setOrders(data)
            } catch (error) {
                console.error('Erro encontrado ao buscar ordens:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if(loading) {
        return (<p className="text-zinc-400 text-center mt-8">Carregando ordens...</p>)
    }
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-white text-xl font-semibold">Dashboard</h2>
            {orders.length === 0 ? (
                <p className="text-zinc-500 text-center text-sm">Nenhuma ordem encontrada</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-zinc-800 rouded-xl p-4 flex flex-col gap-2 shadow-md">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-semibold">{order.device}</span>
                                <span className={`text-xs px-2 py-1 rounded-full text-white ${
                                    order.status === 'done' ? 'bg-green-500' :
                                    order.status === 'in_progress' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm">{order.issue}</p>
                            <p className="text-zinc-500 text-xs">Data: {order.created_at}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}