import React, { useState } from 'react';
import { ZoneSidebar, TableGrid, GuestModal, Table } from '@/features/tables';
import { FluidPanel, ContentGrid } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/features/cart';

const HallView = () => {
    const navigate = useNavigate();
    const { setTable, setGuests } = useCartStore();

    // Zone State
    const [activeZone, setActiveZone] = useState<string>('B');

    // Guest Modal State
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [guestCount, setGuestCount] = useState(1);

    // Handlers
    const handleTableClick = (table: Table) => {
        if (table.status === 'occupied') {
            // If checking out existing table
            setTable(String(table.id));
            navigate('/menu');
        } else {
            // New table -> Open Modal
            setSelectedTable(table);
            setGuestCount(1);
        }
    };

    const confirmGuests = () => {
        if (selectedTable) {
            setTable(String(selectedTable.id));
            setGuests(guestCount);
            setSelectedTable(null);
            navigate('/menu');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Sidebar with correct prop: activeZone */}
            <ZoneSidebar activeZone={activeZone} setActiveZone={setActiveZone} />

            {/* Main Content */}
            <FluidPanel className="p-6 bg-surface-light relative z-base w-full">
                <div className="max-w-[1920px] mx-auto w-full">


                    <ContentGrid>
                        <TableGrid activeZone={activeZone} onTableClick={handleTableClick} />
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
