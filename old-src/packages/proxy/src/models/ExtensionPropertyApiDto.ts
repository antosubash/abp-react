/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExtensionPropertyApiCreateDto } from './ExtensionPropertyApiCreateDto';
import type { ExtensionPropertyApiGetDto } from './ExtensionPropertyApiGetDto';
import type { ExtensionPropertyApiUpdateDto } from './ExtensionPropertyApiUpdateDto';

export type ExtensionPropertyApiDto = {
    onGet?: ExtensionPropertyApiGetDto;
    onCreate?: ExtensionPropertyApiCreateDto;
    onUpdate?: ExtensionPropertyApiUpdateDto;
};

