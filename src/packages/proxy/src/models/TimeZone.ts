/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IanaTimeZone } from './IanaTimeZone';
import type { WindowsTimeZone } from './WindowsTimeZone';

export type TimeZone = {
    iana?: IanaTimeZone;
    windows?: WindowsTimeZone;
};

