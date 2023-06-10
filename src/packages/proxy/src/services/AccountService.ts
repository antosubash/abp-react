/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdentityUserDto } from '../models/IdentityUserDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { SendPasswordResetCodeDto } from '../models/SendPasswordResetCodeDto';
import type { VerifyPasswordResetTokenInput } from '../models/VerifyPasswordResetTokenInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * @param requestBody
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public static accountRegister(
        requestBody?: RegisterDto,
    ): CancelablePromise<IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/register',
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
    public static accountSendPasswordResetCode(
        requestBody?: SendPasswordResetCodeDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/send-password-reset-code',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static accountVerifyPasswordResetToken(
        requestBody?: VerifyPasswordResetTokenInput,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/verify-password-reset-token',
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
    public static accountResetPassword(
        requestBody?: ResetPasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/reset-password',
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
