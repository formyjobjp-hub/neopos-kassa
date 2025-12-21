import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes (Data is considered fresh for 10 mins)
            gcTime: 1000 * 60 * 30, // 30 minutes (Unused data is kept in cache for 30 mins)
            refetchOnWindowFocus: false, // Don't refetch on window focus to avoid screen flickering
            retry: 1, // Retry failed requests once
        },
    },
});
