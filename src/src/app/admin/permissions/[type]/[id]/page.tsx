'use client'

import { useQueryClient } from '@tanstack/react-query'
import {
  AlertTriangle,
  ArrowLeft,
  Building,
  CheckCircle2,
  Info,
  Save,
  Search,
  Settings,
  Shield,
  Users,
  X,
  XCircle,
  Zap,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { permissionsUpdate, type UpdatePermissionsDto } from '@/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useUserExists } from '@/lib/hooks/useUserExists'
import { useUserRoles } from '@/lib/hooks/useUserRoles'
import { cn, PermissionProvider, USER_ROLE } from '@/lib/utils'

const getManagementIcon = (type: string) => {
  // Extract the first part of the group name (before the first dot)
  const firstPart = type.split('.')[0]?.toLowerCase()

  switch (firstPart) {
    case 'identity':
      return <Users className="h-4 w-4" />
    case 'tenant':
      return <Building className="h-4 w-4" />
    case 'setting':
      return <Settings className="h-4 w-4" />
    case 'feature':
      return <Zap className="h-4 w-4" />
    case 'cmskit':
      return <Shield className="h-4 w-4" />
    default:
      return <Shield className="h-4 w-4" />
  }
}

const getManagementColor = (type: string) => {
  // Extract the first part of the group name (before the first dot)
  const firstPart = type.split('.')[0]?.toLowerCase()

  switch (firstPart) {
    case 'identity':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'tenant':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'setting':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'feature':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'cmskit':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function PermissionsPage() {
  const params = useParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<string>('')
  const [hasAllGranted, setHasAllGranted] = useState(false)
  const [permissionGroups, setPermissionGroups] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const entityType = params.type as 'role' | 'user'
  const entityId = params.id as string

  // Check if user exists when entity type is user
  const userExists = useUserExists({
    username: entityType === 'user' ? entityId : '',
  })

  // Only fetch user roles if we have a valid user ID and entity type is user
  const userRoles = useUserRoles({
    userId: entityType === 'user' && userExists.data?.id ? userExists.data.id : '',
  })

  const { data, isLoading: permissionsLoading } = usePermissions(
    entityType === 'role' ? PermissionProvider.R : PermissionProvider.U,
    entityType === 'user' ? userExists.data?.id : entityId
  )

  // Get translations for permission names
  const { data: translationData } = useTranslation()

  // Helper function to get translated permission name
  const getTranslatedPermissionName = (permissionName: string): string => {
    if (!translationData?.resources) {
      return permissionName
    }

    // Try to find translation in different resources
    for (const resourceName in translationData.resources) {
      const resource = translationData.resources[resourceName]
      if (resource?.texts?.[permissionName]) {
        return resource.texts[permissionName]
      }
    }

    return permissionName
  }

  useEffect(() => {
    if (data?.groups) {
      // Group permissions by the first two parts when split by dots
      const groupedPermissions = data.groups.reduce((acc: any[], group) => {
        group.permissions?.forEach((permission: any) => {
          const parts = permission.name.split('.')
          const groupKey = parts.length >= 2 ? `${parts[0]}.${parts[1]}` : parts[0]

          let existingGroup = acc.find((g) => g.displayName === groupKey)
          if (!existingGroup) {
            existingGroup = {
              displayName: groupKey,
              permissions: [],
            }
            acc.push(existingGroup)
          }

          existingGroup.permissions.push(permission)
        })
        return acc
      }, [])

      setPermissionGroups(groupedPermissions)
      if (groupedPermissions.length > 0) {
        setActiveTab(groupedPermissions[0].displayName || '')
      }
    }
  }, [data])

  useEffect(() => {
    if (permissionGroups.length > 0) {
      const allGranted = permissionGroups
        .map((g) => g.permissions?.every((p: any) => p.isGranted))
        .every((e) => e)
      setHasAllGranted(allGranted)
    }
  }, [permissionGroups])

  const hasAdmin =
    entityType === 'role'
      ? entityId.includes(USER_ROLE.ADMIN)
      : userRoles?.data?.items?.some((role) => role.name?.includes(USER_ROLE.ADMIN)) || false

  const filteredGroups = searchTerm
    ? permissionGroups
        .map((group) => ({
          ...group,
          permissions: group.permissions?.filter((permission: any) => {
            const translatedName = getTranslatedPermissionName(permission.name)
            return (
              translatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              permission.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          }),
        }))
        .filter((group) => group.permissions && group.permissions.length > 0)
    : permissionGroups

  const handlePermissionChange = () => {
    setHasChanges(true)
  }

  const handleGrantAll = () => {
    setHasAllGranted((prev) => {
      const newValue = !prev
      setPermissionGroups((groups) =>
        groups.map((group) => ({
          ...group,
          permissions: group.permissions?.map((permission: any) => ({
            ...permission,
            isGranted: newValue,
          })),
        }))
      )
      setHasChanges(true)
      return newValue
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = permissionGroups?.flatMap((p) =>
        p?.permissions?.map((grant: any) => ({
          name: grant.name,
          isGranted: grant.isGranted,
        }))
      )

      const requestPayload: UpdatePermissionsDto = {
        permissions: payload,
      }

      const _result = await permissionsUpdate({
        query: {
          providerName: entityType === 'role' ? PermissionProvider.R : PermissionProvider.U,
          providerKey: entityType === 'user' && userExists.data?.id ? userExists.data.id : entityId,
        },
        body: requestPayload,
      })

      toast({
        title: 'Success',
        description: 'Permissions updated successfully',
        variant: 'default',
      })

      queryClient.invalidateQueries({
        queryKey: [entityType === 'role' ? PermissionProvider.R : PermissionProvider.U],
      })

      setHasChanges(false)
    } catch (err: unknown) {
      console.error('Error updating permissions:', err)
      toast({
        title: 'Error',
        description: 'Failed to update permissions. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.back()
      }
    } else {
      router.back()
    }
  }

  const totalPermissions = permissionGroups.reduce(
    (total, group) => total + (group.permissions?.length || 0),
    0
  )

  const grantedPermissions = permissionGroups.reduce(
    (total, group) => total + (group.permissions?.filter((p: any) => p.isGranted).length || 0),
    0
  )

  // Show loading state
  if (permissionsLoading || (entityType === 'user' && userExists.isLoading)) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            <span>Loading permissions...</span>
          </div>
        </div>
      </div>
    )
  }

  // Show error if user doesn't exist
  if (entityType === 'user' && userExists.data === null && !userExists.isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The user &quot;{entityId}&quot; does not exist in the system.
            </p>
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show error if permission management API is not available
  if (entityType === 'user' && userExists.data && !permissionsLoading && !data?.groups) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Permission Management Unavailable</h2>
            <p className="text-muted-foreground mb-4">
              The permission management system is currently unavailable. This might be due to:
            </p>
            <ul className="text-sm text-muted-foreground mb-6 text-left max-w-md mx-auto space-y-1">
              <li>• Backend configuration issues</li>
              <li>• Permission management module not enabled</li>
              <li>• Insufficient permissions to view user permissions</li>
            </ul>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => window.location.reload()} variant="default">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Permissions - {entityId}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage permissions for {entityType}: {entityId}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Info className="h-4 w-4" />
              Permission Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {totalPermissions}
                </div>
                <div className="text-sm text-muted-foreground">Total Permissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">
                  {grantedPermissions}
                </div>
                <div className="text-sm text-muted-foreground">Granted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                  {totalPermissions - grantedPermissions}
                </div>
                <div className="text-sm text-muted-foreground">Not Granted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grant All Toggle */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn('p-2 rounded-lg', hasAllGranted ? 'bg-green-100' : 'bg-gray-100')}
                >
                  {hasAllGranted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-base sm:text-lg">Grant All Permissions</div>
                  <div className="text-sm text-muted-foreground">
                    {hasAllGranted
                      ? 'All permissions are granted'
                      : 'Some permissions are not granted'}
                  </div>
                </div>
              </div>
              <Button
                variant={hasAllGranted ? 'outline' : 'default'}
                onClick={handleGrantAll}
                disabled={hasAdmin}
                className="w-full sm:w-auto sm:min-w-[120px]"
              >
                {hasAllGranted ? 'Revoke All' : 'Grant All'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {hasAdmin && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Admin permissions cannot be modified for security reasons.
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {!hasAllGranted && (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 sm:h-9 text-sm"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Permission Groups Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border rounded-md">
                <TabsList className="flex w-full h-auto p-1 flex-wrap gap-1">
                  {filteredGroups.map((group) => (
                    <TabsTrigger
                      key={group.displayName}
                      value={group.displayName || ''}
                      className="flex items-center gap-1 px-3 py-2 text-xs flex-shrink-0"
                    >
                      {getManagementIcon(group.displayName || '')}
                      <span className="hidden sm:inline">{group.displayName}</span>
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {group.permissions?.filter((p: any) => p.isGranted).length || 0}/
                        {group.permissions?.length || 0}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {filteredGroups.map((group) => (
                <TabsContent key={group.displayName} value={group.displayName || ''}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                          {getManagementIcon(group.displayName || '')}
                          <span className="text-base sm:text-lg">{group.displayName}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            'self-start sm:ml-auto',
                            getManagementColor(group.displayName || '')
                          )}
                        >
                          {group.permissions?.filter((p: any) => p.isGranted).length || 0} granted
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6">
                      <ScrollArea className="h-[400px] sm:h-[500px] pr-4">
                        <div className="space-y-2 p-4 sm:p-0">
                          {group.permissions?.map((permission: any, _idx: number) => (
                            <div
                              key={permission.name}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    'p-1 rounded flex-shrink-0',
                                    permission.isGranted ? 'bg-green-100' : 'bg-gray-100'
                                  )}
                                >
                                  {permission.isGranted ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium text-sm sm:text-base truncate">
                                    {getTranslatedPermissionName(permission.name)}
                                  </div>
                                  <div className="text-xs sm:text-sm text-muted-foreground truncate">
                                    {permission.name}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant={permission.isGranted ? 'outline' : 'default'}
                                size="sm"
                                onClick={() => {
                                  permission.isGranted = !permission.isGranted
                                  setPermissionGroups([...permissionGroups])
                                  handlePermissionChange()
                                }}
                                disabled={hasAdmin}
                                className="w-full sm:w-auto"
                              >
                                {permission.isGranted ? 'Revoke' : 'Grant'}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 sm:p-6 z-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {hasChanges && (
                <div className="flex items-center gap-1 text-orange-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Unsaved changes</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={onSubmit}
                disabled={isLoading || !hasChanges}
                className="flex-1 sm:flex-none sm:min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
