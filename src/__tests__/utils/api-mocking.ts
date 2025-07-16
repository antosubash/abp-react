/**
 * API mocking utilities using MSW (Mock Service Worker)
 * This file provides utilities for mocking API responses in tests
 */
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { UserFactory, TenantFactory, RoleFactory } from './mock-factories';

/**
 * Base API URL for ABP endpoints
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

/**
 * Interface for API mock configuration
 */
export interface ApiMockConfig {
    /**
     * Base URL for API endpoints
     */
    baseUrl?: string;

    /**
     * Default request handlers
     */
    handlers?: any[];

    /**
     * Named scenarios for different test cases
     */
    scenarios?: Record<string, any[]>;
}

/**
 * Default API handlers for common endpoints
 */
export const defaultHandlers = [
    // Authentication endpoints
    http.post(`${API_BASE_URL}/api/account/login`, ({ request }) => {
        return Response.json({
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 3600,
        });
    }),

    http.post(`${API_BASE_URL}/api/account/logout`, () => {
        return new Response(null, { status: 200 });
    }),

    // User endpoints
    http.get(`${API_BASE_URL}/api/identity/users`, () => {
        const users = UserFactory.createMany(10);
        return Response.json({
            items: users,
            totalCount: users.length,
        });
    }),

    http.get(`${API_BASE_URL}/api/identity/users/:id`, ({ params }) => {
        const { id } = params;
        const user = UserFactory.create({ id: id as string });
        return Response.json(user);
    }),

    // Tenant endpoints
    http.get(`${API_BASE_URL}/api/multi-tenancy/tenants`, () => {
        const tenants = TenantFactory.createMany(5);
        return Response.json({
            items: tenants,
            totalCount: tenants.length,
        });
    }),

    http.get(`${API_BASE_URL}/api/multi-tenancy/tenants/:id`, ({ params }) => {
        const { id } = params;
        const tenant = TenantFactory.create({ id: id as string });
        return Response.json(tenant);
    }),

    // Role endpoints
    http.get(`${API_BASE_URL}/api/identity/roles`, () => {
        const roles = RoleFactory.createMany(3);
        return Response.json({
            items: roles,
            totalCount: roles.length,
        });
    }),

    http.get(`${API_BASE_URL}/api/identity/roles/:id`, ({ params }) => {
        const { id } = params;
        const role = RoleFactory.create({ id: id as string });
        return Response.json(role);
    }),
];

/**
 * Predefined error scenarios
 */
export const errorScenarios = {
    // Authentication errors
    authenticationFailed: [
        http.post(`${API_BASE_URL}/api/account/login`, () => {
            return Response.json({
                error: 'invalid_grant',
                error_description: 'Invalid username or password',
            }, { status: 400 });
        }),
    ],

    // Authorization errors
    unauthorized: [
        http.get(`${API_BASE_URL}/api/identity/users`, () => {
            return Response.json({
                error: {
                    code: 'Unauthorized',
                    message: 'You are not authorized to access this resource',
                },
            }, { status: 401 });
        }),
    ],

    // Not found errors
    notFound: [
        http.get(`${API_BASE_URL}/api/identity/users/:id`, () => {
            return Response.json({
                error: {
                    code: 'EntityNotFound',
                    message: 'Entity not found',
                },
            }, { status: 404 });
        }),
    ],

    // Server errors
    serverError: [
        http.get(`${API_BASE_URL}/api/identity/users`, () => {
            return Response.json({
                error: {
                    code: 'InternalServerError',
                    message: 'An internal server error occurred',
                },
            }, { status: 500 });
        }),
    ],
};

/**
 * Sets up the MSW server with the provided configuration
 * @param config - API mock configuration
 * @returns MSW server instance
 */
export function setupApiMocks(config: ApiMockConfig = {}) {
    const {
        baseUrl = API_BASE_URL,
        handlers = defaultHandlers,
        scenarios = {},
    } = config;

    // Create the server with default handlers
    const server = setupServer(...handlers);

    // Helper to use a named scenario
    const useScenario = (scenarioName: string) => {
        // Reset handlers to defaults
        server.resetHandlers(...handlers);

        // Add scenario-specific handlers if the scenario exists
        if (scenarios[scenarioName]) {
            server.use(...scenarios[scenarioName]);
        } else if (errorScenarios[scenarioName as keyof typeof errorScenarios]) {
            server.use(...errorScenarios[scenarioName as keyof typeof errorScenarios]);
        }
    };

    return {
        server,
        useScenario,
    };
}

/**
 * Default MSW server instance with standard handlers
 */
export const { server, useScenario } = setupApiMocks();

/**
 * Setup and teardown helpers for Jest
 */
export const apiMockSetup = () => {
    // Start the server before all tests
    beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

    // Reset handlers after each test
    afterEach(() => server.resetHandlers());

    // Close the server after all tests
    afterAll(() => server.close());
};