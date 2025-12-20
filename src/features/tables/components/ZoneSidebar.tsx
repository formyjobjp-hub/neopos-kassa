import React from 'react';
import { APP_CONFIG } from '@/config/constants';

interface ZoneSidebarProps {
    activeZone: string;
    setActiveZone: (zone: string) => void;
}

export const ZoneSidebar = ({ activeZone, setActiveZone }: ZoneSidebarProps) => {
    const zones = APP_CONFIG.TABLES.ZONES;

    return (
        <aside className="w-[100px] border-r border-gray-100 flex flex-col bg-white">
            {zones.map(zone => (
                <button
                    key={zone}
                    onClick={() => setActiveZone(zone)}
                    className={`h-24 flex items-center justify-center font-black text-2xl transition-all border-l-4
          ${activeZone === zone ? 'bg-brand/10 border-brand text-brand' : 'border-transparent text-gray-300 hover:bg-gray-50'}
        `}
                >
                    {zone}
                </button>
            ))}
        </aside>
    );
};
