/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MethodParameterApiDescriptionModel } from './MethodParameterApiDescriptionModel';
import type { ReturnValueApiDescriptionModel } from './ReturnValueApiDescriptionModel';

export type InterfaceMethodApiDescriptionModel = {
    name?: string | null;
    parametersOnMethod?: Array<MethodParameterApiDescriptionModel> | null;
    returnValue?: ReturnValueApiDescriptionModel;
};

