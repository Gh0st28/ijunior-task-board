/// <reference lib="esnext" />

export interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    created_at: string;
}

export interface CreateClientData {
    name: string;
    phone: string;
    email: string;
}