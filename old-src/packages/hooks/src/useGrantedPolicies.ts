import { useCallback } from 'react';

import { useAppConfig } from './useAppConfig';

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
    | 'SettingManagement.Emailing.Test';

export const useGrantedPolicies = () => {
    const { data } = useAppConfig();

    const can = useCallback(
        (key: Policy): boolean => {
            if (data?.auth?.grantedPolicies && !!data.auth.grantedPolicies[key])
                return true;
            return false;
        },
        [data?.auth?.grantedPolicies]
    );
    return { can };
};
