import React, { useEffect, useState } from 'react';
import { Search, Plus, Utensils, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/features/cart';
import { APP_CONFIG } from '@/config/constants';
import { useProducts } from '@/features/menu/api/useMenu';

interface ProductGridProps {
    activeCat: number;
    search: string;
    setSearch: (s: string) => void;
}

export const ProductGrid = ({ activeCat, search, setSearch }: ProductGridProps) => {
    const { t } = useTranslation('common');
    const { addItem, selectedTableId } = useCartStore();

    // Use TanStack Query hook
    const { products, isLoading } = useProducts(activeCat, search);

    const formatPrice = (p: number) =>
        new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
            minimumFractionDigits: APP_CONFIG.CURRENCY.DIGITS,
            maximumFractionDigits: APP_CONFIG.CURRENCY.DIGITS
        }).format(p) + ' ' + APP_CONFIG.CURRENCY.SYMBOL;

    return (
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">
            {/* Search Bar */}
            <div className="p-card-sm border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white/90 backdrop-blur z-header">
                <div className="relative flex-1 group">
                    <input
                        type="text"
                        placeholder={t('menu.searchPlaceholder')}
                        className="w-full bg-surface-gray-bg rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/20 border-transparent focus:border-brand transition-all placeholder:text-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('hall.table')}:</span>
                    <span className="bg-brand/10 text-brand px-4 py-2 rounded-xl text-sm font-black shadow-sm border border-brand/20">{selectedTableId || '-'}</span>
                </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-50 pb-20">
                        <Utensils className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="font-bold text-gray-400 text-lg">{t('menu.noItems')}</p>
                        <button onClick={() => setSearch('')} className="mt-4 text-brand font-bold hover:underline">{t('menu.clearSearch')}</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                                onClick={() => addItem(product)}
                            >
                                <div className="aspect-video relative overflow-hidden bg-white rounded-2xl mb-3 shadow-premium border border-gray-100 group-hover:border-brand/20 transition-all">
                                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors"></div>
                                    <button
                                        className="absolute bottom-3 right-3 w-10 h-10 bg-white text-brand rounded-xl flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="px-1 flex flex-col flex-1">
                                    <h4 className="text-lg font-bold text-gray-800 mb-1 leading-tight group-hover:text-brand transition-colors line-clamp-1" title={product.name}>{product.name}</h4>
                                    <p className="text-gray-400 font-bold text-sm leading-tight mb-4">{formatPrice(product.price)} UZS</p>

                                    <button
                                        className="mt-auto w-full py-3 rounded-xl border-2 border-gray-100 font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-brand hover:text-white hover:border-brand transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
                                    >
                                        <Plus className="w-4 h-4" />
                                        {t('menu.addToOrder')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};
