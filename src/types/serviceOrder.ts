export type ServiceOrderStatus = 'open' | 'in_process' | 'done';

export interface ServiceOrder {
    id: number;
    client_id: number;
    device: string;
    issue: string;
    status: ServiceOrderStatus;
    created_at: string;
}

export interface CreateServiceOrderData {
    client_id: number;
    device: string;
    issue: string;
    status: ServiceOrderStatus;
}