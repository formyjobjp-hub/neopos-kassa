import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from "@/features/cart";
import { FluidPanel } from '@/components/common';
import { BackButton } from '@/components/ui';
import { OrderSummary, PaymentMethods } from '@/features/checkout';

const CheckoutView = () => {
    const navigate = useNavigate();
    const { getSubtotal, getServiceCharge, getTotal, clearCart } = useCartStore();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const finalizePayment = () => {
        toast.success(`Payment successful with ${selectedMethod?.toUpperCase()}!`, {
            style: {
                borderRadius: '16px',
                background: '#1F2937',
                color: '#fff',
                fontWeight: 'bold',
                padding: '16px',
            },
            iconTheme: {
                primary: '#10B981',
                secondary: '#FFFAEE',
            },
        });
        clearCart();
        setTimeout(() => navigate('/hall'), 2000);
    };

    return (
        <div className="flex-1 flex flex-col bg-surface-light p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full h-full">
                <div className="flex items-center gap-4 mb-6">
                    <BackButton to="/menu" />
                    <h2 className="text-3xl font-black text-gray-800 tracking-tighter">Checkout</h2>
                </div>

                <div className="grid grid-cols-3 gap-6 items-start h-full pb-20">
                    {/* Left Column: Order Summary (Smaller) */}
                    <div className="col-span-1 bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 overflow-hidden h-full max-h-[calc(100vh-180px)]">
                        <OrderSummary
                            subtotal={getSubtotal()}
                            serviceCharge={getServiceCharge()}
                            total={getTotal()}
                        />
                    </div>

                    {/* Right Column: Payment Methods (Larger) */}
                    <div className="col-span-2">
                        <PaymentMethods
                            selectedMethod={selectedMethod}
                            onSelect={setSelectedMethod}
                            onConfirm={finalizePayment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;
