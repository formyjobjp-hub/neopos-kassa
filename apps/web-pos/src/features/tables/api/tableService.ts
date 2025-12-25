import { MOCK_TABLES } from '@/services/mockData';
import { Table } from '../types';
import { APP_CONFIG } from '@/config/constants';
import { apiClient } from '@/services/api';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const TableService = {
    getAll: async (): Promise<Table[]> => {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(300); // Simulate network latency
            return MOCK_TABLES;
        }
        const { data } = await apiClient.get<Table[]>('/tables');
        return data;
    },

    async getById(id: number): Promise<Table | undefined> {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(200);
            return MOCK_TABLES.find(t => t.id === id);
        }
        const { data } = await apiClient.get<Table>(`/tables/${id}`);
        return data;
    },

    async updateStatus(id: number, status: 'available' | 'occupied' | 'reserved'): Promise<Table> {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(500); // Simulate latency to prove optimistic update works
            const table = MOCK_TABLES.find(t => t.id === id);
            if (table) {
                table.status = status;
                return { ...table };
            }
            throw new Error('Table not found');
        }
        const { data } = await apiClient.patch<Table>(`/tables/${id}/status`, { status });
        return data;
    }
};
