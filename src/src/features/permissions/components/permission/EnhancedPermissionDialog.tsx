import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { 
  Shield, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Settings, 
  Building, 
  Zap,
  Filter,
  Save,
  X,
  AlertTriangle,
  Info
} from 'lucide-react'

import {
  IdentityRoleUpdateDto,
  IdentityUserUpdateDto,
  PermissionGrantInfoDto,
  PermissionGroupDto,
  UpdatePermissionsDto,
  permissionsUpdate,
} from '@/client'
import { usePermissions } from '@/features/permissions/hooks/usePermissions'
import { useUserRoles } from '@/features/user-management/hooks/useUserRoles'
import { PermissionProvider, USER_ROLE } from '@/shared/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { TogglePermission } from './TogglePermission'
import { Button } from '@/shared/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Separator } from '@/shared/components/ui/separator'
import { useToast } from '@/shared/components/ui/use-toast'
import { cn } from '@/shared/lib/utils'

type Management = 'identity' | 'tenant' | 'setting' | 'feature'

interface EnhancedPermissionDialogProps {
  entity: IdentityRoleUpdateDto | IdentityUserUpdateDto
  entityType: 'role' | 'user'
  onDismiss: () => void
}

const getManagementIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'identity':
      return <Users className="h-4 w-4" />
    case 'tenant':
      return <Building className="h-4 w-4" />
    case 'setting':
      return <Settings className="h-4 w-4" />
    case 'feature':
      return <Zap className="h-4 w-4" />
    default:
      return <Shield className="h-4 w-4" />
  }
}

const getManagementColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'identity':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'tenant':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'setting':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'feature':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const EnhancedPermissionDialog = ({ 
  entity, 
  entityType, 
  onDismiss 
}: EnhancedPermissionDialogProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<string>('')
  const [hasAllGranted, setHasAllGranted] = useState(false)
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const userId = entityType === 'user' ? (entity as IdentityUserUpdateDto).userName : ''
  const userRoles = useUserRoles({ userId })
  
  const { data, isLoading: permissionsLoading } = usePermissions(
    entityType === 'role' ? PermissionProvider.R : PermissionProvider.U,
    entityType === 'role' ? (entity as IdentityRoleUpdateDto).name : userId!
  )

  useEffect(() => {
    setOpen(true)
    return () => {
      queryClient.invalidateQueries({ 
        queryKey: [entityType === 'role' ? PermissionProvider.R : PermissionProvider.U] 
      })
    }
  }, [entityType, queryClient])

  useEffect(() => {
    if (data?.groups) {
      setPermissionGroups([...data.groups])
      if (data.groups.length > 0) {
        setActiveTab(data.groups[0].displayName || '')
      }
    }
  }, [data])

  useEffect(() => {
    if (permissionGroups.length > 0) {
      const allGranted = permissionGroups
        .map((g) => g.permissions?.every((p) => p.isGranted))
        .every((e) => e)
      setHasAllGranted(allGranted)
    }
  }, [permissionGroups])

  const hasAdmin = useMemo(() => {
    if (entityType === 'role') {
      return (entity as IdentityRoleUpdateDto).name.includes(USER_ROLE.ADMIN)
    } else {
      return userRoles?.data?.items?.some(role => role.name?.includes(USER_ROLE.ADMIN)) || false
    }
  }, [entity, entityType, userRoles])

  const filteredGroups = useMemo(() => {
    if (!searchTerm) return permissionGroups
    
    return permissionGroups.map(group => ({
      ...group,
      permissions: group.permissions?.filter(permission =>
        permission.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.permissions && group.permissions.length > 0)
  }, [permissionGroups, searchTerm])

  const handlePermissionChange = useCallback(() => {
    setHasChanges(true)
  }, [])

  const handleGrantAll = useCallback(() => {
    setHasAllGranted(prev => {
      const newValue = !prev
      setPermissionGroups(groups => 
        groups.map(group => ({
          ...group,
          permissions: group.permissions?.map(permission => ({
            ...permission,
            isGranted: newValue
          }))
        }))
      )
      setHasChanges(true)
      return newValue
    })
  }, [])

  const onCloseEvent = useCallback(() => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        setOpen(false)
        onDismiss()
      }
    } else {
      setOpen(false)
      onDismiss()
    }
  }, [hasChanges, onDismiss])

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
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
      
      await permissionsUpdate({
        query: { 
          providerKey: entityType === 'role' ? PermissionProvider.R : PermissionProvider.U, 
          providerName: entityType === 'role' ? (entity as IdentityRoleUpdateDto).name : userId! 
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
      onCloseEvent()
    } catch (err: unknown) {
      toast({
        title: 'Error',
        description: 'Failed to update permissions. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [permissionGroups, entityType, entity, userId, queryClient, toast, onCloseEvent])

  const entityName = entityType === 'role' 
    ? (entity as IdentityRoleUpdateDto).name 
    : (entity as IdentityUserUpdateDto).userName

  const totalPermissions = permissionGroups.reduce((total, group) => 
    total + (group.permissions?.length || 0), 0
  )
  
  const grantedPermissions = permissionGroups.reduce((total, group) => 
    total + (group.permissions?.filter(p => p.isGranted).length || 0), 0
  )

  if (permissionsLoading) {
    return (
      <Dialog open={open} onOpenChange={onCloseEvent}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Loading Permissions...
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Loading permissions...</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

     return (
     <Dialog open={open} onOpenChange={onCloseEvent}>
       <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] sm:max-h-[90vh] p-4 sm:p-6">
         <DialogHeader className="space-y-2">
           <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
             <Shield className="h-5 w-5" />
             Permissions - {entityName}
           </DialogTitle>
           <DialogDescription className="text-sm">
             Manage permissions for {entityType === 'role' ? 'role' : 'user'}: {entityName}
           </DialogDescription>
         </DialogHeader>

                 <div className="space-y-3 sm:space-y-4">
           {/* Summary Stats */}
           <Card>
             <CardHeader className="pb-3">
               <CardTitle className="text-sm font-medium flex items-center gap-2">
                 <Info className="h-4 w-4" />
                 Permission Summary
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-3 gap-2 sm:gap-4">
                 <div className="text-center">
                   <div className="text-xl sm:text-2xl font-bold text-primary">{totalPermissions}</div>
                   <div className="text-xs text-muted-foreground">Total</div>
                 </div>
                 <div className="text-center">
                   <div className="text-xl sm:text-2xl font-bold text-green-600">{grantedPermissions}</div>
                   <div className="text-xs text-muted-foreground">Granted</div>
                 </div>
                 <div className="text-center">
                   <div className="text-xl sm:text-2xl font-bold text-orange-600">{totalPermissions - grantedPermissions}</div>
                   <div className="text-xs text-muted-foreground">Not Granted</div>
                 </div>
               </div>
             </CardContent>
           </Card>

                     {/* Grant All Toggle */}
           <Card>
             <CardContent className="pt-4 sm:pt-6">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                 <div className="flex items-center gap-3">
                   <div className={cn(
                     "p-2 rounded-lg",
                     hasAllGranted ? "bg-green-100" : "bg-gray-100"
                   )}>
                     {hasAllGranted ? (
                       <CheckCircle2 className="h-5 w-5 text-green-600" />
                     ) : (
                       <XCircle className="h-5 w-5 text-gray-600" />
                     )}
                   </div>
                   <div>
                     <div className="font-medium text-sm sm:text-base">Grant All Permissions</div>
                     <div className="text-xs sm:text-sm text-muted-foreground">
                       {hasAllGranted ? 'All permissions are granted' : 'Some permissions are not granted'}
                     </div>
                   </div>
                 </div>
                 <Button
                   variant={hasAllGranted ? "outline" : "default"}
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
               <CardContent className="pt-4 sm:pt-6">
                 <div className="flex items-center gap-2 text-orange-800">
                   <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                   <span className="text-xs sm:text-sm font-medium">
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
                         className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs flex-shrink-0"
                       >
                         {getManagementIcon(group.displayName || '')}
                         <span className="hidden xs:inline">{group.displayName}</span>
                         <Badge variant="secondary" className="ml-1 text-xs">
                           {group.permissions?.filter(p => p.isGranted).length || 0}/{group.permissions?.length || 0}
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
                             <span className="text-sm sm:text-base">{group.displayName}</span>
                           </div>
                           <Badge 
                             variant="outline" 
                             className={cn("self-start sm:ml-auto", getManagementColor(group.displayName || ''))}
                           >
                             {group.permissions?.filter(p => p.isGranted).length || 0} granted
                           </Badge>
                         </CardTitle>
                       </CardHeader>
                       <CardContent className="p-0 sm:p-6">
                         <ScrollArea className="h-[250px] sm:h-[300px] pr-4">
                           <div className="space-y-2 p-4 sm:p-0">
                             {group.permissions?.map((permission, idx) => (
                               <div key={permission.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors gap-3">
                                 <div className="flex items-center gap-3">
                                   <div className={cn(
                                     "p-1 rounded flex-shrink-0",
                                     permission.isGranted ? "bg-green-100" : "bg-gray-100"
                                   )}>
                                     {permission.isGranted ? (
                                       <CheckCircle2 className="h-4 w-4 text-green-600" />
                                     ) : (
                                       <XCircle className="h-4 w-4 text-gray-400" />
                                     )}
                                   </div>
                                   <div className="min-w-0 flex-1">
                                     <div className="font-medium text-sm sm:text-base truncate">{permission.displayName}</div>
                                     <div className="text-xs sm:text-sm text-muted-foreground truncate">{permission.name}</div>
                                   </div>
                                 </div>
                                 <Button
                                   variant={permission.isGranted ? "outline" : "default"}
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

                 <DialogFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
           <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
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
               onClick={onCloseEvent} 
               disabled={isLoading}
               className="flex-1 sm:flex-none"
             >
               Cancel
             </Button>
             <Button 
               type="submit" 
               onClick={onSubmit}
               disabled={isLoading || !hasChanges}
               className="flex-1 sm:flex-none sm:min-w-[100px]"
             >
               {isLoading ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
         </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
