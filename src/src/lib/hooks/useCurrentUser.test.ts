/**
 * Tests for useCurrentUser hook
 */
import { renderHook } from '@testing-library/react';
import { useCurrentUser } from './useCurrentUser';
import { useAppConfig } from './useAppConfig';

// Mock dependencies
jest.mock('./useAppConfig', () => ({
  useAppConfig: jest.fn(),
}));

describe('useCurrentUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return current user from app config', () => {
    const mockUser = {
      id: 'user-123',
      userName: 'testuser',
      name: 'Test User',
      email: 'test@example.com',
      isAuthenticated: true,
    };

    (useAppConfig as jest.Mock).mockReturnValue({
      data: {
        currentUser: mockUser,
      },
    });

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current).toEqual(mockUser);
    expect(useAppConfig).toHaveBeenCalled();
  });

  it('should return undefined when app config has no user', () => {
    (useAppConfig as jest.Mock).mockReturnValue({
      data: {
        currentUser: undefined,
      },
    });

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current).toBeUndefined();
  });

  it('should return undefined when app config is undefined', () => {
    (useAppConfig as jest.Mock).mockReturnValue({
      data: undefined,
    });

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current).toBeUndefined();
  });

  it('should return undefined when app config is loading', () => {
    (useAppConfig as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current).toBeUndefined();
  });

  it('should return undefined when app config has error', () => {
    (useAppConfig as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Failed to load app config'),
    });

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current).toBeUndefined();
  });
});