/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActionApiDescriptionModel } from './ActionApiDescriptionModel';
import type { ControllerInterfaceApiDescriptionModel } from './ControllerInterfaceApiDescriptionModel';

export type ControllerApiDescriptionModel = {
    controllerName?: string | null;
    controllerGroupName?: string | null;
    isRemoteService?: boolean;
    isIntegrationService?: boolean;
    apiVersion?: string | null;
    type?: string | null;
    interfaces?: Array<ControllerInterfaceApiDescriptionModel> | null;
    actions?: Record<string, ActionApiDescriptionModel> | null;
};

