/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IdentityUserDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    tenantId?: string | null;
    userName?: string | null;
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    emailConfirmed?: boolean;
    phoneNumber?: string | null;
    phoneNumberConfirmed?: boolean;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    lockoutEnd?: string | null;
    concurrencyStamp?: string | null;
};

