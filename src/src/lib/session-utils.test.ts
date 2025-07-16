/**
 * Tests for session utility functions
 */
import { defaultSession, SessionData, getClientConfig, setTenantWithHost } from './session-utils';
import * as client from 'openid-client';
import { tenantGetTenantGuid } from '@/client';
import { getSession } from './actions';

// Mock dependencies
jest.mock('openid-client', () => ({
  discovery: jest.fn(),
}));

jest.mock('@/client', () => ({
  tenantGetTenantGuid: jest.fn(),
}));

jest.mock('./actions', () => ({
  getSession: jest.fn(),
}));

jest.mock('@/config', () => ({
  clientConfig: {
    url: 'https://test-auth-server.com',
    client_id: 'test-client-id',
  },
}));

describe('Session Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('defaultSession', () => {
    it('should have the correct default values', () => {
      expect(defaultSession).toEqual({
        isLoggedIn: false,
        access_token: undefined,
        code_verifier: undefined,
        state: undefined,
        userInfo: undefined,
        tenantId: undefined,
      });
    });
  });

  describe('getClientConfig', () => {
    it('should call discovery with correct parameters', async () => {
      const mockDiscoveryResult = { issuer: 'test-issuer' };
      (client.discovery as jest.Mock).mockResolvedValue(mockDiscoveryResult);

      const result = await getClientConfig();

      expect(client.discovery).toHaveBeenCalledWith(
        new URL('https://test-auth-server.com'),
        'test-client-id'
      );
      expect(result).toEqual(mockDiscoveryResult);
    });

    it('should propagate errors from discovery', async () => {
      const error = new Error('Discovery failed');
      (client.discovery as jest.Mock).mockRejectedValue(error);

      await expect(getClientConfig()).rejects.toThrow('Discovery failed');
    });
  });

  describe('setTenantWithHost', () => {
    it('should not update session if tenant ID already exists', async () => {
      const mockSession = {
        tenantId: 'existing-tenant-id',
        save: jest.fn(),
      };
      (getSession as jest.Mock).mockResolvedValue(mockSession);

      await setTenantWithHost('test-host.com');

      expect(getSession).toHaveBeenCalled();
      expect(tenantGetTenantGuid).not.toHaveBeenCalled();
      expect(mockSession.save).not.toHaveBeenCalled();
    });

    it('should update session with tenant ID from API', async () => {
      const mockSession = {
        tenantId: undefined,
        save: jest.fn(),
      };
      (getSession as jest.Mock).mockResolvedValue(mockSession);
      (tenantGetTenantGuid as jest.Mock).mockResolvedValue({
        data: 'new-tenant-id',
      });

      await setTenantWithHost('test-host.com');

      expect(getSession).toHaveBeenCalled();
      expect(tenantGetTenantGuid).toHaveBeenCalledWith({
        query: { host: 'test-host.com' },
      });
      expect(mockSession.tenantId).toBe('new-tenant-id');
      expect(mockSession.save).toHaveBeenCalled();
    });

    it('should handle API errors gracefully', async () => {
      const mockSession = {
        tenantId: undefined,
        save: jest.fn(),
      };
      (getSession as jest.Mock).mockResolvedValue(mockSession);
      const error = new Error('API error');
      (tenantGetTenantGuid as jest.Mock).mockRejectedValue(error);

      await expect(setTenantWithHost('test-host.com')).rejects.toThrow('API error');
      expect(mockSession.save).not.toHaveBeenCalled();
    });
  });
});