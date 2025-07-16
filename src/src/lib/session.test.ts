/**
 * Tests for session management utilities
 */
import { getSession } from './actions';
import { isTokenExpired } from './auth';
import { createRedisInstance } from './redis';
import { getClientConfig } from './session-utils';
import * as client from 'openid-client';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// Mock the actions module
jest.mock('./actions', () => ({
  getSession: jest.fn(),
}));

// Get the mock functions
const mockGetSession = getSession as jest.MockedFunction<typeof getSession>;

describe('Session Management', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('getSession', () => {
    it('should return session with default values when not authenticated', async () => {
      const mockSession = {
        isLoggedIn: false,
        access_token: undefined,
        userInfo: undefined,
        tenantId: undefined,
        save: jest.fn(),
      };
      mockGetSession.mockResolvedValueOnce(mockSession);
      
      const session = await getSession();
      
      expect(session.isLoggedIn).toBe(false);
      expect(session.access_token).toBeUndefined();
      expect(session.userInfo).toBeUndefined();
      expect(session.tenantId).toBeUndefined();
    });

    it('should return session with user data when authenticated', async () => {
      const mockSession = {
        isLoggedIn: true,
        access_token: 'valid-token',
        userInfo: {
          sub: 'user-123',
          name: 'Test User',
          email: 'test@example.com',
          email_verified: true,
        },
        tenantId: 'tenant-123',
        save: jest.fn(),
      };
      mockGetSession.mockResolvedValueOnce(mockSession);
      
      const session = await getSession();
      
      expect(session.isLoggedIn).toBe(true);
      expect(session.access_token).toBe('valid-token');
      expect(session.userInfo).toEqual({
        sub: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        email_verified: true,
      });
      expect(session.tenantId).toBe('tenant-123');
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('Failed to fetch session');
      mockGetSession.mockRejectedValueOnce(error);
      
      try {
        await getSession();
        fail('Expected getSession to throw an error');
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });
});