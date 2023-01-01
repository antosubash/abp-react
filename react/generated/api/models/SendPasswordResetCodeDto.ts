/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SendPasswordResetCodeDto = {
    email: string;
    appName: string;
    returnUrl?: string | null;
    returnUrlHash?: string | null;
};

