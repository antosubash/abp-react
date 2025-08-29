import { useCallback, useEffect, useState } from 'react'
import type { PermissionGrantInfoDto } from '@/client'
import { Permissions } from '@/lib/utils'

/**
 * Hook to manage permission changes for different types of entities.
 *
 * @param {UsePermissionsChangesProps} props - The properties for the hook.
 * @returns {Object} - An object containing the state and handlers for permission changes.
 */
export type UsePermissionsChangesProps = {
  permissions: PermissionGrantInfoDto[]
  type: 'identity' | 'tenant' | 'feature' | 'setting'
}

/**
 * Helper function to update the permission data based on the selected permission.
 *
 * @param {PermissionGrantInfoDto[]} data - The current permission data.
 * @param {PermissionGrantInfoDto} selectedData - The selected permission data.
 * @param {`${Permissions}`} permission - The permission to be updated.
 * @param {Function} setData - The function to update the permission data state.
 */
const helper = (
  data: PermissionGrantInfoDto[],
  selectedData: PermissionGrantInfoDto,
  permission: `${Permissions}`,
  setData: (data: PermissionGrantInfoDto[]) => void
) => {
  const parent = data.find((f) => !f.parentName && f.name === permission)
  const children = data.filter((f) => f.parentName === permission)

  if (selectedData.parentName === permission && parent) {
    if (selectedData.isGranted) {
      selectedData.isGranted = false
      parent.isGranted = false
    } else {
      selectedData.isGranted = true
    }
    // If all the children got granted then updated the parent as well.
    if (!parent.isGranted) {
      const hasChildrenSelected = children.every((c) => c.isGranted)
      if (hasChildrenSelected) {
        parent.isGranted = true
      }
    }
    setData([...data])
    return false
  }

  if (!selectedData.parentName && selectedData.name === permission) {
    if (parent?.isGranted) {
      parent.isGranted = false
      children.forEach((c) => (c.isGranted = false))
    } else if (parent && !parent.isGranted) {
      parent.isGranted = true
      children.forEach((c) => (c.isGranted = true))
    }
    setData([...data])
  }
}

export const usePermissionsChanges = ({ permissions, type }: UsePermissionsChangesProps) => {
  // Flag determine to enable/disable the selected permissions to a user.
  const [hasAllSelected, setHasAllSelected] = useState(false)
  const [data, setData] = useState<PermissionGrantInfoDto[]>(permissions)

  /**
   * Handler for changes in the current permission.
   *
   * @param {number} idx - The index of the selected permission.
   */
  const onCurrentPermissionChanges = useCallback(
    (idx: number) => {
      const selectedData = data[idx]

      // wait for all the events to get done, then check.
      setTimeout(() => {
        const allSelected = permissions.every((d) => d.isGranted)
        setHasAllSelected(allSelected)
      }, 0)

      if (type === 'identity') {
        // Handle Identity permissions - Roles and Users
        helper(data, selectedData, Permissions.ROLES, setData)
        helper(data, selectedData, Permissions.USERS, setData)
        helper(data, selectedData, Permissions.ROLES_CREATE, setData)
        helper(data, selectedData, Permissions.ROLES_UPDATE, setData)
        helper(data, selectedData, Permissions.ROLES_DELETE, setData)
        helper(data, selectedData, Permissions.ROLES_MANAGE_PERMISSIONS, setData)
        helper(data, selectedData, Permissions.USERS_CREATE, setData)
        helper(data, selectedData, Permissions.USERS_UPDATE, setData)
        helper(data, selectedData, Permissions.USERS_UPDATE_MANAGE_ROLES, setData)
        helper(data, selectedData, Permissions.USERS_DELETE, setData)
        helper(data, selectedData, Permissions.USERS_MANAGE_PERMISSIONS, setData)
      } else if (type === 'tenant') {
        // Handle Tenant permissions
        helper(data, selectedData, Permissions.TENANTS, setData)
        helper(data, selectedData, Permissions.TENANTS_CREATE, setData)
        helper(data, selectedData, Permissions.TENANTS_UPDATE, setData)
        helper(data, selectedData, Permissions.TENANTS_DELETE, setData)
        helper(data, selectedData, Permissions.TENANTS_MANAGE_FEATURES, setData)
        helper(data, selectedData, Permissions.TENANTS_MANAGE_CONNECTION_STRINGS, setData)
      } else if (type === 'feature') {
        // Handle Feature permissions
        helper(data, selectedData, Permissions.MANAGE_HOST_FEATURES, setData)
      } else if (type === 'setting') {
        // Handle Setting permissions
        helper(data, selectedData, Permissions.SETTINGS_EMAILING, setData)
        helper(data, selectedData, Permissions.SETTINGS_EMAILING_TEST, setData)
        helper(data, selectedData, Permissions.SETTINGS_TIMEZONE, setData)
      } else {
        throw new Error('usePermissionsChanges hook received an unknown type property!')
      }
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    [permissions, type, data]
  )

  /**
   * Handler to update the state when all permissions are selected or deselected.
   */
  const onHasAllSelectedUpdate = useCallback(() => {
    setHasAllSelected((f) => {
      data.forEach((d) => (d.isGranted = !f))
      setData([...data])
      return !f
    })
  }, [data])

  useEffect(() => {
    setHasAllSelected(permissions.every((d) => d.isGranted))
  }, [permissions])

  return {
    hasAllSelected,
    data,
    onCurrentPermissionChanges,
    onHasAllSelectedUpdate,
  }
}
