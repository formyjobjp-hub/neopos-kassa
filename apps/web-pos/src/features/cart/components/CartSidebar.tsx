import { APP_CONFIG } from '@/config/constants';
import { useCartStore } from '../model/cartStore';
import { X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const CartSidebar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('cart');
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
        <aside className="w-full h-full flex flex-col bg-white relative">
            <div className="p-card border-b border-gray-50">
                <h3 className="text-heading font-black text-gray-800 tracking-tighter mb-1">{t('cart.title')}</h3>
                {guestCount > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-label text-gray-400 uppercase tracking-wider">{t('cart.guests')}:</span>
                        <span className="bg-brand/10 px-2 py-0.5 rounded-lg text-caption font-bold text-brand">{guestCount}</span>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-card-sm space-y-4">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-40">
                        <ShoppingBag className="w-24 h-24 mb-6 text-gray-300" />
                        <p className="font-bold uppercase tracking-widest text-label text-gray-400">{t('cart.empty')}</p>
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
                                    <h5 className="font-bold text-gray-800 leading-tight text-body">{item.name}</h5>
                                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-xl transition-colors font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center font-bold text-gray-800 text-body">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-brand hover:bg-brand/5 rounded-r-xl transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-black text-brand text-body-lg">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="border-t border-gray-100 p-card bg-gray-50/50">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-body">
                        <span className="text-gray-500">{t('cart.subtotal')}</span>
                        <span className="font-bold text-gray-800">{formatPrice(getSubtotal())}</span>
                    </div>
                    <div className="flex justify-between text-body">
                        <span className="text-gray-500">{t('cart.serviceCharge')}</span>
                        <span className="font-bold text-gray-800">{formatPrice(getServiceCharge())}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-black text-gray-800 text-body-lg">{t('cart.total')}</span>
                        <span className="font-black text-brand text-heading-sm">{formatPrice(getTotal())}</span>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/checkout')}
                    disabled={items.length === 0}
                    className="w-full h-14 bg-brand text-white rounded-2xl font-bold hover:bg-brand-dark transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-body-lg"
                >
                    {t('cart.checkout')}
                </button>
            </div>
        </aside>
    );
};
