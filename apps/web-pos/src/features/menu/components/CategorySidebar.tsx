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
    const { t } = useTranslation('menu');
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
        <aside className="w-full md:w-[200px] border-b md:border-b-0 md:border-r border-gray-100 flex flex-row md:flex-col bg-surface overflow-x-auto md:overflow-y-auto shrink-0 relative z-sidebar no-scrollbar">
            {categories.map(cat => {
                const Icon = iconMap[cat.iconType] || Soup;
                return (
                    <div
                        key={cat.id}
                        onClick={() => setActiveCat(cat.id)}
                        className={`
                        flex flex-col items-center justify-center p-card cursor-pointer transition-all h-[90px] min-w-[100px] md:h-[120px] md:w-full md:min-w-0
                        border-b-4 md:border-b-0 md:border-l-4 border-transparent
                        ${activeCat === cat.id
                                ? 'bg-white border-b-brand md:border-l-brand text-brand shadow-sm'
                                : 'bg-surface-gray-bg/50 text-gray-400 hover:bg-white hover:text-gray-600'
                            }
                    `}
                    >
                        <Icon className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3" />
                        <span className="text-[10px] md:text-label uppercase tracking-widest text-center leading-relaxed font-bold">{t(cat.name)}</span>
                    </div>
                );
            })}
        </aside>
    );
};
