import { APP_CONFIG } from '@/config/constants';
import { apiClient } from '@/services/api';
import { User } from '../types';
import { MOCK_USERS } from '@/services/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthService = {
    login: async (pin: string): Promise<{ success: boolean; user?: User; token?: string }> => {
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(500);
            const user = MOCK_USERS[pin];
            if (user) {
                return { success: true, user, token: `mock_token_${user.id}` };
            }
            return { success: false };
        }

        try {
            const { data } = await apiClient.post('/auth/login', { pin });
            return { success: true, user: data.user, token: data.token };
        } catch (error) {
            return { success: false };
        }
    }
};
