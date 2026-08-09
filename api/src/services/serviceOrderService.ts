import { prisma } from '../config/prismaClient'

export async function getAllServiceOrders() {
    return prisma.serviceOrder.findMany({
        include: { client: true }
    })
}

export async function getServiceOrderById(id: number) {
    return prisma.serviceOrder.findUnique({
        where: { id },
        include: { client: true }
    })
}

export async function createServiceOrder(data: {
    device: string
    issue: string
    status: string
    clientId: number
    userId: number
}) {
    return prisma.serviceOrder.create({ data })
}

export async function deleteServiceOrder(id: number) {
    return prisma.serviceOrder.delete({ where: { id } })
}