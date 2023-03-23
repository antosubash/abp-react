/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScopeDto } from '../models/ScopeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScopeService {
    /**
     * @returns ScopeDto Success
     * @throws ApiError
     */
    public static scopeGetList(): CancelablePromise<Array<ScopeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/scope-management'
        });
    }

    /**
     * @param name
     * @param displayName
     * @param description
     * @param resources
     * @param properties
     * @param id
     * @returns ScopeDto Success
     * @throws ApiError
     */
    public static scopeCreate(
        name?: string,
        displayName?: string,
        description?: string,
        resources?: string,
        properties?: string,
        id?: string
    ): CancelablePromise<ScopeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/scope-management',
            query: {
                Name: name,
                DisplayName: displayName,
                Description: description,
                Resources: resources,
                Properties: properties,
                Id: id
            }
        });
    }

    /**
     * @param id
     * @returns ScopeDto Success
     * @throws ApiError
     */
    public static scopeGet(id: string): CancelablePromise<ScopeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/scope-management/{id}',
            path: {
                id: id
            }
        });
    }

    /**
     * @param clientId
     * @param name
     * @param displayName
     * @param description
     * @param resources
     * @param properties
     * @param id
     * @returns ScopeDto Success
     * @throws ApiError
     */
    public static scopeUpdate(
        clientId: string,
        name?: string,
        displayName?: string,
        description?: string,
        resources?: string,
        properties?: string,
        id?: string
    ): CancelablePromise<ScopeDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/scope-management/{clientId}',
            path: {
                clientId: clientId
            },
            query: {
                Name: name,
                DisplayName: displayName,
                Description: description,
                Resources: resources,
                Properties: properties,
                Id: id
            }
        });
    }
}
