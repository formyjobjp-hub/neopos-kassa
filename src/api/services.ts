import apiClient from './client';
import { Product, Table } from '../types';

// --- Menu Service ---
export const MenuService = {
    fetchCategories: async () => {
        const { data } = await apiClient.get('/product-categories');
        return data;
    },
    fetchProducts: async (categoryId?: number) => {
        const params = categoryId ? { category_id: categoryId } : {};
        const { data } = await apiClient.get('/products', { params });
        return data;
    }
};

// --- Kitchen Service ---
export const KitchenService = {
    sendToKitchen: async (orderData: any) => {
        const { data } = await apiClient.post('/kitchen/orders', orderData);
        return data;
    },
    statusCheck: async (orderId: string) => {
        const { data } = await apiClient.get(`/kitchen/orders/${orderId}/status`);
        return data;
    }
};

// --- Reservation Service ---
export const ResService = {
    getHalls: async () => {
        const { data } = await apiClient.get('/halls');
        return data;
    },
    getTables: async (hallId: string) => {
        const { data } = await apiClient.get(`/halls/${hallId}/tables`);
        return data;
    },
    updateTable: async (tableId: string, status: string) => {
        const { data } = await apiClient.patch(`/tables/${tableId}`, { status });
        return data;
    }
};
