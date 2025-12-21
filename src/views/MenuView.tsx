import React, { useState } from 'react';
import { CartSidebar } from '@/features/cart';
import { CategorySidebar, ProductGrid } from '@/features/menu';

const MenuView = () => {
    const [activeCat, setActiveCat] = useState(1);
    const [search, setSearch] = useState('');

    return (
        <div className="flex-1 flex overflow-hidden bg-background h-full">
            <CategorySidebar activeCat={activeCat} setActiveCat={setActiveCat} />
            <ProductGrid activeCat={activeCat} search={search} setSearch={setSearch} />

            {/* Cart Sidebar Component */}
            <div className="h-full relative z-sidebar shrink-0 flex flex-col">
                <CartSidebar />
            </div>
        </div>
    );
};

export default MenuView;
