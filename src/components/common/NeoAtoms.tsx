import React, { ReactNode } from 'react';

// 1. PageContainer: Ekranni to'liq egallaydi va scrollingni boshqaradi
export const PageContainer = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <div className={`w-full h-full flex flex-col overflow-hidden bg-surface-light ${className}`}>
        {children}
    </div>
);

// 2. ContentGrid: Responsive Grid (POS mantig'ida)
export const ContentGrid = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <div className={`grid gap-4 
        grid-cols-2
        tablet:grid-cols-3
        laptop:grid-cols-4
        desktop:grid-cols-5
        fhd:grid-cols-6
        ${className}`}
    >
        {children}
    </div>
);

// 3. FluidPanel: Yon panel yoki Asosiy kontent (Flex-1)
export const FluidPanel = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <div className={`flex-1 flex flex-col overflow-hidden relative ${className}`}>
        {children}
    </div>
);
