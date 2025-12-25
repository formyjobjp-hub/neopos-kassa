import { useQuery, useMutation } from '@tanstack/react-query';
import { CheckoutService } from './checkoutService';

export const useCheckout = () => {
    const methodsQuery = useQuery({
        queryKey: ['payment-methods'],
        queryFn: CheckoutService.getPaymentMethods,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const paymentMutation = useMutation({
        mutationFn: (data: { orderId: string, paymentData: any }) =>
            CheckoutService.processPayment(data.orderId, data.paymentData)
    });

    return {
        paymentMethods: methodsQuery.data || [],
        isLoadingMethods: methodsQuery.isLoading,
        processPayment: paymentMutation.mutateAsync,
        isProcessing: paymentMutation.isPending
    };
};
