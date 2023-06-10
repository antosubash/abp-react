/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomTenantDto } from '../models/CustomTenantDto';
import type { PagedResultDtoOfTenantDto } from '../models/PagedResultDtoOfTenantDto';
import type { TenantCreateDto } from '../models/TenantCreateDto';
import type { TenantDto } from '../models/TenantDto';
import type { TenantUpdateDto } from '../models/TenantUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TenantService {

    /**
     * @param host
     * @returns string Success
     * @throws ApiError
     */
    public static tenantGetTenantGuid(
        host?: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy',
            query: {
                'host': host,
            },
        });
    }

    /**
     * @param id
     * @param host
     * @returns CustomTenantDto Success
     * @throws ApiError
     */
    public static tenantAddHost(
        id?: string,
        host?: string,
    ): CancelablePromise<CustomTenantDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/multi-tenancy',
            query: {
                'Id': id,
                'Host': host,
            },
        });
    }

    /**
     * @param id
     * @returns CustomTenantDto Success
     * @throws ApiError
     */
    public static tenantGetTenantHost(
        id: string,
    ): CancelablePromise<CustomTenantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns TenantDto Success
     * @throws ApiError
     */
    public static tenantGet(
        id: string,
    ): CancelablePromise<TenantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}',
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
     * @returns TenantDto Success
     * @throws ApiError
     */
    public static tenantUpdate(
        id: string,
        requestBody?: TenantUpdateDto,
    ): CancelablePromise<TenantDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}',
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
    public static tenantDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}',
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
     * @returns PagedResultDtoOfTenantDto Success
     * @throws ApiError
     */
    public static tenantGetList(
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    ): CancelablePromise<PagedResultDtoOfTenantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/tenants',
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
     * @returns TenantDto Success
     * @throws ApiError
     */
    public static tenantCreate(
        requestBody?: TenantCreateDto,
    ): CancelablePromise<TenantDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/multi-tenancy/tenants',
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
     * @returns string Success
     * @throws ApiError
     */
    public static tenantGetDefaultConnectionString(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
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
     * @param defaultConnectionString
     * @returns any Success
     * @throws ApiError
     */
    public static tenantUpdateDefaultConnectionString(
        id: string,
        defaultConnectionString?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
            path: {
                'id': id,
            },
            query: {
                'defaultConnectionString': defaultConnectionString,
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
     * @returns any Success
     * @throws ApiError
     */
    public static tenantDeleteDefaultConnectionString(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
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
