/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailSettingsDto } from '../models/EmailSettingsDto';
import type { SendTestEmailInput } from '../models/SendTestEmailInput';
import type { UpdateEmailSettingsDto } from '../models/UpdateEmailSettingsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EmailSettingsService {

    /**
     * @returns EmailSettingsDto Success
     * @throws ApiError
     */
    public static emailSettingsGet(): CancelablePromise<EmailSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/setting-management/emailing',
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
     * @returns any Success
     * @throws ApiError
     */
    public static emailSettingsUpdate(
        requestBody?: UpdateEmailSettingsDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/emailing',
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
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static emailSettingsSendTestEmail(
        requestBody?: SendTestEmailInput,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/emailing/send-test-email',
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

}
