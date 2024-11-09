import { useCallback } from 'react'

import { useAppConfig } from './useAppConfig'

/**
 * Represents the various policies that can be granted within the application.
 * 
 * The available policies include:
 * - `AbpIdentity.Roles`: Manage roles.
 * - `AbpIdentity.Roles.Create`: Create new roles.
 * - `AbpIdentity.Roles.Update`: Update existing roles.
 * - `AbpIdentity.Roles.Delete`: Delete roles.
 * - `AbpIdentity.Roles.ManagePermissions`: Manage permissions for roles.
 * - `AbpIdentity.Users`: Manage users.
 * - `AbpIdentity.Users.Create`: Create new users.
 * - `AbpIdentity.Users.Update`: Update existing users.
 * - `AbpIdentity.Users.Delete`: Delete users.
 * - `AbpIdentity.Users.ManagePermissions`: Manage permissions for users.
 * - `AbpTenantManagement.Tenants`: Manage tenants.
 * - `AbpTenantManagement.Tenants.Create`: Create new tenants.
 * - `AbpTenantManagement.Tenants.Update`: Update existing tenants.
 * - `AbpTenantManagement.Tenants.Delete`: Delete tenants.
 * - `AbpTenantManagement.Tenants.ManageFeatures`: Manage features for tenants.
 * - `AbpTenantManagement.Tenants.ManageConnectionStrings`: Manage connection strings for tenants.
 * - `FeatureManagement.ManageHostFeatures`: Manage host features.
 * - `SettingManagement.Emailing`: Manage emailing settings.
 * - `SettingManagement.Emailing.Test`: Test emailing settings.
 */
export type Policy =
  | 'AbpIdentity.Roles'
  | 'AbpIdentity.Roles.Create'
  | 'AbpIdentity.Roles.Update'
  | 'AbpIdentity.Roles.Delete'
  | 'AbpIdentity.Roles.ManagePermissions'
  | 'AbpIdentity.Users'
  | 'AbpIdentity.Users.Create'
  | 'AbpIdentity.Users.Update'
  | 'AbpIdentity.Users.Delete'
  | 'AbpIdentity.Users.ManagePermissions'
  | 'AbpTenantManagement.Tenants'
  | 'AbpTenantManagement.Tenants.Create'
  | 'AbpTenantManagement.Tenants.Update'
  | 'AbpTenantManagement.Tenants.Delete'
  | 'AbpTenantManagement.Tenants.ManageFeatures'
  | 'AbpTenantManagement.Tenants.ManageConnectionStrings'
  | 'FeatureManagement.ManageHostFeatures'
  | 'SettingManagement.Emailing'
  | 'SettingManagement.Emailing.Test'

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
