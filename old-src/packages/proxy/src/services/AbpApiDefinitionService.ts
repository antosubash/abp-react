/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationApiDescriptionModel } from '../models/ApplicationApiDescriptionModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AbpApiDefinitionService {

    /**
     * @param includeTypes
     * @returns ApplicationApiDescriptionModel Success
     * @throws ApiError
     */
    public static abpApiDefinitionGet(
        includeTypes?: boolean,
    ): CancelablePromise<ApplicationApiDescriptionModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/api-definition',
            query: {
                'IncludeTypes': includeTypes,
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
