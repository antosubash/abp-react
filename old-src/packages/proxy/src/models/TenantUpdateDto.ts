/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TenantUpdateDto = {
    readonly extraProperties?: Record<string, any> | null;
    name: string;
    concurrencyStamp?: string | null;
};

