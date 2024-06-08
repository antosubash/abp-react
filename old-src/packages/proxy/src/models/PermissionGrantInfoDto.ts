/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProviderInfoDto } from './ProviderInfoDto';

export type PermissionGrantInfoDto = {
    name?: string | null;
    displayName?: string | null;
    parentName?: string | null;
    isGranted?: boolean;
    allowedProviders?: Array<string> | null;
    grantedProviders?: Array<ProviderInfoDto> | null;
};

