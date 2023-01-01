/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ControllerApiDescriptionModel } from './ControllerApiDescriptionModel';

export type ModuleApiDescriptionModel = {
    rootPath?: string | null;
    remoteServiceName?: string | null;
    controllers?: Record<string, ControllerApiDescriptionModel> | null;
};

