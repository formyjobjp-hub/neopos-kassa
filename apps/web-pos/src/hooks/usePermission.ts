import { useAuthStore } from '@/features/auth';
import { UserRole } from '@/features/auth/types';

/**
 * Hook to check if current user has a specific role
 */
export const usePermission = (requiredRole?: UserRole) => {
    const { user, hasRole } = useAuthStore();

    if (!requiredRole) {
        return { hasAccess: !!user, user };
    }

    return {
        hasAccess: hasRole(requiredRole),
        user,
    };
};

/**
 * Hook to check if current user has a specific permission
 */
export const useHasPermission = (permission: string) => {
    const { hasPermission } = useAuthStore();
    return hasPermission(permission);
};
