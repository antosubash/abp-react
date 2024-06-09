import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '../utils';

const Label = forwardRef<
    ElementRef<typeof LabelPrimitive.Root>,
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            'text-sm font-medium leading-none text-primary-content',
            className
        )}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
