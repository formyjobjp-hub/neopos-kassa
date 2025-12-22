import { Product, Category } from '@/features/menu/types';
import { Table } from '@/features/tables/types';
import { User } from '@/features/auth/types';

export interface PaymentMethodData {
    id: string;
    nameKey: string; // Translation key
    iconType: 'Banknote' | 'CreditCard' | 'Smartphone' | 'SmartphoneNfc';
}

export const MOCK_USERS: Record<string, User> = {
    '5460': { id: 1, first_name: 'Kassir', last_name: 'User', role: 'cashier', permissions: ['checkout', 'view_orders'] },
    '1234': { id: 2, first_name: 'Ofitsiant', last_name: 'User', role: 'waiter', permissions: ['take_orders', 'view_menu'] },
    '9999': { id: 3, first_name: 'Admin', last_name: 'User', role: 'admin', permissions: ['*'] },
    '7777': { id: 4, first_name: 'Oshpaz', last_name: 'User', role: 'chef', permissions: ['view_kitchen', 'update_order_status'] },
};

export const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: 'menu.categoryItems.firstMeals', iconType: 'Soup' },
    { id: 2, name: 'menu.categoryItems.secondMeals', iconType: 'Pizza' },
    { id: 3, name: 'menu.categoryItems.drinks', iconType: 'GlassWater' },
    { id: 4, name: 'menu.categoryItems.desserts', iconType: 'IceCream' },
    { id: 5, name: 'menu.categoryItems.coffee', iconType: 'Coffee' }
];

export const MOCK_PRODUCTS: Product[] = [
    { id: 101, name: 'Coca Cola 0.5L', price: 12000, category: 3, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop' },
    { id: 102, name: 'Ice Tea Lemon', price: 40000, category: 3, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop' },
    { id: 103, name: 'Margherita Pizza', price: 85000, category: 2, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&auto=format&fit=crop' },
    { id: 104, name: 'Lentil Soup', price: 25000, category: 1, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop' },
    { id: 105, name: 'Cheesecake', price: 45000, category: 4, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=400&auto=format&fit=crop' },
    { id: 106, name: 'Cappuccino', price: 28000, category: 5, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&auto=format&fit=crop' },
    { id: 107, name: 'Fanta 0.5L', price: 12000, category: 3, image: 'https://images.unsplash.com/photo-1624517452488-04867289c2ca?q=80&w=400&auto=format&fit=crop' },
    { id: 108, name: 'Plov Special', price: 65000, category: 2, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400&auto=format&fit=crop' },
];

export const MOCK_TABLES: Table[] = [
    // Zone B - 4 seats
    { id: 1, name: 'B-01', status: 'available', seats: 4, type: 'standard', zone: 'B' },
    { id: 2, name: 'B-02', status: 'occupied', seats: 4, type: 'standard', zone: 'B', price: 120000, time: '12:30' },
    { id: 3, name: 'B-03', status: 'reserved', seats: 4, type: 'standard', zone: 'B' },
    { id: 4, name: 'B-04', status: 'available', seats: 4, type: 'standard', zone: 'B' },
    { id: 5, name: 'B-05', status: 'available', seats: 4, type: 'standard', zone: 'B' },
    { id: 6, name: 'B-06', status: 'occupied', seats: 4, type: 'standard', zone: 'B', price: 85000, time: '13:45' },

    // Zone C - 4 seats
    { id: 7, name: 'C-01', status: 'available', seats: 4, type: 'standard', zone: 'C' },
    { id: 8, name: 'C-02', status: 'available', seats: 4, type: 'standard', zone: 'C' },
    { id: 9, name: 'C-03', status: 'occupied', seats: 4, type: 'standard', zone: 'C', price: 45000 },

    // Zone M - 6 seats
    { id: 10, name: 'M-01', status: 'available', seats: 6, type: 'booth', zone: 'M' },
    { id: 11, name: 'M-02', status: 'occupied', seats: 6, type: 'booth', zone: 'M', price: 250000 },
    { id: 12, name: 'M-03', status: 'reserved', seats: 6, type: 'booth', zone: 'M' },

    // Zone VIP - 6 seats
    { id: 13, name: 'V-01', status: 'occupied', seats: 6, type: 'vip', zone: 'VIP', price: 450000 },
    { id: 14, name: 'V-02', status: 'available', seats: 6, type: 'vip', zone: 'VIP' },
];

export const MOCK_PAYMENT_METHODS: PaymentMethodData[] = [
    { id: 'cash', nameKey: 'checkout.cash', iconType: 'Banknote' },
    { id: 'uzcard', nameKey: 'Uzcard', iconType: 'CreditCard' },
    { id: 'humo', nameKey: 'Humo', iconType: 'SmartphoneNfc' },
    { id: 'payme', nameKey: 'Payme/Click', iconType: 'Smartphone' }
];
