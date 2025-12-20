import React, { useState } from 'react';
import { APP_CONFIG } from '@/config/constants';
import { useCartStore } from '@/features/cart';

interface OrderSummaryProps {
    subtotal: number;
    serviceCharge: number;
    total: number;
}

export const OrderSummary = ({ subtotal, serviceCharge, total }: OrderSummaryProps) => {
    const { items, guestCount } = useCartStore();
    const [printReceipt, setPrintReceipt] = useState(true);
    const [taxReceipt, setTaxReceipt] = useState(false);

    const formatPrice = (p: number) =>
        new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
            minimumFractionDigits: APP_CONFIG.CURRENCY.DIGITS,
            maximumFractionDigits: APP_CONFIG.CURRENCY.DIGITS
        }).format(p) + ' ' + APP_CONFIG.CURRENCY.SYMBOL;

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Details</h4>
                    {guestCount > 0 && <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-lg text-gray-500">Guests: {guestCount}</span>}
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 scrollbar-hide">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                                    <span className="font-bold text-gray-800 text-sm">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                                <div className="text-xs font-bold text-gray-400">
                                    {item.quantity} x {formatPrice(item.price)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="space-y-4 border-t border-gray-100 pt-6">
                    <div className="flex justify-between font-bold text-gray-600 text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-600 text-sm">
                        <span>Service {APP_CONFIG.TAX.RATE * 100}%</span>
                        <span>{formatPrice(serviceCharge)}</span>
                    </div>
                    <div className="h-[1px] bg-gray-100 w-full"></div>
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-400 mb-1">Total Pay</span>
                        <span className="text-3xl font-black text-brand tracking-tighter">{formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 space-y-4 shrink-0">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">Receipt</span>
                    <button
                        onClick={() => setPrintReceipt(!printReceipt)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${printReceipt ? 'bg-brand' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${printReceipt ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">Tax Receipt</span>
                    <button
                        onClick={() => setTaxReceipt(!taxReceipt)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${taxReceipt ? 'bg-brand' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${taxReceipt ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>
        </div>
    );
};
