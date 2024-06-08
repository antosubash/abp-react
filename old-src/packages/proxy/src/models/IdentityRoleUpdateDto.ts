/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IdentityRoleUpdateDto = {
    readonly extraProperties?: Record<string, any> | null;
    name: string;
    isDefault?: boolean;
    isPublic?: boolean;
    concurrencyStamp?: string | null;
};

