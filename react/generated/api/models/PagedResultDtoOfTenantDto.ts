/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TenantDto } from './TenantDto';

export type PagedResultDtoOfTenantDto = {
    items?: Array<TenantDto> | null;
    totalCount?: number;
};

