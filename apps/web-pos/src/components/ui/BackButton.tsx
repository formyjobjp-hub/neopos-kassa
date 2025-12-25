import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    to?: string;
    onClick?: () => void;
    className?: string;
}

export const BackButton = ({ to, onClick, className = '' }: BackButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`w-24 h-14 bg-white rounded-2xl shadow-md border-2 border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand hover:shadow-lg transition-all active:scale-95 group ${className}`}
        >
            <ArrowLeft className="w-8 h-8 text-gray-500 group-hover:text-brand transition-colors" />
        </button>
    );
};
