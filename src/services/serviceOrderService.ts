import { api } from './api';
import { ServiceOrder, CreateServiceOrderData } from '../types/index';

export async function getAllServiceOrder(): Promise<ServiceOrder[]> {
    const response = await api.get<ServiceOrder[]>('/service-orders');
    return response.data;
}

export async function createServiceOrder(data: CreateServiceOrderData): Promise<ServiceOrder> {
    const response = await api.post<ServiceOrder>('/service-orders', data);
    return response.data;
}

export async function deleteServiceOrder(id: number): Promise<void> {
    await api.delete(` /service-orders/${id} `);
}