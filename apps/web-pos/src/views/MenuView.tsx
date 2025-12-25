import React, { useState } from 'react';
import { CategorySidebar, ProductGrid } from '@/features/menu';

const MenuView = () => {
    const [activeCat, setActiveCat] = useState(1);

    return (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-background h-full relative">
            <CategorySidebar activeCat={activeCat} setActiveCat={setActiveCat} />
            <ProductGrid activeCat={activeCat} />
        </div>
    );
};

export default MenuView;
