import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Delete, ScanLine, Smartphone, Eye, EyeOff, Moon, Globe, Infinity } from 'lucide-react';
import { Button } from 'antd';
import { toast } from 'react-hot-toast';

const LoginView = () => {
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const { login } = useAuthStore();

    const handleKeyPress = (num: string) => {
        if (pin.length < 4) {
            setPin(pin + num);
        }
    };

    const handleLogin = async () => {
        if (pin.length !== 4) {
            toast.error('Iltimos, 4 raqamli PIN kodni kiriting!');
            return;
        }

        const success = await login(pin);
        if (success) {
            toast.success('Xush kelibsiz!', { icon: '👋' });
        } else {
            toast.error('Noto\'g\'ri PIN kod! Qaytadan urining.', {
                style: { background: '#EF4444', color: 'white' }
            });
            setPin('');
        }
    };

    const handleDelete = () => setPin(pin.slice(0, -1));

    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col items-center justify-center p-4 font-manrope">
            {/* Background Image with Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] z-0 pointer-events-none opacity-[0.08] grayscale">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-white" />
            </div>

            {/* Top Header Section - Spans Full Width */}
            <div className="w-full h-auto absolute top-0 left-0 p-8 flex justify-between items-start z-50">
                {/* Logo - Top Left */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-brand rounded-[20px] flex items-center justify-center text-white">
                        <Infinity className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-[#2D3748] tracking-tight">
                        Neo<span className="text-brand">POS</span>
                    </h1>
                </div>

                {/* Actions - Top Right */}
                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-brand transition-colors">
                        <Moon className="w-6 h-6" />
                    </button>
                    <div className="h-12 px-5 rounded-full bg-white flex items-center gap-2 text-gray-700 font-bold cursor-pointer hover:text-brand transition-colors text-lg">
                        <Globe className="w-6 h-6" />
                        <span>O'z</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[410px] relative z-20 mt-20">
                {/* PIN Display */}
                <div className="flex justify-between w-full mb-10">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`
                                w-16 h-16 rounded-[20px] border-2 flex items-center justify-center text-3xl font-bold transition-all duration-300
                                ${i < pin.length
                                    ? 'border-brand bg-white text-brand shadow-sm shadow-brand/10'
                                    : 'border-gray-100 bg-gray-50 text-gray-400'
                                }
                            `}
                        >
                            {i < pin.length ? (showPin ? pin[i] : '•') : ''}
                        </div>
                    ))}
                    <button
                        onClick={() => setShowPin(!showPin)}
                        className="w-16 h-16 rounded-[20px] bg-cyan-50/50 hover:bg-cyan-100/50 flex items-center justify-center text-gray-400 hover:text-brand transition-colors cursor-pointer"
                    >
                        {showPin ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                    </button>
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            className="h-20 w-full rounded-[20px] hover:bg-cyan-50 text-[32px] font-bold text-gray-800 transition-all active:scale-95 flex items-center justify-center select-none bg-white border border-gray-100 shadow-sm"
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={() => setPin('')}
                        className="h-20 w-full rounded-[20px] hover:bg-red-50 text-[24px] font-bold text-red-500 transition-all active:scale-95 flex items-center justify-center select-none bg-white border border-gray-100 shadow-sm"
                    >
                        C
                    </button>
                    <button
                        onClick={() => handleKeyPress('0')}
                        className="h-20 w-full rounded-[20px] hover:bg-cyan-50 text-[32px] font-bold text-gray-800 transition-all active:scale-95 flex items-center justify-center select-none bg-white border border-gray-100 shadow-sm"
                    >
                        0
                    </button>
                    <button
                        onClick={handleDelete}
                        className="h-20 w-full rounded-[20px] hover:bg-cyan-50 text-gray-400 hover:text-brand transition-all active:scale-95 flex items-center justify-center select-none bg-white border border-gray-100 shadow-sm"
                    >
                        <Delete className="w-8 h-8" />
                    </button>
                </div>

                {/* Main Action */}
                <div className="mb-4">
                    <button
                        onClick={handleLogin}
                        className="w-full h-[62px] bg-brand hover:bg-brand-dark text-white rounded-[16px] text-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        Tizimga kirish
                    </button>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-2">
                    <button className="h-[56px] bg-cyan-50/50 border-2 border-transparent hover:border-brand/20 rounded-[16px] flex items-center justify-center gap-2 text-brand font-bold transition-all active:scale-[0.98] text-base">
                        <ScanLine className="w-5 h-5" />
                        QR Kod
                    </button>
                    <button className="h-[56px] bg-cyan-50/50 border-2 border-transparent hover:border-brand/20 rounded-[16px] flex items-center justify-center gap-2 text-brand font-bold transition-all active:scale-[0.98] text-base">
                        <Smartphone className="w-5 h-5" />
                        Login bilan
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm font-medium">v2.0.0 • Powered by NeoPOS</p>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
