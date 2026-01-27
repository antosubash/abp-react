# PowerShell script to update all import paths
$files = Get-ChildItem -Path . -Recurse -Include "*.tsx","*.ts" | Where-Object { $_.FullName -notlike "*node_modules*" }

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace component imports
    $content = $content -replace '@/components/ui/', '@/shared/components/ui/'
    $content = $content -replace '@/components/analytics/', '@/shared/components/analytics/'
    $content = $content -replace '@/components/navbar/', '@/shared/components/navigation/'
    $content = $content -replace '@/layout/', '@/shared/components/layout/'
    $content = $content -replace '@/components/user/', '@/features/user-management/components/user/'
    $content = $content -replace '@/components/role/', '@/features/role-management/components/role/'
    $content = $content -replace '@/components/tenant/', '@/features/tenant-management/components/tenant/'
    $content = $content -replace '@/components/page/', '@/features/cms/components/page/'
    $content = $content -replace '@/components/comment/', '@/features/comments/components/comment/'
    $content = $content -replace '@/components/permission/', '@/features/permissions/components/permission/'
    $content = $content -replace '@/components/settings/', '@/features/settings/components/settings/'
    $content = $content -replace '@/components/puck/', '@/features/cms/components/puck/'
    $content = $content -replace '@/components/Login', '@/features/auth/components/Login'
    $content = $content -replace '@/components/profile/', '@/features/auth/components/profile/'
    $content = $content -replace '@/components/menu/', '@/shared/components/menu/'
    $content = $content -replace '@/components/sections/', '@/shared/components/sections/'
    $content = $content -replace '@/components/version-display', '@/shared/components/version-display'
    
    # Replace lib imports
    $content = $content -replace '@/lib/hooks/', '@/shared/hooks/'
    $content = $content -replace '@/lib/provider/', '@/shared/lib/provider/'
    $content = $content -replace '@/lib/auth', '@/shared/lib/auth'
    $content = $content -replace '@/lib/utils', '@/shared/lib/utils'
    $content = $content -replace '@/lib/actions', '@/shared/lib/actions'
    $content = $content -replace '@/lib/error-handling', '@/shared/lib/error-handling'
    $content = $content -replace '@/lib/puck-error-handler', '@/shared/lib/puck-error-handler'
    $content = $content -replace '@/lib/redis', '@/shared/lib/redis'
    $content = $content -replace '@/lib/session-utils', '@/shared/lib/session-utils'
    
    # Replace specific hooks that moved to features
    $content = $content -replace '@/shared/hooks/useUsers', '@/features/user-management/hooks/useUsers'
    $content = $content -replace '@/shared/hooks/useCurrentUser', '@/features/user-management/hooks/useCurrentUser'
    $content = $content -replace '@/shared/hooks/useUserExists', '@/features/user-management/hooks/useUserExists'
    $content = $content -replace '@/shared/hooks/useUserRoles', '@/features/user-management/hooks/useUserRoles'
    $content = $content -replace '@/shared/hooks/useRoles', '@/features/role-management/hooks/useRoles'
    $content = $content -replace '@/shared/hooks/useAssignableRoles', '@/features/role-management/hooks/useAssignableRoles'
    $content = $content -replace '@/shared/hooks/useTenants', '@/features/tenant-management/hooks/useTenants'
    $content = $content -replace '@/shared/hooks/usePages', '@/features/cms/hooks/usePages'
    $content = $content -replace '@/shared/hooks/useComments', '@/features/comments/hooks/useComments'
    $content = $content -replace '@/shared/hooks/usePublicComments', '@/features/comments/hooks/usePublicComments'
    $content = $content -replace '@/shared/hooks/usePermissions', '@/features/permissions/hooks/usePermissions'
    $content = $content -replace '@/shared/hooks/useGrantedPolicies', '@/features/permissions/hooks/useGrantedPolicies'
    $content = $content -replace '@/shared/hooks/useFeatures', '@/features/settings/hooks/useFeatures'
    $content = $content -replace '@/shared/hooks/useEmailing', '@/features/settings/hooks/useEmailing'
    $content = $content -replace '@/shared/hooks/useProfile', '@/features/auth/hooks/useProfile'
    $content = $content -replace '@/shared/hooks/QueryConstants', '@/shared/hooks/QueryConstants'
    $content = $content -replace '@/shared/hooks/useAppConfig', '@/shared/hooks/useAppConfig'
    $content = $content -replace '@/shared/hooks/useTranslation', '@/shared/hooks/useTranslation'
    $content = $content -replace '@/shared/hooks/useMenuItems', '@/shared/hooks/useMenuItems'
    
    # Only write back if content changed
    $originalContent = Get-Content -Path $file.FullName -Raw
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "Import path updates complete!" -ForegroundColor Cyan