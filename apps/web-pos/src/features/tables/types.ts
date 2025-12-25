export interface Table {
    id: number;
    name: string;
    status: 'available' | 'occupied' | 'reserved';
    seats: number;
    capacity: number;
    type: 'standard' | 'booth' | 'vip';
    zone: string;
    price?: number;
    time?: string;
    customerName?: string;
    phone?: string;
}
