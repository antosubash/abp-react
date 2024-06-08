/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TenantCreateDto = {
    readonly extraProperties?: Record<string, any> | null;
    name: string;
    adminEmailAddress: string;
    adminPassword: string;
};

