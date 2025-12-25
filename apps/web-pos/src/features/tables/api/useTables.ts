import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TableService } from './tableService';
import { Table } from '../types';

export const useTables = () => {
    const queryClient = useQueryClient();

    // Cache tables for 1 minute (status changes frequently)
    const tablesQuery = useQuery({
        queryKey: ['tables'],
        queryFn: TableService.getAll,
        staleTime: 1000 * 60 * 1, // 1 minute
        refetchInterval: 1000 * 30, // Auto-refetch every 30 seconds
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number, status: 'available' | 'occupied' | 'reserved' }) =>
            TableService.updateStatus(id, status),

        // Optimistic Update
        onMutate: async ({ id, status }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['tables'] });

            // Snapshot previous value
            const previousTables = queryClient.getQueryData<Table[]>(['tables']);

            // Optimistically update to new value
            queryClient.setQueryData<Table[]>(['tables'], (old) =>
                old ? old.map(t => t.id === id ? { ...t, status } : t) : []
            );

            return { previousTables };
        },

        // If error, rollback
        onError: (err, newTodo, context) => {
            if (context?.previousTables) {
                queryClient.setQueryData<Table[]>(['tables'], context.previousTables);
            }
        },

        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tables'] });
        },
    });

    return {
        tables: tablesQuery.data || [],
        isLoading: tablesQuery.isLoading,
        isError: tablesQuery.isError,
        updateStatus: updateStatusMutation.mutateAsync
    };
};
