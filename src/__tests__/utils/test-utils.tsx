/**
 * Test utilities for rendering components with providers
 * This file provides helper functions for testing React components
 */
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Interface for render options with providers
 */
export interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Initial router path
   */
  initialPath?: string;
  
  /**
   * User session data for authentication testing
   */
  user?: {
    id: string;
    userName: string;
    email: string;
    roles: string[];
    permissions: string[];
    tenantId?: string;
  };
  
  /**
   * Tenant information for multi-tenant testing
   */
  tenant?: {
    id: string;
    name: string;
  };
  
  /**
   * Theme to use for rendering ('light' or 'dark')
   */
  theme?: 'light' | 'dark';
  
  /**
   * Custom query client for React Query testing
   */
  queryClient?: QueryClient;
}

/**
 * Creates a wrapper with all providers needed for testing
 */
function AllTheProviders({ 
  children,
  initialPath = '/',
  theme = 'light',
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }),
}: { 
  children: ReactNode;
  initialPath?: string;
  theme?: 'light' | 'dark';
  queryClient?: QueryClient;
}) {
  // Mock the router path if needed
  if (initialPath !== '/') {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue(initialPath);
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={theme} enableSystem={false}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/**
 * Custom render function that wraps components with necessary providers
 * @param ui - React component to render
 * @param options - Additional render options including provider configuration
 * @returns Rendered component with testing utilities
 */
function renderWithProviders(
  ui: ReactElement,
  options: RenderWithProvidersOptions = {},
) {
  const {
    initialPath,
    theme,
    queryClient,
    user,
    tenant,
    ...renderOptions
  } = options;
  
  // Set up user session if provided
  if (user) {
    // Mock session data
    jest.mock('../../../src/lib/session', () => ({
      useSession: () => ({
        user,
        isLoading: false,
        error: null,
      }),
      getSession: () => Promise.resolve({ user }),
    }));
  }
  
  // Set up tenant if provided
  if (tenant) {
    // Mock tenant data
    jest.mock('../../../src/lib/tenant', () => ({
      useTenant: () => ({
        tenant,
        isLoading: false,
        error: null,
      }),
      getCurrentTenant: () => Promise.resolve(tenant),
    }));
  }
  
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: (props) => (
        <AllTheProviders
          initialPath={initialPath}
          theme={theme}
          queryClient={queryClient}
          {...props}
        />
      ),
      ...renderOptions,
    }),
  };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method with custom render
export { renderWithProviders as render };