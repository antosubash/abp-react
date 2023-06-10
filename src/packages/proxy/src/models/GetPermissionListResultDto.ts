/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionGroupDto } from './PermissionGroupDto';

export type GetPermissionListResultDto = {
    entityDisplayName?: string | null;
    groups?: Array<PermissionGroupDto> | null;
};

