import React, { useEffect, useState } from 'react';
import { Plus, Utensils, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/features/cart';
import { APP_CONFIG } from '@/config/constants';
import { useProducts } from '@/features/menu/api/useMenu';

interface ProductGridProps {
    activeCat: number;
}

export const ProductGrid = ({ activeCat }: ProductGridProps) => {
    const { t } = useTranslation(['common', 'menu', 'hall']);
    const { addItem, selectedTableId } = useCartStore();

    // Use TanStack Query hook
    const { products, isLoading } = useProducts(activeCat, '');

    const formatPrice = (p: number) =>
        new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
            minimumFractionDigits: APP_CONFIG.CURRENCY.DIGITS,
            maximumFractionDigits: APP_CONFIG.CURRENCY.DIGITS
        }).format(p) + ' ' + APP_CONFIG.CURRENCY.SYMBOL;

    return (
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-20">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-[3/2] bg-gray-100 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-50 pb-20">
                        <Utensils className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="font-bold text-gray-400 text-lg">{t('menu:menu.noItems')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-20">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-soft"
                            >
                                {/* Image Area - Wider aspect ratio */}
                                <div className="aspect-[3/2] overflow-hidden relative bg-gray-50">
                                    <img
                                        src={product.image}
                                        className="w-full h-full object-cover"
                                        alt={product.name}
                                    />
                                </div>

                                {/* Info Area (Touching the image) - Simplified */}
                                <div className="p-4 bg-white flex flex-col items-center text-center w-full border-t border-gray-100">
                                    <h4 className="text-body font-black text-gray-800 mb-1 leading-tight line-clamp-2 uppercase" title={product.name}>{product.name}</h4>
                                    <p className="text-brand font-black text-lg tracking-tight">{formatPrice(product.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};
