/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EmailSettingsDto = {
    smtpHost?: string | null;
    smtpPort?: number;
    smtpUserName?: string | null;
    smtpPassword?: string | null;
    smtpDomain?: string | null;
    smtpEnableSsl?: boolean;
    smtpUseDefaultCredentials?: boolean;
    defaultFromAddress?: string | null;
    defaultFromDisplayName?: string | null;
};

