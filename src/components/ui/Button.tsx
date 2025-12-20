import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

interface Props extends ButtonProps {
    className?: string;
}

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
    return (
        <AntButton
            {...props}
            className={`!rounded-[12px] !font-bold shadow-none ${className || ''}`}
        >
            {children}
        </AntButton>
    );
};
