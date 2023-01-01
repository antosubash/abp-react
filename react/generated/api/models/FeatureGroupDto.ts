/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FeatureDto } from './FeatureDto';

export type FeatureGroupDto = {
    name?: string | null;
    displayName?: string | null;
    features?: Array<FeatureDto> | null;
};

