export interface Table {
    id: number;
    name: string;
    status: 'available' | 'occupied' | 'reserved';
    seats: number;
    type: 'standard' | 'booth' | 'vip';
    price?: number;
    time?: string;
}
