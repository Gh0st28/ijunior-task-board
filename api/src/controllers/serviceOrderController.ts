import { Request, Response } from "express";
import { getAllServiceOrders, getServiceOrderById, createServiceOrder, deleteServiceOrder } from "../services/serviceOrderService";

export async function index(req: Request, res: Response): Promise<void> {
  const orders = await getAllServiceOrders();
  res.status(200).json(orders);
}

export async function show(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const order = await getServiceOrderById(id);

  if (!order) {
    res.status(404).json({ mensagem: 'Ordem não encontrada' });
  } else {
    res.status(200).json(order);
  }
}

export async function store(req: Request, res: Response): Promise<void> {
  const { device, issue, status, clientId } = req.body;
  if (!device || !issue || !clientId) {
    res.status(400).json({ mensagem: 'Campos obrigatórios faltando' });
    return;
  }
  const userId = req.userId!;
  const order = await createServiceOrder({
    device,
    issue,
    status: status ?? 'open',
    clientId: Number(clientId),
    userId,
  })
  res.status(201).json(order);
}

export async function destroy(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  try {
    await deleteServiceOrder(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ mensagem: 'Ordem não encontrada' });
  }
}