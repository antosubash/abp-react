import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'AbpReact',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44341/',
    redirectUri: baseUrl,
    clientId: 'AbpReact_App',
    responseType: 'code',
    scope: 'offline_access AbpReact',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44341',
      rootNamespace: 'AbpReact',
    },
  },
} as Environment;
