import React from 'react';
import { useTranslation } from 'react-i18next';
import { Banknote, CreditCard, Smartphone, SmartphoneNfc, CheckCircle } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentMethodsProps {
    selectedMethod: string | null;
    onSelect: (id: string) => void;
    onConfirm: () => void;
}

export const PaymentMethods = ({ selectedMethod, onSelect, onConfirm }: PaymentMethodsProps) => {
    const { t } = useTranslation('common');
    const paymentMethods: PaymentMethod[] = [
        { id: 'cash', name: t('checkout.cash'), icon: Banknote },
        { id: 'uzcard', name: 'Uzcard', icon: CreditCard },
        { id: 'humo', name: 'Humo', icon: SmartphoneNfc },
        { id: 'payme', name: 'Payme/Click', icon: Smartphone }
    ];

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
