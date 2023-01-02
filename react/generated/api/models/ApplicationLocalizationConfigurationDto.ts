/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrentCultureDto } from './CurrentCultureDto';
import type { LanguageInfo } from './LanguageInfo';
import type { NameValue } from './NameValue';

export type ApplicationLocalizationConfigurationDto = {
    values?: Record<string, Record<string, string> | null> | null;
    languages?: Array<LanguageInfo> | null;
    currentCulture?: CurrentCultureDto;
    defaultResourceName?: string | null;
    languagesMap?: Record<string, Array<NameValue> | null> | null;
    languageFilesMap?: Record<string, Array<NameValue> | null> | null;
};
