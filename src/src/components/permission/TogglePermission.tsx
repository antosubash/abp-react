import { PermissionGrantInfoDto } from '@/client'
import { Permission } from './PermissionToggle'

import clsx from 'clsx'
import { Button } from '../ui/button'
import { DialogFooter } from '../ui/dialog'
import { usePermissionsChanges, UsePermissionsChangesProps } from './usePermissionChanges'

type TogglePermissionProps = UsePermissionsChangesProps & {
  hideSelectAll?: boolean
  hideSave?: boolean
  onSelectedUpdate?: (permissionDto: PermissionGrantInfoDto) => void
  disabled?: boolean
  onCancelEvent?: () => void
}
export const TogglePermission = ({
  permissions,
  type,
  hideSelectAll,
  hideSave,
  onSelectedUpdate,
  disabled,
  onCancelEvent,
}: TogglePermissionProps) => {
  const { hasAllSelected, onCurrentPermissionChanges, data, onHasAllSelectedUpdate } =
    usePermissionsChanges({ permissions, type })

  return (
    <>
      {!hideSelectAll && (
        <Permission
          name="Select All"
          isGranted={hasAllSelected}
          disabled={disabled}
          id="select_all"
          onUpdate={onHasAllSelectedUpdate}
        />
      )}
      {data?.map((dto: PermissionGrantInfoDto, idx) => (
        <div key={idx}>
          <Permission
            name={dto.displayName!}
            isGranted={dto.isGranted!}
            id={dto.displayName!.toLocaleLowerCase().concat(dto.parentName!)}
            onUpdate={() => {
              onCurrentPermissionChanges(idx)
              if (onSelectedUpdate) {
                onSelectedUpdate(dto)
              }
            }}
            className={clsx('ml-5', {
              'pl-5': dto.parentName,
            })}
            disabled={disabled}
          />
        </div>
      ))}
      {!hideSave && (
        <DialogFooter>
          {onCancelEvent && (
            <Button
              onClick={(e) => {
                e.preventDefault()
                onCancelEvent()
              }}
            >
              Cancel
            </Button>
          )}

          <Button type="submit">Save</Button>
        </DialogFooter>
      )}
    </>
  )
}
