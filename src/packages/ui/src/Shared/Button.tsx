import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '../utils';

const buttonVariants = cva('btn', {
    variants: {
        variant: {
            default:
                'btn-secondary border-secondary-focus text-secondary-content',
            destructive: 'btn-error border-error-focus text-error-content',
            outline: 'btn-outline border-outline-focus text-outline-content',
            subtle: 'btn-primary border-primary-focus text-primary-content',
            ghost: 'btn-ghost border-ghost-focus text-ghost-content',
            link: 'btn-link border-link-focus text-link-content',
            active: 'btn-active border-active-focus text-active-content',
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
                    'mt-1 mb-1',
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
