import {
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef,
    HTMLAttributes
} from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '../utils';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = ({
    className,
    children,
    ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) => (
    <AlertDialogPrimitive.Portal className={cn(className)} {...props}>
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            {children}
        </div>
    </AlertDialogPrimitive.Portal>
);
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;

const AlertDialogOverlay = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Overlay>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
        className={cn(
            'animate-in fade-in fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-sm transition-opacity',
            className
        )}
        {...props}
        ref={ref}
    />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Content>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                'animate-in fade-in-90 slide-in-from-bottom-10 sm:zoom-in-90 sm:slide-in-from-bottom-0 fixed z-50 grid w-full max-w-lg scale-100 gap-4 p-6 opacity-100 sm:rounded-lg md:w-full',
                'bg-base-100',
                className
            )}
            {...props}
        />
    </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col space-y-2 text-center sm:text-left',
            className
        )}
        {...props}
    />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            className
        )}
        {...props}
    />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Title>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold ', className)}
        {...props}
    />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Description>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={cn('text-sm ', className)}
        {...props}
    />
));
AlertDialogDescription.displayName =
    AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Action>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
        ref={ref}
        className={cn('btn btn-primary text-primary-content m-1', className)}
        {...props}
    />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Cancel>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className={cn(
            'btn btn-secondary text-secondary-content m-1',
            className
        )}
        {...props}
    />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
};
