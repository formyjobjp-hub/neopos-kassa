import React, { useState } from 'react';
import { ZoneSidebar, TableGrid, GuestModal } from '@/features/tables';
import { FluidPanel, ContentGrid } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/features/cart';

const HallView = () => {
    const navigate = useNavigate();
    const { setSelectedTableId } = useCartStore();

    // Zone State
    const [activeZone, setActiveZone] = useState<'B' | 'M' | 'A' | 'VIP'>('B');

    // Guest Modal State
    const [selectedTable, setSelectedTable] = useState<any>(null);
    const [guestCount, setGuestCount] = useState(1);

    // Handlers
    const handleTableClick = (table: any) => {
        if (table.status === 'occupied') {
            // If checking out existing table
            setTable(table.id);
            navigate('/menu');
        } else {
            // New table -> Open Modal
            setSelectedTable(table);
            setGuestCount(1);
        }
    };

    const confirmGuests = () => {
        if (selectedTable) {
            setTable(selectedTable.id);
            setGuests(guestCount);
            setSelectedTable(null);
            navigate('/menu');
        }
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar with correct prop: activeZone */}
            <div className="shrink-0 h-full bg-surface z-sidebar relative border-r border-gray-100">
                <ZoneSidebar activeZone={activeZone} setActiveZone={setActiveZone} />
            </div>

            {/* Main Content */}
            <FluidPanel className="p-6 bg-surface-light relative z-base w-full">
                <div className="max-w-[1920px] mx-auto w-full">


                    <ContentGrid>
                        <TableGrid onTableClick={handleTableClick} />
                    </ContentGrid>
                </div>
            </FluidPanel>

            {/* GuestModal only renders if selectedTable is truthy */}
            {selectedTable && (
                <GuestModal
                    guestCount={guestCount}
                    setGuestCount={setGuestCount}
                    onConfirm={confirmGuests}
                    onCancel={() => setSelectedTable(null)}
                />
            )}
        </div>
    );
};

export default HallView;

