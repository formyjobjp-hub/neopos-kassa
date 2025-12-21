export type UserRole = 'admin' | 'cashier' | 'waiter' | 'chef';

export interface User {
    id: number;
    first_name: string;
    last_name?: string;
    role: UserRole;
    permissions?: string[];
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (pin: string) => Promise<boolean>;
    logout: () => void;
    hasRole: (role: UserRole) => boolean;
    hasPermission: (permission: string) => boolean;
}
