import React from 'react';
import { APP_CONFIG } from '@/config/constants';

interface ZoneSidebarProps {
    activeZone: string;
    setActiveZone: (zone: string) => void;
}

export const ZoneSidebar = ({ activeZone, setActiveZone }: ZoneSidebarProps) => {
    const zones = APP_CONFIG.TABLES.ZONES;

    return (
        <aside className="w-full md:w-[100px] border-b md:border-b-0 md:border-r border-gray-100 flex flex-row md:flex-col bg-white overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
            {zones.map(zone => (
                <button
                    key={zone}
                    onClick={() => setActiveZone(zone)}
                    className={`h-16 md:h-24 min-w-[80px] md:min-w-0 flex items-center justify-center font-black text-xl md:text-2xl transition-all border-b-4 md:border-b-0 md:border-l-4
          ${activeZone === zone ? 'bg-brand/10 border-brand text-brand' : 'border-transparent text-gray-300 hover:bg-gray-50'}
        `}
                >
                    {zone}
                </button>
            ))}
        </aside>
    );
};
