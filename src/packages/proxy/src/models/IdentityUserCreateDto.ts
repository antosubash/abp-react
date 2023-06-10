/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IdentityUserCreateDto = {
    readonly extraProperties?: Record<string, any> | null;
    userName: string;
    name?: string | null;
    surname?: string | null;
    email: string;
    phoneNumber?: string | null;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    roleNames?: Array<string> | null;
    password: string;
};

