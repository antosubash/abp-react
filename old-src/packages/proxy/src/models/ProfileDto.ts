/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProfileDto = {
    readonly extraProperties?: Record<string, any> | null;
    userName?: string | null;
    email?: string | null;
    name?: string | null;
    surname?: string | null;
    phoneNumber?: string | null;
    isExternal?: boolean;
    hasPassword?: boolean;
    concurrencyStamp?: string | null;
};

