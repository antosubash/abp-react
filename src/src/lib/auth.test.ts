/**
 * Tests for authentication utilities
 */
import { isTokenExpired, refreshToken, setUpLayoutConfig } from './auth';
import { jwtDecode } from 'jwt-decode';
import { createRedisInstance } from './redis';
import { getClientConfig } from './session-utils';
import * as client from 'openid-client';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { getSession } from './actions';
import { APIClient } from '@/client';

// Mock dependencies
jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

jest.mock('./redis', () => ({
    createRedisInstance: jest.fn(),
}));

jest.mock('./session-utils', () => ({
    getClientConfig: jest.fn(),
}));

jest.mock('openid-client', () => ({
    refreshTokenGrant: jest.fn(),
}));

jest.mock('iron-session', () => ({
    getIronSession: jest.fn(),
}));

jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}));

jest.mock('./actions', () => ({
    getSession: jest.fn(),
}));

jest.mock('@/client', () => ({
    client: {
        setConfig: jest.fn(),
        interceptors: {
            request: {
                use: jest.fn(),
            },
        },
    },
}));

describe('Authentication Utilities', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    describe('isTokenExpired', () => {
        it('should return true for expired tokens', () => {
            const now = new Date();
            const pastTime = Math.floor(now.getTime() / 1000) - 3600; // 1 hour ago
            (jwtDecode as jest.Mock).mockReturnValue({ exp: pastTime });

            expect(isTokenExpired('expired-token')).toBe(true);
        });

        it('should return false for valid tokens', () => {
            const now = new Date();
            const futureTime = Math.floor(now.getTime() / 1000) + 3600; // 1 hour in future
            (jwtDecode as jest.Mock).mockReturnValue({ exp: futureTime });

            expect(isTokenExpired('valid-token')).toBe(false);
        });
    });

    describe('refreshToken', () => {
        it('should refresh the token successfully', async () => {
            // Mock session
            const mockSession = {
                userInfo: { sub: 'user-123' },
                access_token: 'old-token',
                save: jest.fn(),
            };
            (getIronSession as jest.Mock).mockResolvedValue(mockSession);
            (cookies as jest.Mock).mockResolvedValue({});

            // Mock Redis
            const mockRedis = {
                get: jest.fn().mockResolvedValue(JSON.stringify({
                    refresh_token: 'refresh-token-123',
                })),
                set: jest.fn().mockResolvedValue('OK'),
                quit: jest.fn().mockResolvedValue('OK'),
            };
            (createRedisInstance as jest.Mock).mockReturnValue(mockRedis);

            // Mock client config and token refresh
            (getClientConfig as jest.Mock).mockResolvedValue({ issuer: 'test-issuer' });
            (client.refreshTokenGrant as jest.Mock).mockResolvedValue({
                access_token: 'new-token-123',
                refresh_token: 'new-refresh-token-123',
            });

            await refreshToken();

            // Verify the token was refreshed and saved
            expect(getIronSession).toHaveBeenCalled();
            expect(createRedisInstance).toHaveBeenCalled();
            expect(getClientConfig).toHaveBeenCalled();
            expect(mockRedis.get).toHaveBeenCalledWith('session:user-123');
            expect(client.refreshTokenGrant).toHaveBeenCalledWith(
                { issuer: 'test-issuer' },
                'refresh-token-123'
            );
            expect(mockSession.access_token).toBe('new-token-123');
            expect(mockSession.save).toHaveBeenCalled();
            expect(mockRedis.set).toHaveBeenCalledWith(
                'session:user-123',
                JSON.stringify({
                    access_token: 'new-token-123',
                    refresh_token: 'new-refresh-token-123',
                })
            );
            expect(mockRedis.quit).toHaveBeenCalled();
        });

        it('should handle errors gracefully', async () => {
            (getIronSession as jest.Mock).mockRejectedValue(new Error('Session error'));

            await refreshToken();

            expect(console.error).toHaveBeenCalledWith(
                'Error refreshing token:',
                expect.any(Error)
            );
        });
    });

    describe('setUpLayoutConfig', () => {
        beforeEach(() => {
            // Save original environment and mock it
            process.env = { ...process.env };
            process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
        });

        it('should set up API client configuration', async () => {
            const mockSession = {
                access_token: 'test-token',
                tenantId: 'test-tenant',
            };
            (getSession as jest.Mock).mockResolvedValue(mockSession);

            await setUpLayoutConfig();

            // Check if client config was set
            expect(APIClient.setConfig).toHaveBeenCalledWith({
                baseUrl: 'https://api.example.com',
            });

            // Check if interceptor was set up
            const interceptorFn = APIClient.interceptors.request.use.mock.calls[0][0];
            const mockOptions = {
                headers: {
                    set: jest.fn(),
                },
            };

            await interceptorFn(mockOptions);

            expect(mockOptions.headers.set).toHaveBeenCalledWith(
                'Authorization',
                'Bearer test-token'
            );
            expect(mockOptions.headers.set).toHaveBeenCalledWith(
                '__tenant',
                'test-tenant'
            );
        });

        it('should handle missing tenant ID', async () => {
            const mockSession = {
                access_token: 'test-token',
                tenantId: null,
            };
            (getSession as jest.Mock).mockResolvedValue(mockSession);

            await setUpLayoutConfig();

            const interceptorFn = APIClient.interceptors.request.use.mock.calls[0][0];
            const mockOptions = {
                headers: {
                    set: jest.fn(),
                },
            };

            await interceptorFn(mockOptions);

            expect(mockOptions.headers.set).toHaveBeenCalledWith(
                '__tenant',
                ''
            );
        });
    });
});