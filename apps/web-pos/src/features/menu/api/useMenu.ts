import { useQuery } from '@tanstack/react-query';
import { MenuService } from './menuService';

export const useMenu = () => {
    // Cache categories for 24 hours (they rarely change)
    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: MenuService.getCategories,
        staleTime: 1000 * 60 * 60 * 24,
    });

    return {
        categories: categoriesQuery.data || [],
        isLoading: categoriesQuery.isLoading,
        isError: categoriesQuery.isError,
    };
};

export const useProducts = (categoryId?: number, search?: string) => {
    // Cache products based on category and search
    // If search is empty, cache by category for 1 hour
    const productsQuery = useQuery({
        queryKey: ['products', categoryId, search],
        queryFn: () => MenuService.getProducts(categoryId, search),
        staleTime: 1000 * 60 * 60, // 1 hour
        placeholderData: (previousData) => previousData, // Keep showing previous data while fetching new (great for search)
    });

    return {
        products: productsQuery.data || [],
        isLoading: productsQuery.isLoading,
        isError: productsQuery.isError,
    };
};
