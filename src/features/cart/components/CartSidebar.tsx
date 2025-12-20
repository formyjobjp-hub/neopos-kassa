import { APP_CONFIG } from '@/config/constants';
import { useCartStore } from '../model/cartStore';
import { X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartSidebar = () => {
    const navigate = useNavigate();
    const {
        items, guestCount, getSubtotal, getServiceCharge, getTotal,
        updateQuantity, removeItem
    } = useCartStore();

    const formatPrice = (p: number) =>
        new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
            minimumFractionDigits: APP_CONFIG.CURRENCY.DIGITS,
            maximumFractionDigits: APP_CONFIG.CURRENCY.DIGITS
        }).format(p) + ' ' + APP_CONFIG.CURRENCY.SYMBOL;

    return (
        <aside className="w-[450px] border-l border-gray-100 flex flex-col bg-white h-full relative z-20">
            <div className="p-8 border-b border-gray-50">
                <h3 className="text-2xl font-black text-gray-800 tracking-tighter mb-1">Current Order</h3>
                {guestCount > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guests:</span>
                        <span className="bg-brand/10 px-2 py-0.5 rounded-lg text-xs font-bold text-brand">{guestCount}</span>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-40">
                        <ShoppingBag className="w-24 h-24 mb-6 text-gray-300" />
                        <p className="font-bold uppercase tracking-widest text-xs text-gray-400">Order is empty</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-50/50 rounded-3xl p-4 flex gap-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-white shadow-sm">
                                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <h5 className="font-bold text-gray-800 leading-tight">{item.name}</h5>
                                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center bg-white rounded-xl px-1 py-1 gap-1 border border-gray-100 shadow-sm">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand hover:bg-gray-50 rounded-lg transition-all active:scale-95"><span className="text-xl font-bold">-</span></button>
                                        <span className="text-sm font-black text-gray-800 w-6 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand hover:bg-gray-50 rounded-lg transition-all active:scale-95"><span className="text-xl font-bold">+</span></button>
                                    </div>
                                    <p className="font-black text-gray-800 text-sm">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-gray-500 font-bold text-xs uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold text-xs uppercase tracking-wider">
                    <span>Service {APP_CONFIG.TAX.RATE * 100}%</span>
                    <span>{formatPrice(getServiceCharge())}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-gray-200 mt-2">
                    <span className="text-sm font-black uppercase text-gray-800">Total</span>
                    <span className="text-3xl font-black text-brand tracking-tighter">{formatPrice(getTotal())}</span>
                </div>

                <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-brand text-white py-5 rounded-[24px] font-black text-xl shadow-premium hover:bg-brand-dark transition-all active:scale-95 mt-6 flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:shadow-none"
                    disabled={items.length === 0}
                >
                    Checkout
                </button>
            </div>
        </aside>
    );
};
