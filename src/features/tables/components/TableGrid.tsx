import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '../types';
import { useTables } from '../api/useTables';

interface TableGridProps {
    activeZone: string;
    onTableClick: (table: Table) => void;
}

// Chair helper component for cleaner code
const Chair = ({ position }: { position: string }) => (
    <div className={`absolute w-3 h-4.5 md:w-4 md:h-5.5 bg-gray-200 rounded-[2px] border border-gray-300/40 ${position}`} />
);

export const TableGrid = ({ activeZone, onTableClick }: TableGridProps) => {
    const { t } = useTranslation('hall');
    const { tables, isLoading } = useTables();

    // Filter tables by active zone
    const zoneTables = tables.filter(t => t.zone === activeZone);

    const renderChairs = (seats: number) => {
        // Simple chair arrangement logic
        if (seats <= 4) {
            return (
                <>
                    <Chair position="-top-3.5 left-1/4 -translate-x-1/2" />
                    <Chair position="-top-3.5 left-3/4 -translate-x-1/2" />
                    <Chair position="-bottom-3.5 left-1/4 -translate-x-1/2" />
                    <Chair position="-bottom-3.5 left-3/4 -translate-x-1/2" />
                </>
            );
        }
        return (
            <>
                <Chair position="-top-3.5 left-[15%]" />
                <Chair position="-top-3.5 left-[50%] -translate-x-1/2" />
                <Chair position="-top-3.5 right-[15%]" />
                <Chair position="-bottom-3.5 left-[15%]" />
                <Chair position="-bottom-3.5 left-[50%] -translate-x-1/2" />
                <Chair position="-bottom-3.5 right-[15%]" />
            </>
        );
    };

    if (isLoading) {
        return (
            <>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square flex items-center justify-center p-6">
                        <div className="w-full h-full bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            {zoneTables.map(table => {
                const isRect = table.seats > 4 || table.type === 'booth';

                return (
                    <div
                        key={table.id}
                        onClick={() => onTableClick(table)}
                        className="group relative aspect-square flex items-center justify-center p-8 cursor-pointer"
                    >
                        {/* Table Body (Schematic Shape) */}
                        <div className={`
                            relative transition-all duration-200 active:scale-95
                            ${isRect ? 'w-full h-1/2' : 'w-3/4 h-3/4'}
                            bg-gray-100 border-2 border-gray-200 rounded-xl
                            group-hover:border-brand/30 shadow-sm
                            flex items-center justify-center
                        `}>
                            {/* Chairs */}
                            {renderChairs(table.seats)}

                            {/* Status Indicator (Central Circle) */}
                            <div className={`
                                w-11 h-11 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-md border-[4px] transition-colors
                                ${table.status === 'available' ? 'bg-white border-gray-200 text-gray-800' : ''}
                                ${table.status === 'occupied' ? 'bg-red-500 border-red-600 text-white' : ''}
                                ${table.status === 'reserved' ? 'bg-amber-400 border-amber-500 text-white' : ''}
                            `}>
                                <span className="text-lg md:text-xl font-black">{table.name}</span>
                                {table.status === 'occupied' && table.price && (
                                    <span className="text-[10px] font-bold opacity-95 leading-none">
                                        {(table.price / 1000).toFixed(0)}k
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
