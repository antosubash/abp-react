/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientDto } from '../models/ClientDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {

    /**
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientGetList(): CancelablePromise<Array<ClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/client-management',
        });
    }

    /**
     * @param clientId
     * @param displayName
     * @param postLogoutRedirectUris
     * @param redirectUris
     * @param permissions
     * @param type
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientCreate(
        clientId?: string,
        displayName?: string,
        postLogoutRedirectUris?: string,
        redirectUris?: string,
        permissions?: string,
        type?: string,
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client-management',
            query: {
                'ClientId': clientId,
                'DisplayName': displayName,
                'PostLogoutRedirectUris': postLogoutRedirectUris,
                'RedirectUris': redirectUris,
                'Permissions': permissions,
                'Type': type,
            },
        });
    }

    /**
     * @param id
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientGet(
        id: string,
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/client-management/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param clientId
     * @param displayName
     * @param postLogoutRedirectUris
     * @param redirectUris
     * @param permissions
     * @param type
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientUpdate(
        id: string,
        clientId?: string,
        displayName?: string,
        postLogoutRedirectUris?: string,
        redirectUris?: string,
        permissions?: string,
        type?: string,
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/client-management/{id}',
            path: {
                'id': id,
            },
            query: {
                'ClientId': clientId,
                'DisplayName': displayName,
                'PostLogoutRedirectUris': postLogoutRedirectUris,
                'RedirectUris': redirectUris,
                'Permissions': permissions,
                'Type': type,
            },
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static clientDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/client-management/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientAddRedirectUri(
        id: string,
        redirectUri?: string,
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client-management/add-redirect-uri/{id}',
            path: {
                'id': id,
            },
            query: {
                'redirectUri': redirectUri,
            },
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientAddPostLogoutRedirectUri(
        id: string,
        redirectUri?: string,
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client-management/add-post-logout-redirect-uri/{id}',
            path: {
                'id': id,
            },
            query: {
                'redirectUri': redirectUri,
            },
        });
    }

    /**
     * @param id
     * @param clientType
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientUpdateClientType(
        id: string,
        clientType?: string,
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client-management/update-client-type/{id}',
            path: {
                'id': id,
            },
            query: {
                'clientType': clientType,
            },
        });
    }

}
