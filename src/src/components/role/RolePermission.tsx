import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { v4 } from 'uuid'

import { Management, Permission } from '../permission/PermissionToggle'

import {
  IdentityRoleUpdateDto,
  PermissionGrantInfoDto,
  PermissionGroupDto,
  UpdatePermissionsDto,
  permissionsUpdate,
} from '@/client'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { PermissionProvider, USER_ROLE } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { TogglePermission } from '../permission/TogglePermission'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { useToast } from '../ui/use-toast'

type RolePermissionProps = {
  roleDto: IdentityRoleUpdateDto
  onDismiss: () => void
}

export const RolePermission = ({ roleDto, onDismiss }: RolePermissionProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // flag determine to enable/disable all the permissions to a .
  const [hasAllGranted, setHasAllGranted] = useState(false)
  const [currentPermissionGrant, setCurrentPermissionGrant] = useState<{
    name: Management
    data: PermissionGrantInfoDto[] | null
  } | null>()

  const { data } = usePermissions(PermissionProvider.R, roleDto.name)
  const queryClient = useQueryClient()

  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupDto[]>([])

  useEffect(() => {
    setOpen(true)
    return () => {
      queryClient.invalidateQueries({ queryKey: [PermissionProvider.R] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update the local state with the remote data and set the view by default management
  useEffect(() => {
    if (data?.groups) {
      setPermissionGroups([...data?.groups])
      // by default assign first permissions
      const firstPermissionSet = data?.groups[0]
      setCurrentPermissionGrant({
        name: 'identity',
        data: firstPermissionSet.permissions ?? [],
      })
    }
  }, [data])

  // check if  have all the permissions are granted already.
  useEffect(() => {
    if (permissionGroups.length > 0) {
      const hasAllPermissionGranted = permissionGroups
        .map((g) => g.permissions?.every((p) => p.isGranted))
        .every((e) => e)
      if (hasAllPermissionGranted) setHasAllGranted(hasAllPermissionGranted)
    }
  }, [permissionGroups])

  useEffect(() => {
    if (permissionGroups.length > 0) {
      permissionGroups.forEach((g) => {
        g.permissions?.forEach((p) => {
          p.isGranted = hasAllGranted
        })
      })
      setPermissionGroups([...permissionGroups])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAllGranted])

  const switchManagement = useCallback(
    (index: number) => {
      if (permissionGroups) {
        if (hasAllGranted) {
          const allPermissionSelected = permissionGroups
            .map((g) => g.permissions?.every((p) => p.isGranted))
            .every((v) => v)
          if (allPermissionSelected) {
            setHasAllGranted(allPermissionSelected)
            return
          }
        }

        setCurrentPermissionGrant(null)

        const management = permissionGroups[index]
        const managementName = management.displayName

        if (managementName?.toLowerCase()?.includes('identity')) {
          setCurrentPermissionGrant({
            name: 'identity',
            data: management?.permissions!,
          })
          return false
        }

        if (managementName?.toLowerCase()?.includes('tenant')) {
          setCurrentPermissionGrant({
            name: 'tenant',
            data: management?.permissions!,
          })
          return false
        }
        if (managementName?.toLowerCase()?.includes('feature')) {
          setCurrentPermissionGrant({
            name: 'feature',
            data: management?.permissions!,
          })
          return false
        }
        if (managementName?.toLowerCase()?.includes('setting')) {
          setCurrentPermissionGrant({
            name: 'setting',
            data: management?.permissions!,
          })
          return false
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permissionGroups]
  )

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const payload = permissionGroups
        ?.map((p) =>
          p!.permissions!.map((grant) => ({
            name: grant.name,
            isGranted: grant.isGranted,
          }))
        )
        .flat()
      const requestPayload: UpdatePermissionsDto = {
        permissions: payload,
      }
      try {
        await permissionsUpdate({
          providerKey: PermissionProvider.R,
          providerName: roleDto.name,
          requestBody: requestPayload,
        })
        toast({
          title: 'Success',
          description: 'Permission Updated Successfully',
          variant: 'default',
        })
        queryClient.invalidateQueries({
          queryKey: [PermissionProvider.R],
        })
        onCloseEvent()
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast({
            title: 'Failed',
            description: "Permission update wasn't successfull.",
            variant: 'destructive',
          })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permissionGroups]
  )

  const onCloseEvent = useCallback(() => {
    setOpen(false)
    onDismiss()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasAdmin = useMemo(() => roleDto.name.includes(USER_ROLE.ADMIN), [roleDto])

  const renderTogglePermission = useCallback(() => {
    return (
      <TogglePermission
        key={currentPermissionGrant!.name}
        permissions={currentPermissionGrant?.data ?? []}
        type={currentPermissionGrant!.name}
        onCancelEvent={onCloseEvent}
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPermissionGrant?.data])

  const formatDisplayName = (str: string): Management => {
    return str.split(' ')[0].toLowerCase() as Management
  }

  return (
    <Dialog open={open} onOpenChange={onCloseEvent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Permissions - {roleDto.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Permission
            name="Grant All Permissions"
            isGranted={hasAllGranted}
            id="all_granted"
            disabled={hasAdmin}
            onUpdate={() => {
              setHasAllGranted((f) => !f)
            }}
            className="ml-2"
          />
          {!hasAllGranted && (
            <section className="flex flex-col pt-5">
              <section className="flex flex-col">
                <div className="grid grid-cols-1 content-center justify-center gap-1 sm:grid-cols-2">
                  {permissionGroups?.map((permission: PermissionGroupDto, idx: number) => (
                    <div key={idx}>
                      <Button
                        variant={
                          currentPermissionGrant?.data === permission?.permissions
                            ? 'secondary'
                            : 'default'
                        }
                        onClick={(e: { preventDefault: () => void; stopPropagation: () => void }) => {
                          e.preventDefault()
                          e.stopPropagation()
                          switchManagement(idx)
                        }}
                      >
                        <Label>{permission?.displayName}</Label>
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
              <hr className="mb-5 mt-5 border-primary" />
              <section className="mt-3 flex flex-col space-y-1">
                {currentPermissionGrant?.data && renderTogglePermission()}
              </section>
            </section>
          )}
          {hasAllGranted && (
            <>
              <section className="mt-2 grid grid-cols-2 gap-2">
                {permissionGroups.map((group) => (
                  <div key={v4()}>
                    <h3>{group.displayName}</h3>
                    <hr className="mb-5 mt-5 border-primary" />
                    <div key={v4()}>
                      <TogglePermission
                        permissions={group.permissions!}
                        type={formatDisplayName(group.displayName!)}
                        disabled={hasAdmin}
                        hideSelectAll
                        hideSave
                      />
                    </div>
                  </div>
                ))}
              </section>
              <DialogFooter>
                <Button
                    onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault()
                    onCloseEvent()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
