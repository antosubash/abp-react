import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'AbpReact',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://api.abpreact.antosubash.com/',
    redirectUri: baseUrl,
    clientId: 'AbpReact_App',
    responseType: 'code',
    scope: 'offline_access AbpReact',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://api.abpreact.antosubash.com/',
      rootNamespace: 'AbpReact',
    },
  },
} as Environment;
