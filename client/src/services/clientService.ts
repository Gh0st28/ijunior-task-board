import { api } from './api';
import { Client, CreateClientData } from '../types/index';

export async function getAllClients(): Promise<Client[]> {
    const response = await api.get<Client []>('/clients');
    return response.data;
}

export async function createClient(data: CreateClientData): Promise<void> {
    await api.post<Client>('/clients', data);
}

export async function deleteClient(id: number): Promise<void> {
    await api.delete(`/clients/${id}` );
}