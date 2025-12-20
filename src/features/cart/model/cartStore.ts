import { create } from 'zustand';
import { CartItem } from '../types';
import { Product } from '@/features/menu';
import { APP_CONFIG } from '@/config/constants';

interface CartState {
    items: CartItem[];
    selectedTableId: string | null;
    guestCount: number;
    serviceChargeRate: number;

    // Getters as simple functions
    getSubtotal: () => number;
    getServiceCharge: () => number;
    getTotal: () => number;

    // Actions
    setTable: (id: string) => void;
    setGuests: (count: number) => void;
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    selectedTableId: null,
    guestCount: 0,
    serviceChargeRate: APP_CONFIG.TAX.RATE,

    getSubtotal: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    getServiceCharge: () => get().getSubtotal() * get().serviceChargeRate,
    getTotal: () => get().getSubtotal() + get().getServiceCharge(),

    setTable: (id) => set({ selectedTableId: id }),
    setGuests: (count) => set({ guestCount: count }),

    addItem: (product) => {
        const items = get().items;
        const index = items.findIndex(i => i.id === product.id);
        if (index > -1) {
            const newItems = [...items];
            newItems[index].quantity += 1;
            set({ items: newItems });
        } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
        }
    },

    removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),

    updateQuantity: (id, quantity) => {
        const items = get().items.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(0, quantity) };
            }
            return item;
        }).filter(item => item.quantity > 0);
        set({ items });
    },

    clearCart: () => set({ items: [], selectedTableId: null, guestCount: 0 })
}));
