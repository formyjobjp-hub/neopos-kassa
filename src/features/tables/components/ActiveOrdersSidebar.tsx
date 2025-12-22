import React from 'react';
import { PencilLine, Trash2, Clock } from 'lucide-react';
import { useTables } from '../api/useTables';

export const ActiveOrdersSidebar = () => {
    const { tables } = useTables();
    // Filter ONLY reserved tables as requested
    const reservedTables = tables.filter(t => t.status === 'reserved');

    return (
        <div className="w-[260px] bg-[#F1F5F9] flex flex-col h-full shrink-0">
            {/* Sidebar Header */}
            <div className="p-4 pb-4">
                <h3 className="text-[18px] font-semibold text-[#1E293B]">
                    Bron qilingan stollar
                </h3>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
                {reservedTables.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <Clock className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Hozircha rezervlar yo'q</p>
                    </div>
                ) : (
                    reservedTables.map(table => (
                        <div
                            key={table.id}
                            className="bg-white border border-[#F1F5F9] rounded-[6px] p-3 shadow-[0_3px_20px_rgba(0,0,0,0.043)]"
                        >
                            {/* Card Top Row: Table Label and Date/Time */}
                            <div className="flex flex-col mb-2 pb-2 border-b border-[#F1F5F9]">
                                <span className="text-[14px] font-bold text-brand mb-0.5">
                                    Stol : {table.name}
                                </span>
                                <span className="text-[14px] font-semibold text-[#1E293B]">
                                    {table.time || 'Bugun'}
                                </span>
                            </div>

                            {/* Card Middle Row: Name with Icon */}
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="text-[#67728A] shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.2744 13.67L21.1667 13.6667C21.1667 9.07833 17.775 5.27833 13.3692 4.61417C13.5558 4.345 13.6667 4.01917 13.6667 3.66667C13.6667 2.74583 12.9208 2 12 2C11.0792 2 10.3333 2.74583 10.3333 3.66667C10.3333 4.01917 10.4442 4.345 10.6308 4.61417C6.225 5.27833 2.83333 9.07833 2.83333 13.6667C2.3731 13.6667 2 14.0398 2 14.5C2 14.9602 2.3731 15.3333 2.83333 15.3333H4.50833C3.96167 15.9483 3.56083 16.705 3.36667 17.5583L2.5888 20.982C2.47032 21.5035 2.8667 22 3.40148 22C3.79056 22 4.12787 21.7308 4.21413 21.3514L4.9925 17.9275C5.34 16.4 6.67667 15.3333 8.2425 15.3333H13.2492C13.7742 15.3333 14.2008 15.7608 14.2008 16.2858C14.2008 16.7558 13.85 17.1617 13.3833 17.2275L9.90761 17.7238C9.45193 17.7889 9.1353 18.2111 9.20043 18.6668C9.26555 19.1224 9.68765 19.4389 10.1433 19.3738L13.6183 18.8775C14.1392 18.8033 14.6025 18.57 14.9758 18.2383L14.9867 18.2508L18.0942 15.545C18.4292 15.2433 18.9933 15.2783 19.2825 15.6283C19.5842 15.975 19.55 16.505 19.2067 16.81L15.0078 20.5442C14.4354 21.0533 14.7954 22 15.5614 22C15.7656 22 15.9626 21.9251 16.1151 21.7894L20.3125 18.0567C21.0967 17.36 21.3342 16.2708 21.0008 15.335H21.0931H21.3331C21.7006 15.335 21.9986 15.0373 21.999 14.6698L21.9993 14.3956C21.9997 13.995 21.675 13.67 21.2744 13.67ZM4.5 13.6667C4.5 9.53083 7.865 6.16667 12 6.16667C16.135 6.16667 19.5 9.53083 19.5 13.6667H4.5Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <span className="text-[15px] font-semibold text-[#67728A] truncate">
                                    {table.customerName || 'Noma\'lum mijoz'}
                                </span>
                            </div>

                            {/* Card Bottom Row: Action Buttons */}
                            <div className="flex gap-2">
                                <button className="flex-1 h-[38px] flex items-center justify-center gap-2 bg-[#EAF9E8] border border-[#EAF9E8] text-[#5DB057] rounded-[10px] text-[13px] font-semibold hover:bg-[#DFF5DC] transition-colors">
                                    <PencilLine className="w-4 h-4" />
                                    O'zgartirish
                                </button>
                                <button className="w-[38px] h-[38px] flex items-center justify-center bg-[#FFF2F2] text-[#FF5B5B] rounded-[10px] hover:bg-[#FFE5E5] transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
