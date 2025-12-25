import { useCartStore } from '@/features/cart';
import { APP_CONFIG } from '@/config/constants';

import { useTranslation } from 'react-i18next';

export const OrderSummary = () => {
    const { t } = useTranslation(['checkout', 'cart', 'common']);
    const { items, guestCount, getSubtotal, getServiceCharge, getTotal } = useCartStore();

    const formatPrice = (price: number) =>
        new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
            minimumFractionDigits: APP_CONFIG.CURRENCY.DIGITS,
            maximumFractionDigits: APP_CONFIG.CURRENCY.DIGITS,
        }).format(price) + ' ' + APP_CONFIG.CURRENCY.SYMBOL;

    return (
        <div className="bg-white rounded-3xl p-card-lg shadow-premium border border-gray-100">
            <div className="border-b border-gray-100 pb-card mb-card">
                <h3 className="text-heading-lg font-black text-gray-800 mb-2">{t('checkout:checkout.orderSummary')}</h3>
                {guestCount > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-label text-gray-400 uppercase">{t('cart:cart.guests')}:</span>
                        <span className="bg-brand/10 px-3 py-1 rounded-lg text-caption font-bold text-brand">{guestCount}</span>
                    </div>
                )}
            </div>

            {/* Itemized List */}
            <div className="space-y-4 mb-card">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-body font-bold text-gray-800 mb-1">{item.name}</h4>
                            <p className="text-body-sm text-gray-500">
                                {item.quantity} × {formatPrice(item.price)}
                            </p>
                        </div>
                        <span className="text-body-lg font-black text-brand">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 pt-card space-y-3">
                <div className="flex justify-between text-body">
                    <span className="text-gray-600 font-semibold">{t('cart:cart.subtotal')}</span>
                    <span className="font-bold text-gray-800">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-body">
                    <span className="text-gray-600 font-semibold">{t('cart:cart.serviceCharge')}</span>
                    <span className="font-bold text-gray-800">{formatPrice(getServiceCharge())}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-heading-sm font-black text-gray-900">{t('cart:cart.total')}</span>
                    <span className="text-heading font-black text-brand">{formatPrice(getTotal())}</span>
                </div>
            </div>
        </div>
    );
};
