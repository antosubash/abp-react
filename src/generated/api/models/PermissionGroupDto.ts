/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionGrantInfoDto } from './PermissionGrantInfoDto';

export type PermissionGroupDto = {
    name?: string | null;
    displayName?: string | null;
    permissions?: Array<PermissionGrantInfoDto> | null;
};
