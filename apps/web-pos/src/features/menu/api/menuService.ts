import { Product, Category } from '@/features/menu/types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/services/mockData';
import { APP_CONFIG } from '@/config/constants';
import { apiClient } from '@/services/api';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MenuService = {
    async getCategories(): Promise<Category[]> {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(300);
            return MOCK_CATEGORIES;
        }
        const { data } = await apiClient.get<Category[]>('/categories');
        return data;
    },

    async getProducts(categoryId?: number, search?: string): Promise<Product[]> {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(500);

            let filtered = [...MOCK_PRODUCTS];

            if (categoryId) {
                filtered = filtered.filter(p => p.category === categoryId);
            }

            if (search) {
                const lowerSearch = search.toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerSearch));
            }

            return filtered;
        }

        // Real API call
        const params = new URLSearchParams();
        if (categoryId) params.append('category', categoryId.toString());
        if (search) params.append('search', search);

        const { data } = await apiClient.get<Product[]>(`/products?${params.toString()}`);
        return data;
    }
};
