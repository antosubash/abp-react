import { forwardRef } from 'react';
import { Label } from './Label';
import { cn } from '../utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const { label, errMessage, id } = props;
        return (
            <section className="grid w-full items-center gap-1.5">
                {label && (
                    <Label htmlFor={id} className="text-neutral-100">
                        {label}
                    </Label>
                )}
                <input
                    className={cn(
                        'flex h-10 w-full text-neutral-100 rounded-md border border-neutral-300 bg-transparent py-2 px-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {errMessage && (
                    <p className="py-1 text-error text-sm font-bold">
                        {errMessage}
                    </p>
                )}
            </section>
        );
    }
);
Input.displayName = 'Input';

export { Input };
