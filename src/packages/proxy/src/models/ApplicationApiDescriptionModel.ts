/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ModuleApiDescriptionModel } from './ModuleApiDescriptionModel';
import type { TypeApiDescriptionModel } from './TypeApiDescriptionModel';

export type ApplicationApiDescriptionModel = {
    modules?: Record<string, ModuleApiDescriptionModel> | null;
    types?: Record<string, TypeApiDescriptionModel> | null;
};

