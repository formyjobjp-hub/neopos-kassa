import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Soup, Pizza, GlassWater, IceCream, Coffee, LucideIcon
} from 'lucide-react';
import { useMenu } from '@/features/menu/api/useMenu';
import { Category } from '../types';

interface CategorySidebarProps {
    activeCat: number;
    setActiveCat: (id: number) => void;
}

const iconMap: Record<string, LucideIcon> = {
    'Soup': Soup,
    'Pizza': Pizza,
    'GlassWater': GlassWater,
    'IceCream': IceCream,
    'Coffee': Coffee
};

export const CategorySidebar = ({ activeCat, setActiveCat }: CategorySidebarProps) => {
    const { t } = useTranslation('common');
    const { categories, isLoading } = useMenu();

    if (isLoading) {
        return (
            <aside className="w-[200px] border-r border-gray-100 flex flex-col bg-surface overflow-y-auto shrink-0 relative z-sidebar p-4 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-[120px] bg-gray-100 animate-pulse rounded-2xl"></div>
                ))}
            </aside>
        );
    }

    return (
        <aside className="w-[200px] border-r border-gray-100 flex flex-col bg-surface overflow-y-auto shrink-0 relative z-sidebar">
            {categories.map(cat => {
                const Icon = iconMap[cat.iconType] || Soup;
                return (
                    <div
                        key={cat.id}
                        onClick={() => setActiveCat(cat.id)}
                        className={`
                        flex flex-col items-center justify-center p-card cursor-pointer border-b border-gray-100 transition-all border-l-4 h-[120px]
                        ${activeCat === cat.id
                                ? 'bg-white border-l-brand text-brand shadow-sm'
                                : 'bg-surface-gray-bg/50 border-l-transparent text-gray-400 hover:bg-white hover:text-gray-600'
                            }
                    `}
                    >
                        <Icon className="w-8 h-8 mb-3" />
                        <span className="text-label uppercase tracking-widest text-center leading-relaxed">{t(cat.name)}</span>
                    </div>
                );
            })}
        </aside>
    );
};
