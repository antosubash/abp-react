import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '../utils';

const buttonVariants = cva('btn', {
    variants: {
        variant: {
            default: 'btn-secondary',
            destructive: 'btn-error',
            outline: 'btn-outline',
            subtle: 'btn-primary',
            ghost: 'btn-ghost',
            link: 'btn-link',
            active: 'btn-active',
            transparent: 'transparent'
        },
        size: {
            default: 'btn-md',
            sm: 'btn-sm',
            lg: 'btn-lg'
        },
        shape: {
            default: '',
            circle: 'btn-circle',
            square: 'btn-square'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        shape: 'default'
    }
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    fluid?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shape, ...props }, ref) => {
        return (
            <button
                className={cn(
                    buttonVariants({ variant, size, shape, className }),
                    {
                        'btn-disabled': !!props?.disabled,
                        'btn-block': !!props?.fluid
                    }
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
