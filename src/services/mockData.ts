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
    { id: 1, name: 'T-01', status: 'available', seats: 4, type: 'standard' },
    { id: 2, name: 'T-02', status: 'occupied', seats: 6, type: 'booth', price: 150000, time: '12:30' },
    { id: 3, name: 'T-03', status: 'reserved', seats: 2, type: 'standard' },
    { id: 4, name: 'T-04', status: 'available', seats: 8, type: 'vip' },
    { id: 5, name: 'T-05', status: 'available', seats: 4, type: 'standard' },
    { id: 6, name: 'T-06', status: 'occupied', seats: 4, type: 'standard', price: 85000, time: '13:45' },
];

export const MOCK_PAYMENT_METHODS: PaymentMethodData[] = [
    { id: 'cash', nameKey: 'checkout.cash', iconType: 'Banknote' },
    { id: 'uzcard', nameKey: 'Uzcard', iconType: 'CreditCard' },
    { id: 'humo', nameKey: 'Humo', iconType: 'SmartphoneNfc' },
    { id: 'payme', nameKey: 'Payme/Click', iconType: 'Smartphone' }
];
