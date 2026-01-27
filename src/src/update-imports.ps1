# Update imports script
# This script will help update all the import paths systematically

# Map of old imports to new imports
$oldToNew = @{
    '@/components/ui/' = '@/shared/components/ui/'
    '@/components/analytics/' = '@/shared/components/analytics/'
    '@/components/navbar/' = '@/shared/components/navigation/'
    '@/layout/' = '@/shared/components/layout/'
    '@/lib/hooks/' = '@/shared/hooks/'
    '@/lib/provider/' = '@/shared/lib/provider/'
    '@/lib/auth' = '@/shared/lib/auth'
    '@/lib/utils' = '@/shared/lib/utils'
    '@/lib/actions' = '@/shared/lib/actions'
    '@/lib/error-handling' = '@/shared/lib/error-handling'
    '@/lib/puck-error-handler' = '@/shared/lib/puck-error-handler'
    '@/lib/redis' = '@/shared/lib/redis'
    '@/lib/session-utils' = '@/shared/lib/session-utils'
    '@/lib/hooks/useUsers' = '@/features/user-management/hooks/useUsers'
    '@/lib/hooks/useCurrentUser' = '@/features/user-management/hooks/useCurrentUser'
    '@/lib/hooks/useUserExists' = '@/features/user-management/hooks/useUserExists'
    '@/lib/hooks/useUserRoles' = '@/features/user-management/hooks/useUserRoles'
    '@/lib/hooks/useRoles' = '@/features/role-management/hooks/useRoles'
    '@/lib/hooks/useAssignableRoles' = '@/features/role-management/hooks/useAssignableRoles'
    '@/lib/hooks/useTenants' = '@/features/tenant-management/hooks/useTenants'
    '@/lib/hooks/usePages' = '@/features/cms/hooks/usePages'
    '@/lib/hooks/useComments' = '@/features/comments/hooks/useComments'
    '@/lib/hooks/usePublicComments' = '@/features/comments/hooks/usePublicComments'
    '@/lib/hooks/usePermissions' = '@/features/permissions/hooks/usePermissions'
    '@/lib/hooks/useGrantedPolicies' = '@/features/permissions/hooks/useGrantedPolicies'
    '@/lib/hooks/useFeatures' = '@/features/settings/hooks/useFeatures'
    '@/lib/hooks/useEmailing' = '@/features/settings/hooks/useEmailing'
    '@/lib/hooks/useProfile' = '@/features/auth/hooks/useProfile'
    '@/lib/hooks/useQueryConstants' = '@/shared/hooks/QueryConstants'
    '@/lib/hooks/useAppConfig' = '@/shared/hooks/useAppConfig'
    '@/lib/hooks/useTranslation' = '@/shared/hooks/useTranslation'
    '@/lib/hooks/useMenuItems' = '@/shared/hooks/useMenuItems'
    '@/components/user/' = '@/features/user-management/components/user/'
    '@/components/role/' = '@/features/role-management/components/role/'
    '@/components/tenant/' = '@/features/tenant-management/components/tenant/'
    '@/components/page/' = '@/features/cms/components/page/'
    '@/components/comment/' = '@/features/comments/components/comment/'
    '@/components/permission/' = '@/features/permissions/components/permission/'
    '@/components/settings/' = '@/features/settings/components/settings/'
    '@/components/puck/' = '@/features/cms/components/puck/'
    '@/components/Login' = '@/features/auth/components/Login'
    '@/components/profile/' = '@/features/auth/components/profile/'
    '@/components/menu/' = '@/shared/components/menu/'
    '@/components/sections/' = '@/shared/components/sections/'
    '@/components/version-display' = '@/shared/components/version-display'
}

Write-Host "Import update mapping created. Manual editing required for each file."
Write-Host "Key mappings to update:"
foreach ($key in $oldToNew.Keys) {
    Write-Host "$key -> $($oldToNew[$key])"
}