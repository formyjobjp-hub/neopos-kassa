import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserRole } from '../types';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,

            login: async (pin: string) => {
                // Mock login - Replace with real API call
                const mockUsers: Record<string, User> = {
                    '5460': {
                        id: 1,
                        first_name: 'Kassir',
                        last_name: 'User',
                        role: 'cashier',
                        permissions: ['checkout', 'view_orders']
                    },
                    '1234': {
                        id: 2,
                        first_name: 'Ofitsiant',
                        last_name: 'User',
                        role: 'waiter',
                        permissions: ['take_orders', 'view_menu']
                    },
                    '9999': {
                        id: 3,
                        first_name: 'Admin',
                        last_name: 'User',
                        role: 'admin',
                        permissions: ['*'] // All permissions
                    },
                    '7777': {
                        id: 4,
                        first_name: 'Oshpaz',
                        last_name: 'User',
                        role: 'chef',
                        permissions: ['view_kitchen', 'update_order_status']
                    },
                };

                const user = mockUsers[pin];
                if (user) {
                    set({
                        isAuthenticated: true,
                        user,
                    });
                    localStorage.setItem('auth_token', `mock_token_${user.id}`);
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
