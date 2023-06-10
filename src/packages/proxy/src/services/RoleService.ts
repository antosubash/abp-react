/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdentityRoleCreateDto } from '../models/IdentityRoleCreateDto';
import type { IdentityRoleDto } from '../models/IdentityRoleDto';
import type { IdentityRoleUpdateDto } from '../models/IdentityRoleUpdateDto';
import type { ListResultDtoOfIdentityRoleDto } from '../models/ListResultDtoOfIdentityRoleDto';
import type { PagedResultDtoOfIdentityRoleDto } from '../models/PagedResultDtoOfIdentityRoleDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoleService {

    /**
     * @returns ListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public static roleGetAllList(): CancelablePromise<ListResultDtoOfIdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles/all',
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
     * @returns PagedResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public static roleGetList(
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    ): CancelablePromise<PagedResultDtoOfIdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles',
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
     * @returns IdentityRoleDto Success
     * @throws ApiError
     */
    public static roleCreate(
        requestBody?: IdentityRoleCreateDto,
    ): CancelablePromise<IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/roles',
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
     * @returns IdentityRoleDto Success
     * @throws ApiError
     */
    public static roleGet(
        id: string,
    ): CancelablePromise<IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles/{id}',
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
     * @returns IdentityRoleDto Success
     * @throws ApiError
     */
    public static roleUpdate(
        id: string,
        requestBody?: IdentityRoleUpdateDto,
    ): CancelablePromise<IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/roles/{id}',
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
    public static roleDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/roles/{id}',
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

}
