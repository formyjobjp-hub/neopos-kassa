import { MOCK_PAYMENT_METHODS } from '@/services/mockData';
import { PaymentMethodData } from '@/services/mockData';
import { APP_CONFIG } from '@/config/constants';
import { apiClient } from '@/services/api';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CheckoutService = {
    getPaymentMethods: async (): Promise<PaymentMethodData[]> => {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(300);
            return MOCK_PAYMENT_METHODS;
        }
        const { data } = await apiClient.get<PaymentMethodData[]>('/payment-methods');
        return data;
    },

    processPayment: async (orderId: string, paymentData: any): Promise<{ success: boolean; transactionId: string }> => {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(1500);
            return {
                success: true,
                transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`
            };
        }
        const { data } = await apiClient.post('/payments/process', { orderId, ...paymentData });
        return data;
    }
};
