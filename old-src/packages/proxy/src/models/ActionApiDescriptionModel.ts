/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MethodParameterApiDescriptionModel } from './MethodParameterApiDescriptionModel';
import type { ParameterApiDescriptionModel } from './ParameterApiDescriptionModel';
import type { ReturnValueApiDescriptionModel } from './ReturnValueApiDescriptionModel';

export type ActionApiDescriptionModel = {
    uniqueName?: string | null;
    name?: string | null;
    httpMethod?: string | null;
    url?: string | null;
    supportedVersions?: Array<string> | null;
    parametersOnMethod?: Array<MethodParameterApiDescriptionModel> | null;
    parameters?: Array<ParameterApiDescriptionModel> | null;
    returnValue?: ReturnValueApiDescriptionModel;
    allowAnonymous?: boolean | null;
    implementFrom?: string | null;
};

