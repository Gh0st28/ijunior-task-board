import { prisma } from '../config/prismaClient'

export async function getAllClients() {
    return prisma.client.findMany();
}

export async function getClientById(id: number) {
    return prisma.client.findUnique({ where: { id } });
}

export async function createClient(data: { name: string; phone: string; email: string }) {
  return prisma.client.create({ data });
}

export async function deleteClient(id: number) {
    return prisma.client.delete({ where: { id } });
}