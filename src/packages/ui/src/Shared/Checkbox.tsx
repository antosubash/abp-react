import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '../utils';
const checkBoxVariants = cva('checkbox', {
    variants: {
        variant: {
            default: 'checkbox-secondary',
            destructive: 'checkbox-error',
            subtle: 'checkbox-primary'
        },
        size: {
            default: 'checkbox-md',
            sm: 'checkbox-sm',
            lg: 'checkbox-lg'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});

export interface CheckboxProps
    extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
        VariantProps<typeof checkBoxVariants> {}

const Checkbox = forwardRef<
    ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkBoxVariants({ variant, size }), className)}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center')}
        >
            <Check className="h-4 w-4 " />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
