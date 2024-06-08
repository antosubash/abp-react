/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationLocalizationDto } from '../models/ApplicationLocalizationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AbpApplicationLocalizationService {

    /**
     * @param cultureName
     * @param onlyDynamics
     * @returns ApplicationLocalizationDto Success
     * @throws ApiError
     */
    public static abpApplicationLocalizationGet(
        cultureName: string,
        onlyDynamics?: boolean,
    ): CancelablePromise<ApplicationLocalizationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/application-localization',
            query: {
                'CultureName': cultureName,
                'OnlyDynamics': onlyDynamics,
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
