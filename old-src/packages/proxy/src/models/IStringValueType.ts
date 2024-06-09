/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IValueValidator } from './IValueValidator';

export type IStringValueType = {
    readonly name?: string | null;
    readonly properties?: Record<string, any> | null;
    validator?: IValueValidator;
};

