/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CurrentUserDto = {
    isAuthenticated?: boolean;
    id?: string | null;
    tenantId?: string | null;
    impersonatorUserId?: string | null;
    impersonatorTenantId?: string | null;
    impersonatorUserName?: string | null;
    impersonatorTenantName?: string | null;
    userName?: string | null;
    name?: string | null;
    surName?: string | null;
    email?: string | null;
    emailVerified?: boolean;
    phoneNumber?: string | null;
    phoneNumberVerified?: boolean;
    roles?: Array<string> | null;
};

