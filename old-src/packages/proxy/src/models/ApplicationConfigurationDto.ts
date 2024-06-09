/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationAuthConfigurationDto } from './ApplicationAuthConfigurationDto';
import type { ApplicationFeatureConfigurationDto } from './ApplicationFeatureConfigurationDto';
import type { ApplicationGlobalFeatureConfigurationDto } from './ApplicationGlobalFeatureConfigurationDto';
import type { ApplicationLocalizationConfigurationDto } from './ApplicationLocalizationConfigurationDto';
import type { ApplicationSettingConfigurationDto } from './ApplicationSettingConfigurationDto';
import type { ClockDto } from './ClockDto';
import type { CurrentTenantDto } from './CurrentTenantDto';
import type { CurrentUserDto } from './CurrentUserDto';
import type { MultiTenancyInfoDto } from './MultiTenancyInfoDto';
import type { ObjectExtensionsDto } from './ObjectExtensionsDto';
import type { TimingDto } from './TimingDto';

export type ApplicationConfigurationDto = {
    localization?: ApplicationLocalizationConfigurationDto;
    auth?: ApplicationAuthConfigurationDto;
    setting?: ApplicationSettingConfigurationDto;
    currentUser?: CurrentUserDto;
    features?: ApplicationFeatureConfigurationDto;
    globalFeatures?: ApplicationGlobalFeatureConfigurationDto;
    multiTenancy?: MultiTenancyInfoDto;
    currentTenant?: CurrentTenantDto;
    timing?: TimingDto;
    clock?: ClockDto;
    objectExtensions?: ObjectExtensionsDto;
    extraProperties?: Record<string, any> | null;
};

