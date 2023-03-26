import { forwardRef } from 'react';
import { cn } from '../utils';
import { Label } from './Label';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="grid w-full gap-1.5">
                {props?.label && (
                    <Label htmlFor="message">{props?.label}</Label>
                )}
                <textarea
                    className={cn(
                        'flex h-20 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';
