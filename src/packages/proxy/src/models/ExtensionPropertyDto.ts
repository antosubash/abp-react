/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExtensionPropertyApiDto } from './ExtensionPropertyApiDto';
import type { ExtensionPropertyAttributeDto } from './ExtensionPropertyAttributeDto';
import type { ExtensionPropertyUiDto } from './ExtensionPropertyUiDto';
import type { LocalizableStringDto } from './LocalizableStringDto';

export type ExtensionPropertyDto = {
    type?: string | null;
    typeSimple?: string | null;
    displayName?: LocalizableStringDto;
    api?: ExtensionPropertyApiDto;
    ui?: ExtensionPropertyUiDto;
    attributes?: Array<ExtensionPropertyAttributeDto> | null;
    configuration?: Record<string, any> | null;
    defaultValue?: any;
};

