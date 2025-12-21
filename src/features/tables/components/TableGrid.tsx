import React from 'react';
import { Table } from '../types';
import { Users } from 'lucide-react';
import { useTables } from '../api/useTables';

interface TableGridProps {
    onTableClick: (table: Table) => void;
}

export const TableGrid = ({ onTableClick }: TableGridProps) => {
    const { tables, isLoading } = useTables();

    if (isLoading) {
        return (
            <>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square rounded-[32px] bg-gray-100 animate-pulse"></div>
                ))}
            </>
        );
    }

    return (
        <>
            {tables.map(table => (
                <div
                    key={table.id}
                    onClick={() => onTableClick(table)}
                    className={`
                        aspect-square rounded-[32px] p-6 relative cursor-pointer transition-all active:scale-95 group
                        ${table.status === 'available' ? 'bg-white border-2 border-gray-100 hover:border-brand/50' : ''}
                        ${table.status === 'occupied' ? 'bg-[#1F2937] text-white shadow-xl shadow-gray-900/10' : ''}
                        ${table.status === 'reserved' ? 'bg-orange-50 border-2 border-orange-100' : ''}
                    `}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className={`text-2xl font-black tracking-tight ${table.status === 'available' ? 'text-gray-800' : ''}`}>{table.name}</span>
                        {table.status === 'occupied' && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold opacity-60">
                        <Users className="w-4 h-4" />
                        <span>{table.seats} seats</span>
                    </div>

                    {table.status === 'occupied' && (
                        <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-700/50">
                            <div className="flex justify-between items-end">
                                <span className="text-2xl font-black text-brand tracking-tighter">
                                    {new Intl.NumberFormat('uz-UZ').format(table.price || 0)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};
