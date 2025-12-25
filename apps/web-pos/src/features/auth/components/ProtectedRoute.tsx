import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../model/authStore';
import { UserRole } from '../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
    requiredPermission
}) => {
    const { isAuthenticated, hasRole, hasPermission } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check role if specified
    if (requiredRole && !hasRole(requiredRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Check permission if specified
    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};
