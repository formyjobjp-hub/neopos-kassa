import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '../types';
import { useTables } from '../api/useTables';

interface TableGridProps {
    activeZone: string;
    onTableClick: (table: Table) => void;
}

const Seat = ({ position }: { position: string }) => (
    <div className={`absolute w-10 h-2.5 bg-[#CBD5E1] rounded-full sm:w-14 sm:h-3.5 ${position}`} />
);

const VerticalSeat = ({ position }: { position: string }) => (
    <div className={`absolute h-10 w-2.5 bg-[#CBD5E1] rounded-full sm:h-14 sm:w-3.5 ${position}`} />
);

const SmallerVerticalSeat = ({ position }: { position: string }) => (
    <div className={`absolute h-8 w-2.5 bg-[#CBD5E1] rounded-full sm:h-12 sm:w-3.5 ${position}`} />
);

export const TableGrid = ({ activeZone, onTableClick }: TableGridProps) => {
    const { t } = useTranslation('hall');
    const { tables, isLoading } = useTables();

    const zoneTables = tables.filter(t => t.zone === activeZone);

    const renderSeats = (capacity: number) => {
        if (capacity === 4) {
            return (
                <>
                    <Seat position="top-3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <Seat position="bottom-3 left-1/2 -translate-x-1/2 translate-y-1/2" />
                    <VerticalSeat position="left-3 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                    <VerticalSeat position="right-3 top-1/2 -translate-y-1/2 translate-x-1/2" />
                </>
            );
        }
        if (capacity === 6) {
            return (
                <>
                    <Seat position="top-3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <Seat position="bottom-3 left-1/2 -translate-x-1/2 translate-y-1/2" />
                    <SmallerVerticalSeat position="left-3 top-[30%] -translate-y-1/2 -translate-x-1/2" />
                    <SmallerVerticalSeat position="left-3 top-[70%] -translate-y-1/2 -translate-x-1/2" />
                    <SmallerVerticalSeat position="right-3 top-[30%] -translate-y-1/2 translate-x-1/2" />
                    <SmallerVerticalSeat position="right-3 top-[70%] -translate-y-1/2 translate-x-1/2" />
                </>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-5 gap-6 p-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="aspect-square bg-gray-50 rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-5 gap-6 p-6">
            {zoneTables.map(table => (
                <div
                    key={table.id}
                    onClick={() => onTableClick(table)}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                    <div className="relative w-full aspect-square flex items-center justify-center p-6">
                        {/* Seating */}
                        {renderSeats(table.capacity)}

                        {/* Table Body */}
                        <div className={`
                            w-full h-full rounded-2xl bg-[#E2E8F0] 
                            flex items-center justify-center shadow-sm relative
                            ${table.status === 'available' ? 'group-hover:border-primary/30' : ''}
                        `}>
                            {/* Status Indicator (Central Circle) */}
                            <div className={`
                                w-11 h-11 rounded-full flex items-center justify-center text-sm font-black
                                ${table.status === 'available' ? 'bg-white text-gray-800' : ''}
                                ${table.status === 'occupied' ? 'bg-red-500 text-white' : ''}
                                ${table.status === 'reserved' ? 'bg-amber-400 text-white' : ''}
                            `}>
                                {table.name}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
