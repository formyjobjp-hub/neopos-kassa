export type Role = 'WAITER' | 'CASHIER' | 'KITCHEN' | 'ADMIN';

export interface User {
    id: number;
    name: string;
    role: Role;
    branchId: number;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
}
