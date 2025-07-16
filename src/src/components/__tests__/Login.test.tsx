/**
 * Login component integration tests
 * Tests authentication flows and user session management
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { renderComponent } from '../../../__tests__/utils/component-testing';
import { adminUser, standardUser, tenantAdminUser, roleBasedUser } from '../../../__tests__/fixtures/users';

// Mock the useSession hook
jest.mock('@/useSession', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock window.location
const mockLocation = {
  href: '',
  assign: jest.fn(),
  replace: jest.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Login Component Integration Tests', () => {
  const useSessionMock = require('@/useSession').default;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.href = '';
  });

  describe('Loading State', () => {
    it('should show loading state when session is loading', () => {
      useSessionMock.mockReturnValue({
        data: null,
        isLoading: true,
      });

      renderComponent(<Login />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Authenticated User State', () => {
    it('should show logout button when user is logged in', () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: true,
          user: UserFixtures.adminUser,
        },
        isLoading: false,
      });

      renderComponent(<Login />);

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveTextContent('Logout');
    });

    it('should redirect to logout page when logout button is clicked', async () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: true,
          user: UserFixtures.adminUser,
        },
        isLoading: false,
      });

      const user = userEvent.setup();
      renderComponent(<Login />);

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      await user.click(logoutButton);

      expect(window.location.href).toBe('/auth/logout');
    });

    it('should handle logout with different user types', async () => {
      const testCases = [
        { user: standardUser, description: 'standard user' },
        { user: tenantAdminUser, description: 'tenant admin' },
        { user: roleBasedUser, description: 'role-based user' },
      ];

      for (const { user, description } of testCases) {
        useSessionMock.mockReturnValue({
          data: {
            isLoggedIn: true,
            user,
          },
          isLoading: false,
        });

        const { rerender } = renderComponent(<Login />);
        
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
        
        await userEvent.click(logoutButton);
        expect(window.location.href).toBe('/auth/logout');
        
        // Reset for next iteration
        mockLocation.href = '';
        rerender(<Login />);
      }
    });
  });

  describe('Unauthenticated User State', () => {
    it('should show login button when user is not logged in', () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: false,
          user: null,
        },
        isLoading: false,
      });

      renderComponent(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveTextContent('Login');
    });

    it('should redirect to login page when login button is clicked', async () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: false,
          user: null,
        },
        isLoading: false,
      });

      const user = userEvent.setup();
      renderComponent(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      await user.click(loginButton);

      expect(window.location.href).toBe('/auth/login');
    });

    it('should handle session data being null', () => {
      useSessionMock.mockReturnValue({
        data: null,
        isLoading: false,
      });

      renderComponent(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('Session State Transitions', () => {
    it('should transition from loading to authenticated state', async () => {
      const { rerender } = renderComponent(<Login />);

      // Start with loading state
      useSessionMock.mockReturnValue({
        data: null,
        isLoading: true,
      });

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Transition to authenticated state
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: true,
          user: UserFixtures.adminUser,
        },
        isLoading: false,
      });

      rerender(<Login />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
      });
    });

    it('should transition from loading to unauthenticated state', async () => {
      const { rerender } = renderComponent(<Login />);

      // Start with loading state
      useSessionMock.mockReturnValue({
        data: null,
        isLoading: true,
      });

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Transition to unauthenticated state
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: false,
          user: null,
        },
        isLoading: false,
      });

      rerender(<Login />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility and UX', () => {
    it('should have proper button styling and focus states', async () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: false,
          user: null,
        },
        isLoading: false,
      });

      const user = userEvent.setup();
      renderComponent(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      // Test focus state
      await user.tab();
      expect(loginButton).toHaveFocus();
      
      // Test button styling
      expect(loginButton).toHaveClass('bg-blue-600');
      expect(loginButton).toHaveClass('text-white');
      expect(loginButton).toHaveClass('hover:bg-blue-700');
    });

    it('should handle keyboard navigation', async () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: true,
          user: UserFixtures.adminUser,
        },
        isLoading: false,
      });

      const user = userEvent.setup();
      renderComponent(<Login />);

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      
      // Test keyboard activation
      await user.tab();
      expect(logoutButton).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(window.location.href).toBe('/auth/logout');
    });

    it('should handle rapid clicks gracefully', async () => {
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: false,
          user: null,
        },
        isLoading: false,
      });

      const user = userEvent.setup();
      renderComponent(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      // Simulate rapid clicks
      await user.click(loginButton);
      await user.click(loginButton);
      await user.click(loginButton);
      
      // Should still work correctly
      expect(window.location.href).toBe('/auth/login');
    });
  });

  describe('Error Handling', () => {
    it('should handle session errors gracefully', () => {
      useSessionMock.mockReturnValue({
        data: null,
        isLoading: false,
        error: new Error('Session error'),
      });

      renderComponent(<Login />);

      // Should fall back to showing login button
      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeInTheDocument();
    });

    it('should handle undefined session data', () => {
      useSessionMock.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      renderComponent(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('Integration with Authentication Flow', () => {
    it('should work with different authentication providers', () => {
      const authProviders = [
        { provider: 'OpenID Connect', loginUrl: '/auth/login' },
        { provider: 'OAuth', loginUrl: '/auth/login' },
        { provider: 'SAML', loginUrl: '/auth/login' },
      ];

      for (const { provider, loginUrl } of authProviders) {
        useSessionMock.mockReturnValue({
          data: {
            isLoggedIn: false,
            user: null,
          },
          isLoading: false,
        });

        const { rerender } = renderComponent(<Login />);
        
        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
        
        // Reset for next iteration
        rerender(<Login />);
      }
    });

    it('should handle session timeout scenarios', async () => {
      // Start with authenticated user
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: true,
          user: UserFixtures.adminUser,
        },
        isLoading: false,
      });

      const { rerender } = renderComponent(<Login />);
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

      // Simulate session timeout
      useSessionMock.mockReturnValue({
        data: {
          isLoggedIn: false,
          user: null,
        },
        isLoading: false,
      });

      rerender(<Login />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      });
    });
  });
}); 