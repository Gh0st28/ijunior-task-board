import { prisma } from '../config/prismaClient'

export async function getAll() {
  return prisma.task.findMany();
}

export async function getById(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function createTask(title: string) {
  return prisma.task.create({
    data: { title },
  });
}

export async function updateTask(id: number, title?: string, completed?: boolean) {
  return prisma.task.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    },
  });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}