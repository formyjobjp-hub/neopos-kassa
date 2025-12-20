import React from 'react';

interface GuestModalProps {
    guestCount: number;
    setGuestCount: (count: number) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export const GuestModal = ({ guestCount, setGuestCount, onConfirm, onCancel }: GuestModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl scale-in">
                <h3 className="text-3xl font-black text-gray-800 mb-2 tracking-tighter text-center">Number of guests</h3>
                <p className="text-gray-400 text-center font-bold mb-10 uppercase text-xs tracking-widest">How many people at the table?</p>

                <div className="flex items-center justify-center gap-8 mb-12">
                    <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl font-bold text-gray-400 hover:text-brand transition-colors">-</button>
                    <span className="text-6xl font-black text-gray-800 w-16 text-center">{guestCount}</span>
                    <button onClick={() => setGuestCount(guestCount + 1)} className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl font-bold text-gray-400 hover:text-brand transition-colors">+</button>
                </div>

                <button onClick={onConfirm} className="w-full bg-brand text-white py-5 rounded-[24px] font-black text-2xl shadow-premium active:scale-95 transition-all">Confirm</button>
                <button onClick={onCancel} className="w-full mt-4 py-2 text-gray-400 font-bold uppercase text-xs tracking-widest hover:text-gray-600 transition-colors">Cancel</button>
            </div>
        </div>
    );
};
