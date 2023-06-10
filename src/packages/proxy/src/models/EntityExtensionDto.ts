/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExtensionPropertyDto } from './ExtensionPropertyDto';

export type EntityExtensionDto = {
    properties?: Record<string, ExtensionPropertyDto> | null;
    configuration?: Record<string, any> | null;
};

