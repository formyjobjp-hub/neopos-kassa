export interface Table {
    id: string;
    number: string;
    status: 'empty' | 'waiting' | 'occupied';
    price?: number;
}
