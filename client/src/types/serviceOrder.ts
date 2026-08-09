export type ServiceOrderStatus = 'open' | 'in_progress' | 'done';

export interface ServiceOrder {
    id: number;
    clientId: number;
    device: string;
    issue: string;
    status: ServiceOrderStatus;
    createdAt: string;
}

export interface CreateServiceOrderData {
    clientId: number;
    device: string;
    issue: string;
    status: ServiceOrderStatus;
}