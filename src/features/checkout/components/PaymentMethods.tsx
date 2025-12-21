import React from 'react';
import { useTranslation } from 'react-i18next';
import { Banknote, CreditCard, Smartphone, SmartphoneNfc, CheckCircle, LucideIcon } from 'lucide-react';
import { useCheckout } from '../api/useCheckout';

interface PaymentMethodsProps {
    selectedMethod: string | null;
    onSelect: (id: string) => void;
    onConfirm: () => void;
}

const iconMap: Record<string, LucideIcon> = {
    'Banknote': Banknote,
    'CreditCard': CreditCard,
    'SmartphoneNfc': SmartphoneNfc,
    'Smartphone': Smartphone
};

export const PaymentMethods = ({ selectedMethod, onSelect, onConfirm }: PaymentMethodsProps) => {
    const { t } = useTranslation('common');
    const { paymentMethods: methods, isLoadingMethods } = useCheckout();

    // Transform API/Mock data to component structure
    const paymentMethods = methods.map(m => ({
        id: m.id,
        name: m.nameKey.includes('.') ? t(m.nameKey) : m.nameKey,
        icon: iconMap[m.iconType] || Banknote
    }));

    if (isLoadingMethods) {
        return (
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 h-full flex flex-col animate-pulse">
                <div className="h-4 bg-gray-100 w-1/3 mx-auto mb-8 rounded"></div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-gray-100 rounded-[32px]"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 h-full flex flex-col">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">{t('checkout.selectPayment')}</h4>

            <div className="grid grid-cols-2 gap-6 mb-8">
                {paymentMethods.map(method => (
                    <div
                        key={method.id}
                        onClick={() => onSelect(method.id)}
                        className={`h-32 rounded-[32px] flex flex-col items-center justify-center gap-3 transition-all cursor-pointer border-2 active:scale-95
              ${selectedMethod === method.id ? 'border-brand bg-brand/5 shadow-inner' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}
            `}
                    >
                        <method.icon className={`w-10 h-10 ${selectedMethod === method.id ? 'text-brand' : 'text-gray-400'}`} />
                        <span className={`font-black uppercase tracking-widest text-xs ${selectedMethod === method.id ? 'text-brand' : 'text-gray-600'}`}>{method.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <button
                    className="w-full bg-[#22C55E] text-white py-6 rounded-[32px] font-black text-2xl shadow-lg hover:bg-green-600 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedMethod}
                    onClick={onConfirm}
                >
                    <CheckCircle className="w-8 h-8" />
                    {t('checkout.completePayment')}
                </button>
            </div>
        </div>
    );
};
