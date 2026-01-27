import { useCallback } from 'react'

import { useAppConfig } from '@/shared/hooks/useAppConfig'

/**
 * Represents the various policies that can be granted within the application.
 *
 * The available policies are organized by functional groups:
 *
 * **Identity Management (AbpIdentity)**
 * - `AbpIdentity.Roles`: Manage roles
 * - `AbpIdentity.Roles.Create`: Create new roles
 * - `AbpIdentity.Roles.Update`: Update existing roles
 * - `AbpIdentity.Roles.Delete`: Delete roles
 * - `AbpIdentity.Roles.ManagePermissions`: Manage permissions for roles
 * - `AbpIdentity.Users`: Manage users
 * - `AbpIdentity.Users.Create`: Create new users
 * - `AbpIdentity.Users.Update`: Update existing users
 * - `AbpIdentity.Users.Update.ManageRoles`: Manage roles for users
 * - `AbpIdentity.Users.Delete`: Delete users
 * - `AbpIdentity.Users.ManagePermissions`: Manage permissions for users
 *
 * **Tenant Management (AbpTenantManagement)**
 * - `AbpTenantManagement.Tenants`: Manage tenants
 * - `AbpTenantManagement.Tenants.Create`: Create new tenants
 * - `AbpTenantManagement.Tenants.Update`: Update existing tenants
 * - `AbpTenantManagement.Tenants.Delete`: Delete tenants
 * - `AbpTenantManagement.Tenants.ManageFeatures`: Manage features for tenants
 * - `AbpTenantManagement.Tenants.ManageConnectionStrings`: Manage connection strings for tenants
 *
 * **Feature Management (FeatureManagement)**
 * - `FeatureManagement.ManageHostFeatures`: Manage host features
 *
 * **Setting Management (SettingManagement)**
 * - `SettingManagement.Emailing`: Manage emailing settings
 * - `SettingManagement.Emailing.Test`: Test emailing settings
 * - `SettingManagement.TimeZone`: Manage time zone settings
 *
 * **CmsKit Public (CmsKitPublic)**
 * - `CmsKitPublic.Comments`: Comment management
 * - `CmsKitPublic.Comments.DeleteAll`: Delete all comments
 *
 * **CmsKit Admin (CmsKit)**
 * - `CmsKit.Comments`: Comment management
 * - `CmsKit.Comments.Delete`: Delete comments
 * - `CmsKit.Comments.Update`: Update comments
 * - `CmsKit.Comments.SettingManagement`: Comment setting management
 * - `CmsKit.Tags`: Tag management
 * - `CmsKit.Tags.Create`: Create tags
 * - `CmsKit.Tags.Update`: Update tags
 * - `CmsKit.Tags.Delete`: Delete tags
 * - `CmsKit.Pages`: Page management
 * - `CmsKit.Pages.Create`: Create pages
 * - `CmsKit.Pages.Update`: Update pages
 * - `CmsKit.Pages.Delete`: Delete pages
 * - `CmsKit.Pages.SetAsHomePage`: Set page as home page
 * - `CmsKit.Blogs`: Blog management
 * - `CmsKit.Blogs.Create`: Create blogs
 * - `CmsKit.Blogs.Update`: Update blogs
 * - `CmsKit.Blogs.Delete`: Delete blogs
 * - `CmsKit.Blogs.Features`: Blog features management
 * - `CmsKit.BlogPosts`: Blog post management
 * - `CmsKit.BlogPosts.Create`: Create blog posts
 * - `CmsKit.BlogPosts.Update`: Update blog posts
 * - `CmsKit.BlogPosts.Delete`: Delete blog posts
 * - `CmsKit.BlogPosts.Publish`: Publish blog posts
 * - `CmsKit.Menus`: Menu management
 * - `CmsKit.Menus.Create`: Create menus
 * - `CmsKit.Menus.Update`: Update menus
 * - `CmsKit.Menus.Delete`: Delete menus
 * - `CmsKit.GlobalResources`: Global resources management
 *
 * **Template (AbpTemplate)**
 * - `AbpTemplate.Tenant`: Template tenant management
 * - `AbpTemplate.Tenant.AddHost`: Add host to template tenant
 */
