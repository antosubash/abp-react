/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordInput } from '../models/ChangePasswordInput';
import type { ProfileDto } from '../models/ProfileDto';
import type { UpdateProfileDto } from '../models/UpdateProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfileService {

    /**
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public static profileGet(): CancelablePromise<ProfileDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/my-profile',
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
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public static profileUpdate(
        requestBody?: UpdateProfileDto,
    ): CancelablePromise<ProfileDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/account/my-profile',
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
    public static profileChangePassword(
        requestBody?: ChangePasswordInput,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/my-profile/change-password',
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
