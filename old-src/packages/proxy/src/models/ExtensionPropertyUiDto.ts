/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExtensionPropertyUiFormDto } from './ExtensionPropertyUiFormDto';
import type { ExtensionPropertyUiLookupDto } from './ExtensionPropertyUiLookupDto';
import type { ExtensionPropertyUiTableDto } from './ExtensionPropertyUiTableDto';

export type ExtensionPropertyUiDto = {
    onTable?: ExtensionPropertyUiTableDto;
    onCreateForm?: ExtensionPropertyUiFormDto;
    onEditForm?: ExtensionPropertyUiFormDto;
    lookup?: ExtensionPropertyUiLookupDto;
};

