/**
 * Tests for useAppConfig hook
 */
import { renderHook, waitFor } from '@testing-library/react';
import { useAppConfig } from './useAppConfig';
import { abpApplicationConfigurationGet } from '@/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { QueryNames } from './QueryConstants';

// Mock dependencies
jest.mock('@/client', () => ({
  abpApplicationConfigurationGet: jest.fn(),
}));

// Create a wrapper for the test component with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('useAppConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return app configuration', async () => {
    const mockConfig = {
      localization: { currentCulture: { displayName: 'English' } },
      auth: { policies: {} },
      currentUser: {
        id: 'user-123',
        userName: 'testuser',
        isAuthenticated: true,
      },
    };

    (abpApplicationConfigurationGet as jest.Mock).mockResolvedValue({
      data: mockConfig,
    });

    const { result } = renderHook(() => useAppConfig(), {
      wrapper: createWrapper(),
    });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if data is correct
    expect(result.current.data).toEqual(mockConfig);
    expect(abpApplicationConfigurationGet).toHaveBeenCalled();
  });

  it('should return default configuration when API returns undefined', async () => {
    (abpApplicationConfigurationGet as jest.Mock).mockResolvedValue({
      data: undefined,
    });

    const { result } = renderHook(() => useAppConfig(), {
      wrapper: createWrapper(),
    });

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if default config is returned
    expect(result.current.data).toEqual({
      localization: undefined,
      auth: undefined,
      setting: undefined,
      currentUser: undefined,
      features: undefined,
      globalFeatures: undefined,
      multiTenancy: undefined,
      currentTenant: undefined,
      timing: undefined,
      clock: undefined,
      objectExtensions: undefined,
      extraProperties: undefined,
    });
  });

  it('should handle API errors gracefully', async () => {
    const error = new Error('API error');
    (abpApplicationConfigurationGet as jest.Mock).mockRejectedValue(error);

    // Spy on console.error to prevent error output in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useAppConfig(), {
      wrapper: createWrapper(),
    });

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if default config is returned on error
    expect(result.current.data).toEqual({
      localization: undefined,
      auth: undefined,
      setting: undefined,
      currentUser: undefined,
      features: undefined,
      globalFeatures: undefined,
      multiTenancy: undefined,
      currentTenant: undefined,
      timing: undefined,
      clock: undefined,
      objectExtensions: undefined,
      extraProperties: undefined,
    });
    expect(console.error).toHaveBeenCalledWith('Error fetching app config:', error);
  });

  it('should use the correct query key', async () => {
    (abpApplicationConfigurationGet as jest.Mock).mockResolvedValue({
      data: {},
    });

    const queryClient = new QueryClient();
    const spy = jest.spyOn(queryClient, 'fetchQuery');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    renderHook(() => useAppConfig(), { wrapper });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: [QueryNames.GetAppConfig],
      })
    );
  });

  it('should set stale time to 1 hour', async () => {
    (abpApplicationConfigurationGet as jest.Mock).mockResolvedValue({
      data: {},
    });

    const queryClient = new QueryClient();
    const spy = jest.spyOn(queryClient, 'fetchQuery');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    renderHook(() => useAppConfig(), { wrapper });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        staleTime: 60 * 60 * 1000, // 1 hour
      })
    );
  });
});