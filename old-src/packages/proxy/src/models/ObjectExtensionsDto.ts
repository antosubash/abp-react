/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExtensionEnumDto } from './ExtensionEnumDto';
import type { ModuleExtensionDto } from './ModuleExtensionDto';

export type ObjectExtensionsDto = {
    modules?: Record<string, ModuleExtensionDto> | null;
    enums?: Record<string, ExtensionEnumDto> | null;
};

