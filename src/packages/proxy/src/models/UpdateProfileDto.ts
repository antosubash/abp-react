/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateProfileDto = {
    readonly extraProperties?: Record<string, any> | null;
    userName?: string | null;
    email?: string | null;
    name?: string | null;
    surname?: string | null;
    phoneNumber?: string | null;
    concurrencyStamp?: string | null;
};

