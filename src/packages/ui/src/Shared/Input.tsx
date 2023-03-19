import { forwardRef } from "react"
import { Label } from './Label'
import { cn } from "../utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errMessage?: string;
  }

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { label, errMessage, id } = props;
    return (
      <section className="grid w-full max-w-sm items-center gap-1.5">
        {label &&  <Label htmlFor={id}>{label}</Label>}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
            className
          )}
          ref={ref}
          {...props}
        />
        {errMessage && <p className="py-1 text-red-500 text-sm font-bold">{errMessage}</p>}
      </section>
    )
  }
)
Input.displayName = "Input"

export { Input }
