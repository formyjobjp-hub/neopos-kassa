import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    // Base styles - har doim qo'llaniladi
    'inline-flex items-center justify-center rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                primary: 'bg-brand text-white hover:bg-brand-dark shadow-md hover:shadow-lg',
                secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                success: 'bg-success text-white hover:bg-green-600 shadow-md',
                danger: 'bg-danger text-white hover:bg-red-600 shadow-md',
                ghost: 'bg-transparent hover:bg-gray-50 text-gray-700',
                outline: 'border-2 border-brand text-brand hover:bg-brand hover:text-white',
            },
            size: {
                sm: 'h-10 px-4 text-caption',
                md: 'h-12 px-6 text-body',
                lg: 'h-14 px-8 text-body-lg',
                xl: 'h-16 px-10 text-heading-sm',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
