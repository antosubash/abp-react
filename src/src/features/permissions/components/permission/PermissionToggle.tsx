import clsx from 'clsx'
import { memo, useCallback } from 'react'
import { CheckCircle2, XCircle, Shield } from 'lucide-react'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'

export type Management = 'identity' | 'tenant' | 'setting' | 'feature'
export type PermissionTracker = {
  name: string
  isGranted: boolean
}

type PermissionProps = {
  name: string
  id: string
  isGranted: boolean
  onUpdate?: () => void
  className?: string
  disabled?: boolean
  description?: string
  showIcon?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

/**
 * A component that renders a toggle switch for permissions with enhanced visual feedback.
 *
 * @param {PermissionProps} props - The properties for the PermissionToggle component.
 * @param {string} props.name - The name of the permission.
 * @param {string} props.id - The unique identifier for the permission.
 * @param {function} props.onUpdate - The callback function to be called when the permission is updated.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @param {boolean} props.isGranted - Indicates whether the permission is granted.
 * @param {boolean} props.disabled - Indicates whether the toggle is disabled.
 * @param {string} [props.description] - Optional description for the permission.
 * @param {boolean} [props.showIcon] - Whether to show status icons.
 * @param {string} [props.variant] - The visual variant of the toggle.
 *
 * @returns {React.ReactElement} The rendered PermissionToggle component.
 */
function PermissionToggle({ 
  name, 
  id, 
  onUpdate, 
  className, 
  isGranted, 
  disabled, 
  description,
  showIcon = true,
  variant = 'default'
}: PermissionProps) {
  const onChangeEvent = useCallback(() => {
    onUpdate?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (variant === 'compact') {
    return (
      <div className={clsx('flex items-center space-x-2 pb-2', className)}>
        <Checkbox 
          id={id} 
          onCheckedChange={onChangeEvent} 
          checked={isGranted} 
          disabled={disabled} 
        />
        <label htmlFor={id} className="text-sm font-medium leading-none cursor-pointer">
          {name}
        </label>
        {showIcon && (
          <div className={cn(
            "p-1 rounded",
            isGranted ? "bg-green-100" : "bg-gray-100"
          )}>
            {isGranted ? (
              <CheckCircle2 className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-gray-400" />
            )}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={clsx(
        'flex items-center justify-between p-3 rounded-lg border transition-colors',
        isGranted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:bg-muted/50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}>
        <div className="flex items-center gap-3">
          <Checkbox 
            id={id} 
            onCheckedChange={onChangeEvent} 
            checked={isGranted} 
            disabled={disabled} 
          />
          <div className="flex items-center gap-2">
            {showIcon && (
              <div className={cn(
                "p-1 rounded",
                isGranted ? "bg-green-100" : "bg-gray-100"
              )}>
                {isGranted ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            )}
            <div>
              <label htmlFor={id} className="font-medium cursor-pointer">
                {name}
              </label>
              {description && (
                <div className="text-sm text-muted-foreground">{description}</div>
              )}
            </div>
          </div>
        </div>
        <Badge 
          variant={isGranted ? "default" : "secondary"}
          className={cn(
            isGranted ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600"
          )}
        >
          {isGranted ? 'Granted' : 'Not Granted'}
        </Badge>
      </div>
    )
  }

  // Default variant
  return (
    <div className={clsx('flex items-center space-x-2 pb-2', className)}>
      <Checkbox 
        id={id} 
        onCheckedChange={onChangeEvent} 
        checked={isGranted} 
        disabled={disabled} 
      />
      <div className="flex items-center gap-2">
        {showIcon && (
          <div className={cn(
            "p-1 rounded",
            isGranted ? "bg-green-100" : "bg-gray-100"
          )}>
            {isGranted ? (
              <CheckCircle2 className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-gray-400" />
            )}
          </div>
        )}
        <label htmlFor={id} className="text-sm font-medium leading-none cursor-pointer">
          {name}
        </label>
      </div>
    </div>
  )
}

export const Permission = memo(PermissionToggle)

