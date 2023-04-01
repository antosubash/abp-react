import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../utils';

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
    ElementRef<typeof TabsPrimitive.List>,
    ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'inline-flex items-center justify-center  border-b-2 border-b-primary  rounded-md bg-primary  p-1',
            className
        )}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
    ElementRef<typeof TabsPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        className={cn(
            'inline-flex min-w-[100px] truncate text-primary-content items-center justify-center rounded-[0.185rem] px-3 py-1.5  text-sm font-medium  transition-all  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:text-md data-[state=active]:uppercase data-[state=active]:shadow-lg',
            className
        )}
        {...props}
        ref={ref}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
    ElementRef<typeof TabsPrimitive.Content>,
    ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        className={cn(
            'mt-2 rounded-md shadow-lg md:min-h-fit min-h-screen p-5 bg-base-100',
            className
        )}
        {...props}
        ref={ref}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
