import clsx from 'clsx'
import { memo, useCallback } from 'react'
import { Checkbox } from '../ui/checkbox'

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
}

/**
 * A component that renders a toggle switch for permissions.
 *
 * @param {PermissionProps} props - The properties for the PermissionToggle component.
 * @param {string} props.name - The name of the permission.
 * @param {string} props.id - The unique identifier for the permission.
 * @param {function} props.onUpdate - The callback function to be called when the permission is updated.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @param {boolean} props.isGranted - Indicates whether the permission is granted.
 * @param {boolean} props.disabled - Indicates whether the toggle is disabled.
 *
 * @returns {JSX.Element} The rendered PermissionToggle component.
 */
function PermissionToggle({ name, id, onUpdate, className, isGranted, disabled }: PermissionProps) {
  const onChangeEvent = useCallback(() => {
    onUpdate?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={clsx('flex items-center space-x-2 pb-2', className)}>
      <Checkbox id={id} onCheckedChange={onChangeEvent} checked={isGranted} disabled={disabled} />
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {name}
      </label>
    </div>
  )
}

export const Permission = memo(PermissionToggle)
