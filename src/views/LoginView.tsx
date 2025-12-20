import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Delete } from 'lucide-react';
import { Button } from 'antd';
import { toast } from 'react-hot-toast';

const LoginView = () => {
    const [pin, setPin] = useState('');
    const { login } = useAuthStore();

    const handleKeyPress = (num: string) => {
        if (pin.length < 4) {
            const newPin = pin + num;
            setPin(newPin);
            if (newPin.length === 4) {
                setTimeout(async () => {
                    const success = await login(newPin);
                    if (success) {
                        toast.success('Xush kelibsiz!', { icon: '👋' });
                    } else {
                        toast.error('Noto\'g\'ri PIN kod! Qaytadan urining.', {
                            style: { background: '#EF4444', color: 'white' }
                        });
                        setPin('');
                    }
                }, 300);
            }
        }
    };

    const handleDelete = () => setPin(pin.slice(0, -1));

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[400px]">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black tracking-tighter text-brand mb-2">NEO<span className="text-gray-800">POS</span></h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Please enter your PIN</p>
                </div>

                <div className="flex justify-center gap-4 mb-12 h-12">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${i < pin.length ? 'bg-brand scale-125' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                        <Button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            size="large"
                            type="default"
                            className="!h-16 !text-2xl !rounded-2xl !font-bold !border-2 !border-gray-100 hover:!border-brand hover:!text-brand"
                        >
                            {num}
                        </Button>
                    ))}
                    <Button size="large" type="text" className="!h-16 !font-bold !text-brand">C</Button>
                    <Button
                        onClick={() => handleKeyPress('0')}
                        size="large"
                        className="!h-16 !text-2xl !rounded-2xl !font-bold !border-2 !border-gray-100 hover:!border-brand hover:!text-brand"
                    >
                        0
                    </Button>
                    <Button
                        onClick={handleDelete}
                        size="large"
                        className="!h-16 !rounded-2xl !border-2 !border-gray-100 hover:!border-brand hover:!text-brand flex items-center justify-center"
                    >
                        <Delete className="w-6 h-6" />
                    </Button>
                </div>

                <div className="mt-12 flex justify-center gap-6 grayscale opacity-40">
                    <img src="https://flagcdn.com/w40/uz.png" className="w-8 h-5 object-cover rounded cursor-pointer ring-2 ring-brand ring-offset-2 opacity-100 grayscale-0" alt="uz" />
                    <img src="https://flagcdn.com/w40/ru.png" className="w-8 h-5 object-cover rounded cursor-pointer" alt="ru" />
                    <img src="https://flagcdn.com/w40/gb.png" className="w-8 h-5 object-cover rounded cursor-pointer" alt="en" />
                </div>
            </div>
        </div>
    );
};

export default LoginView;
