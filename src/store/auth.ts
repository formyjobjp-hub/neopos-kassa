import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (pin: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: async (pin: string) => {
        if (pin === '5460') {
            set({
                isAuthenticated: true,
                user: { id: 1, first_name: 'Waiter', role: 'Kassir' }
            });
            localStorage.setItem('isAuthenticated', 'true');
            return true;
        }
        return false;
    },
    logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('isAuthenticated');
    }
}));
