/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityExtensionDto } from './EntityExtensionDto';

export type ModuleExtensionDto = {
    entities?: Record<string, EntityExtensionDto> | null;
    configuration?: Record<string, any> | null;
};

