import React from 'react';
import { Input as AntInput, InputProps } from 'antd';

interface Props extends InputProps {
    className?: string;
}

export const Input: React.FC<Props> = ({ className, ...props }) => {
    return (
        <AntInput
            {...props}
            className={`!rounded-[12px] !py-2.5 !px-4 !border-gray-200 hover:!border-brand focus:!border-brand ${className || ''}`}
        />
    );
};
