import React from 'react';
import {
    Soup, Pizza, GlassWater, IceCream, Coffee
} from 'lucide-react';

interface CategorySidebarProps {
    activeCat: number;
    setActiveCat: (id: number) => void;
}

export const CategorySidebar = ({ activeCat, setActiveCat }: CategorySidebarProps) => {
    const categories = [
        { id: 1, name: 'First Meals', icon: Soup },
        { id: 2, name: 'Second Meals', icon: Pizza },
        { id: 3, name: 'Drinks', icon: GlassWater },
        { id: 4, name: 'Desserts', icon: IceCream },
        { id: 5, name: 'Coffee', icon: Coffee }
    ];

    return (
        <aside className="w-[200px] border-r border-gray-100 flex flex-col bg-surface overflow-y-auto shrink-0 relative z-20">
            {categories.map(cat => (
                <div
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className={`
                        flex flex-col items-center justify-center p-6 cursor-pointer border-b border-gray-100 transition-all border-l-4 h-[120px]
                        ${activeCat === cat.id
                            ? 'bg-white border-l-brand text-brand shadow-sm'
                            : 'bg-surface-gray-bg/50 border-l-transparent text-gray-400 hover:bg-white hover:text-gray-600'
                        }
                    `}
                >
                    <cat.icon className="w-8 h-8 mb-3" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-center leading-relaxed">{cat.name}</span>
                </div>
            ))}
        </aside>
    );
};
