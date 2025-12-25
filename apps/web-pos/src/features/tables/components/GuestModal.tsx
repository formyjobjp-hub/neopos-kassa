import React from 'react';
import { useTranslation } from 'react-i18next';

interface GuestModalProps {
    guestCount: number;
    setGuestCount: (count: number) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export const GuestModal = ({ guestCount, setGuestCount, onConfirm, onCancel }: GuestModalProps) => {
    const { t } = useTranslation(['common', 'hall']);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] p-card-lg max-w-md w-full shadow-2xl scale-in">
                <h3 className="text-heading-lg font-black text-gray-800 mb-2 tracking-tighter text-center">{t('hall.guestsCount')}</h3>
                <p className="text-gray-400 text-center font-bold mb-10 uppercase text-label tracking-widest">{t('hall.selectGuests')}</p>

                <div className="flex items-center justify-center gap-8 mb-12">
                    <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-heading-lg font-bold text-gray-400 hover:text-brand transition-colors">-</button>
                    <span className="text-display font-black text-gray-800 w-16 text-center">{guestCount}</span>
                    <button onClick={() => setGuestCount(guestCount + 1)} className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-heading-lg font-bold text-gray-400 hover:text-brand transition-colors">+</button>
                </div>

                <button onClick={onConfirm} className="w-full bg-brand text-white py-5 rounded-[24px] font-black text-heading shadow-premium active:scale-95 transition-all">{t('buttons.confirm')}</button>
                <button onClick={onCancel} className="w-full mt-4 py-2 text-gray-400 font-bold uppercase text-label tracking-widest hover:text-gray-600 transition-colors">{t('buttons.cancel')}</button>
            </div>
        </div>
    );
};
