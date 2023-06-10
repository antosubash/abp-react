/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FindTenantResultDto } from '../models/FindTenantResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AbpTenantService {

    /**
     * @param name
     * @returns FindTenantResultDto Success
     * @throws ApiError
     */
    public static abpTenantFindTenantByName(
        name: string,
    ): CancelablePromise<FindTenantResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/multi-tenancy/tenants/by-name/{name}',
            path: {
                'name': name,
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
     * @returns FindTenantResultDto Success
     * @throws ApiError
     */
    public static abpTenantFindTenantById(
        id: string,
    ): CancelablePromise<FindTenantResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/multi-tenancy/tenants/by-id/{id}',
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