export type Policy =
  // Identity Management
  | 'AbpIdentity.Roles'
  | 'AbpIdentity.Roles.Create'
  | 'AbpIdentity.Roles.Update'
  | 'AbpIdentity.Roles.Delete'
  | 'AbpIdentity.Roles.ManagePermissions'
  | 'AbpIdentity.Users'
  | 'AbpIdentity.Users.Create'
  | 'AbpIdentity.Users.Update'
  | 'AbpIdentity.Users.Update.ManageRoles'
  | 'AbpIdentity.Users.Delete'
  | 'AbpIdentity.Users.ManagePermissions'
  // Tenant Management
  | 'AbpTenantManagement.Tenants'
  | 'AbpTenantManagement.Tenants.Create'
  | 'AbpTenantManagement.Tenants.Update'
  | 'AbpTenantManagement.Tenants.Delete'
  | 'AbpTenantManagement.Tenants.ManageFeatures'
  | 'AbpTenantManagement.Tenants.ManageConnectionStrings'
  // Feature Management
  | 'FeatureManagement.ManageHostFeatures'
  // Setting Management
  | 'SettingManagement.Emailing'
  | 'SettingManagement.Emailing.Test'
  | 'SettingManagement.TimeZone'
  // CmsKit Public
  | 'CmsKitPublic.Comments'
  | 'CmsKitPublic.Comments.DeleteAll'
  // CmsKit Admin
  | 'CmsKit.Comments'
  | 'CmsKit.Comments.Delete'
  | 'CmsKit.Comments.Update'
  | 'CmsKit.Comments.SettingManagement'
  | 'CmsKit.Tags'
  | 'CmsKit.Tags.Create'
  | 'CmsKit.Tags.Update'
  | 'CmsKit.Tags.Delete'
  | 'CmsKit.Pages'
  | 'CmsKit.Pages.Create'
  | 'CmsKit.Pages.Update'
  | 'CmsKit.Pages.Delete'
  | 'CmsKit.Pages.SetAsHomePage'
  | 'CmsKit.Blogs'
  | 'CmsKit.Blogs.Create'
  | 'CmsKit.Blogs.Update'
  | 'CmsKit.Blogs.Delete'
  | 'CmsKit.Blogs.Features'
  | 'CmsKit.BlogPosts'
  | 'CmsKit.BlogPosts.Create'
  | 'CmsKit.BlogPosts.Update'
  | 'CmsKit.BlogPosts.Delete'
  | 'CmsKit.BlogPosts.Publish'
  | 'CmsKit.Menus'
  | 'CmsKit.Menus.Create'
  | 'CmsKit.Menus.Update'
  | 'CmsKit.Menus.Delete'
  | 'CmsKit.GlobalResources'
  // Template
  | 'AbpTemplate.Tenant'
  | 'AbpTemplate.Tenant.AddHost'

/**
 * Custom hook to check if a specific policy is granted.
 *
 * This hook uses the application configuration to determine if a given policy is granted.
 *
 * @returns An object with a `can` function that takes a policy key and returns a boolean indicating if the policy is granted.
 *
 * @example
 * const { can } = useGrantedPolicies();
 * const hasPolicy = can('somePolicyKey');
 *
 * @function
 * @name useGrantedPolicies
 */
export const useGrantedPolicies = () => {
  const { data } = useAppConfig()

  const can = useCallback(
    (key: Policy): boolean => {
      if (data?.auth?.grantedPolicies && !!data.auth.grantedPolicies[key]) return true
      return false
    },
    [data?.auth?.grantedPolicies]
  )
  return { can }
}
