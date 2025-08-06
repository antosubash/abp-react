import { PermissionGrantInfoDto } from '@/client'
import { Permissions } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

export type UseEnhancedPermissionChangesProps = {
  permissions: PermissionGrantInfoDto[]
  type: 'identity' | 'tenant' | 'feature' | 'setting'
}

export interface PermissionChange {
  permissionName: string
  oldValue: boolean
  newValue: boolean
  timestamp: number
}

export const useEnhancedPermissionChanges = ({ permissions, type }: UseEnhancedPermissionChangesProps) => {
  const [hasAllSelected, setHasAllSelected] = useState(false)
  const [data, setData] = useState<PermissionGrantInfoDto[]>(permissions)
  const [changes, setChanges] = useState<PermissionChange[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const originalDataRef = useRef<PermissionGrantInfoDto[]>(permissions)

  // Helper function to update permission data
  const helper = useCallback((
    data: PermissionGrantInfoDto[],
    selectedData: PermissionGrantInfoDto,
    permission: `${Permissions}`,
    setData: (data: PermissionGrantInfoDto[]) => void
  ) => {
    const parent = data.find((f) => !f.parentName && f.name === permission)
    const children = data.filter((f) => f.parentName === permission)

    if (selectedData.parentName === permission && parent) {
      const oldValue = selectedData.isGranted
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
      
      // Track the change
      const change: PermissionChange = {
        permissionName: selectedData.name!,
        oldValue,
        newValue: selectedData.isGranted,
        timestamp: Date.now()
      }
      
      setChanges(prev => [...prev, change])
      setData([...data])
      return false
    }

    if (!selectedData.parentName && selectedData.name === permission) {
      const oldValue = selectedData.isGranted
      if (parent && parent.isGranted) {
        parent.isGranted = false
        children.forEach((c) => (c.isGranted = false))
      } else if (parent && !parent.isGranted) {
        parent.isGranted = true
        children.forEach((c) => (c.isGranted = true))
      }
      
      // Track the change
      const change: PermissionChange = {
        permissionName: selectedData.name!,
        oldValue,
        newValue: selectedData.isGranted,
        timestamp: Date.now()
      }
      
      setChanges(prev => [...prev, change])
      setData([...data])
    }
  }, [])

  // Handler for changes in the current permission
  const onCurrentPermissionChanges = useCallback(
    (idx: number) => {
      const selectedData = data[idx]

      // Wait for all the events to get done, then check.
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
        throw new Error('useEnhancedPermissionChanges hook received an unknown type property!')
      }
    },
    [permissions, type, data, helper]
  )

  // Handler to update the state when all permissions are selected or deselected
  const onHasAllSelectedUpdate = useCallback(() => {
    setHasAllSelected((f) => {
      const newValue = !f
      
      // Track changes for all permissions
      const newChanges: PermissionChange[] = data.map(permission => ({
        permissionName: permission.name!,
        oldValue: permission.isGranted,
        newValue,
        timestamp: Date.now()
      }))
      
      setChanges(prev => [...prev, ...newChanges])
      
      data.forEach((d) => (d.isGranted = newValue))
      setData([...data])
      return newValue
    })
  }, [data])

  // Reset to original state
  const resetToOriginal = useCallback(() => {
    setData([...originalDataRef.current])
    setChanges([])
    setHasUnsavedChanges(false)
  }, [])

  // Undo last change
  const undoLastChange = useCallback(() => {
    if (changes.length === 0) return
    
    const lastChange = changes[changes.length - 1]
    const permission = data.find(p => p.name === lastChange.permissionName)
    
    if (permission) {
      permission.isGranted = lastChange.oldValue
      setData([...data])
    }
    
    setChanges(prev => prev.slice(0, -1))
  }, [changes, data])

  // Get change statistics
  const getChangeStats = useCallback(() => {
    const granted = changes.filter(c => c.newValue && !c.oldValue).length
    const revoked = changes.filter(c => !c.newValue && c.oldValue).length
    
    return { granted, revoked, total: changes.length }
  }, [changes])

  // Check if data has changed from original
  const hasChanges = useCallback(() => {
    if (data.length !== originalDataRef.current.length) return true
    
    return data.some((permission, index) => 
      permission.isGranted !== originalDataRef.current[index]?.isGranted
    )
  }, [data])

  // Update unsaved changes flag
  useEffect(() => {
    setHasUnsavedChanges(hasChanges())
  }, [data, hasChanges])

  // Initialize state
  useEffect(() => {
    setHasAllSelected(permissions.every((d) => d.isGranted))
    originalDataRef.current = [...permissions]
  }, [permissions])

  return {
    hasAllSelected,
    data,
    changes,
    hasUnsavedChanges,
    onCurrentPermissionChanges,
    onHasAllSelectedUpdate,
    resetToOriginal,
    undoLastChange,
    getChangeStats,
    hasChanges: hasChanges(),
  }
} 