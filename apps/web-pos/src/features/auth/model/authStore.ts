import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserRole } from '../types';
import { AuthService } from '../api/authService';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,

            login: async (pin: string) => {
                const { success, user, token } = await AuthService.login(pin);

                if (success && user && token) {
                    set({
                        isAuthenticated: true,
                        user,
                    });
                    localStorage.setItem('auth_token', token);
                    return true;
                }
                return false;
            },

            logout: () => {
                set({ isAuthenticated: false, user: null });
                localStorage.removeItem('auth_token');
            },

            hasRole: (role: UserRole) => {
                const { user } = get();
                return user?.role === role || user?.role === 'admin';
            },

            hasPermission: (permission: string) => {
                const { user } = get();
                if (!user) return false;
                if (user.role === 'admin') return true;
                return user.permissions?.includes(permission) || false;
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
            }),
        }
    )
);
