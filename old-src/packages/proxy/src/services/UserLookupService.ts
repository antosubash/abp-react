/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResultDtoOfUserData } from '../models/ListResultDtoOfUserData';
import type { UserData } from '../models/UserData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserLookupService {

    /**
     * @param id
     * @returns UserData Success
     * @throws ApiError
     */
    public static userLookupFindById(
        id: string,
    ): CancelablePromise<UserData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/{id}',
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
     * @param userName
     * @returns UserData Success
     * @throws ApiError
     */
    public static userLookupFindByUserName(
        userName: string,
    ): CancelablePromise<UserData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/by-username/{userName}',
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
     * @param filter
     * @param sorting
     * @param skipCount
     * @param maxResultCount
     * @returns ListResultDtoOfUserData Success
     * @throws ApiError
     */
    public static userLookupSearch(
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    ): CancelablePromise<ListResultDtoOfUserData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/search',
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
     * @param filter
     * @returns number Success
     * @throws ApiError
     */
    public static userLookupGetCount(
        filter?: string,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/count',
            query: {
                'Filter': filter,
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
