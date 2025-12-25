import React, { useState } from 'react';
import { ZoneSidebar, TableGrid, GuestModal, Table, ActiveOrdersSidebar } from '@/features/tables';
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
            setTable(String(table.id));
            navigate('/menu');
        } else {
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
        <div className="flex h-screen bg-background overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                {/* Zone Sidebar (Left) - Unchanged layout as requested */}
                <ZoneSidebar activeZone={activeZone} setActiveZone={setActiveZone} />

                {/* Main Table Grid (Center) */}
                <main className="flex-1 overflow-y-auto bg-background">
                    <div className="max-w-[1400px] mx-auto">
                        <TableGrid activeZone={activeZone} onTableClick={handleTableClick} />
                    </div>
                </main>

                {/* Active Orders sidebar (Right) */}
                <ActiveOrdersSidebar />
            </div>

            {/* GuestModal */}
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
