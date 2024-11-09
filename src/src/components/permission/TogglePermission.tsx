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
/**
 * TogglePermission component allows toggling permissions with optional "Select All" and "Save" functionalities.
 *
 * @param {TogglePermissionProps} props - The properties for the TogglePermission component.
 * @param {PermissionGrantInfoDto[]} props.permissions - The list of permissions to be displayed and toggled.
 * @param {string} props.type - The type of permissions being handled.
 * @param {boolean} [props.hideSelectAll] - Flag to hide the "Select All" option.
 * @param {boolean} [props.hideSave] - Flag to hide the "Save" button.
 * @param {Function} [props.onSelectedUpdate] - Callback function to handle updates when a permission is selected.
 * @param {boolean} [props.disabled] - Flag to disable the permission toggles.
 * @param {Function} [props.onCancelEvent] - Callback function to handle the cancel event.
 *
 * @returns {JSX.Element} The rendered TogglePermission component.
 */
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
                onClick={(e: { preventDefault: () => void }) => {
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
