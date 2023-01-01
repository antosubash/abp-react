/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RemoteServiceValidationErrorInfo } from './RemoteServiceValidationErrorInfo';

export type RemoteServiceErrorInfo = {
    code?: string | null;
    message?: string | null;
    details?: string | null;
    data?: Record<string, any> | null;
    validationErrors?: Array<RemoteServiceValidationErrorInfo> | null;
};

