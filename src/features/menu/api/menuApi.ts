import { apiClient } from '@/services/api';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
}

export interface Category {
    id: number;
    name: string;
    icon?: string;
}

export const menuApi = {
    // Get all products
    getProducts: async (): Promise<Product[]> => {
        try {
            const { data } = await apiClient.get<Product[]>('/products');
            return data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            // Return mock data for now
            return [];
        }
    },

    // Get all categories
    getCategories: async (): Promise<Category[]> => {
        try {
            const { data } = await apiClient.get<Category[]>('/categories');
            return data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            // Return mock data for now
            return [
                { id: 1, name: 'Burgers' },
                { id: 2, name: 'Pizza' },
                { id: 3, name: 'Drinks' },
                { id: 4, name: 'Desserts' },
            ];
        }
    },

    // Get products by category
    getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
        try {
            const { data } = await apiClient.get<Product[]>(`/products?category=${categoryId}`);
            return data;
        } catch (error) {
            console.error('Failed to fetch products by category:', error);
            return [];
        }
    },
};
