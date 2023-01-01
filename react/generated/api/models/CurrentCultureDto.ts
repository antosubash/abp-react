/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DateTimeFormatDto } from './DateTimeFormatDto';

export type CurrentCultureDto = {
    displayName?: string | null;
    englishName?: string | null;
    threeLetterIsoLanguageName?: string | null;
    twoLetterIsoLanguageName?: string | null;
    isRightToLeft?: boolean;
    cultureName?: string | null;
    name?: string | null;
    nativeName?: string | null;
    dateTimeFormat?: DateTimeFormatDto;
};

