/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdentityUserCreateDto } from '../models/IdentityUserCreateDto';
import type { IdentityUserDto } from '../models/IdentityUserDto';
import type { IdentityUserUpdateDto } from '../models/IdentityUserUpdateDto';
import type { IdentityUserUpdateRolesDto } from '../models/IdentityUserUpdateRolesDto';
import type { ListResultDtoOfIdentityRoleDto } from '../models/ListResultDtoOfIdentityRoleDto';
import type { PagedResultDtoOfIdentityUserDto } from '../models/PagedResultDtoOfIdentityUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param id
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public static userGet(
        id: string,
    ): CancelablePromise<IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public static userUpdate(
        id: string,
        requestBody?: IdentityUserUpdateDto,
    ): CancelablePromise<IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static userDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param filter
     * @param sorting
     * @param skipCount
     * @param maxResultCount
     * @returns PagedResultDtoOfIdentityUserDto Success
     * @throws ApiError
     */
    public static userGetList(
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    ): CancelablePromise<PagedResultDtoOfIdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users',
            query: {
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public static userCreate(
        requestBody?: IdentityUserCreateDto,
    ): CancelablePromise<IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id
     * @returns ListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public static userGetRoles(
        id: string,
    ): CancelablePromise<ListResultDtoOfIdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/{id}/roles',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static userUpdateRoles(
        id: string,
        requestBody?: IdentityUserUpdateRolesDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/users/{id}/roles',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns ListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public static userGetAssignableRoles(): CancelablePromise<ListResultDtoOfIdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/assignable-roles',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param userName
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public static userFindByUsername(
        userName: string,
    ): CancelablePromise<IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/by-username/{userName}',
            path: {
                'userName': userName,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param email
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public static userFindByEmail(
        email: string,
    ): CancelablePromise<IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/by-email/{email}',
            path: {
                'email': email,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

}
