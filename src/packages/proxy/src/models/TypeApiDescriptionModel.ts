/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PropertyApiDescriptionModel } from './PropertyApiDescriptionModel';

export type TypeApiDescriptionModel = {
    baseType?: string | null;
    isEnum?: boolean;
    enumNames?: Array<string> | null;
    enumValues?: Array<any> | null;
    genericArguments?: Array<string> | null;
    properties?: Array<PropertyApiDescriptionModel> | null;
};

