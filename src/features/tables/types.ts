export interface Table {
    id: number;
    name: string;
    status: 'available' | 'occupied' | 'reserved';
    seats: number;
    type: 'standard' | 'booth' | 'vip';
    zone: string;
    price?: number;
    time?: string;
}
