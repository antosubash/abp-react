/**
 * AddUser component integration tests
 * Tests form validation, data fetching, and user creation flows
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddUser } from '../AddUser';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { adminUser } from '../../../../__tests__/fixtures/users';

// Mock the API client
jest.mock('@/client', () => ({
  userCreate: jest.fn(),
}));

// Mock the useGrantedPolicies hook
jest.mock('@/lib/hooks/useGrantedPolicies', () => ({
  useGrantedPolicies: jest.fn(),
}));

// Mock the useToast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}));

// Mock the useQueryClient
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

describe('AddUser Component Integration Tests', () => {
  const userCreateMock = require('@/client').userCreate;
  const useGrantedPoliciesMock = require('@/lib/hooks/useGrantedPolicies').useGrantedPolicies;
  const useToastMock = require('@/components/ui/use-toast').useToast;
  const useQueryClientMock = require('@tanstack/react-query').useQueryClient;

  const mockToast = {
    toast: jest.fn(),
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    useGrantedPoliciesMock.mockReturnValue({
      can: jest.fn().mockReturnValue(true),
    });
    
    useToastMock.mockReturnValue(mockToast);
    useQueryClientMock.mockReturnValue(mockQueryClient);
  });

  describe('Component Rendering', () => {
    it('should render the component with create user button', () => {
      renderComponent(<AddUser />);

      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create new user/i })).toBeInTheDocument();
    });

    it('should not show create button when user lacks permissions', () => {
      useGrantedPoliciesMock.mockReturnValue({
        can: jest.fn().mockReturnValue(false),
      });

      renderComponent(<AddUser />);

      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /create new user/i })).not.toBeInTheDocument();
    });
  });

  describe('Dialog Functionality', () => {
    it('should open dialog when create button is clicked', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      expect(screen.getByText('Create a New User')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close dialog when cancel button is clicked', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Close dialog
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      expect(screen.queryByText('Create a New User')).not.toBeInTheDocument();
    });

    it('should close dialog when close button is clicked', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Close dialog using X button
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(screen.queryByText('Create a New User')).not.toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should validate required fields', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Try to submit without filling required fields
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      // Check that form validation prevents submission
      expect(userCreateMock).not.toHaveBeenCalled();
    });

    it('should allow submission with valid data', async () => {
      const user = userEvent.setup();
      userCreateMock.mockResolvedValue({});

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill required fields
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(userCreateMock).toHaveBeenCalledWith({
          body: expect.objectContaining({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            isActive: true,
            lockoutEnabled: true,
          }),
        });
      });
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill form with invalid email
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'invalid-email');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      // Check that form validation prevents submission
      expect(userCreateMock).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('should successfully create user and show success toast', async () => {
      const user = userEvent.setup();
      userCreateMock.mockResolvedValue({});

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill form
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const nameInput = screen.getByPlaceholderText(/name/i);
      const surnameInput = screen.getByPlaceholderText(/surname/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');
      await user.type(nameInput, 'Test');
      await user.type(surnameInput, 'User');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(userCreateMock).toHaveBeenCalledWith({
          body: expect.objectContaining({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            name: 'Test',
            surname: 'User',
            isActive: true,
            lockoutEnabled: true,
          }),
        });
      });

      expect(mockToast.toast).toHaveBeenCalledWith({
        title: 'Success',
        description: 'User Created Successfully',
        variant: 'default',
      });

      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ['GetUsers'],
      });
    });

    it('should handle API errors and show error toast', async () => {
      const user = userEvent.setup();
      const error = new Error('API Error');
      userCreateMock.mockRejectedValue(error);

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill form
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockToast.toast).toHaveBeenCalledWith({
          title: 'Failed',
          description: "User creation wasn't successful.",
          variant: 'destructive',
        });
      });
    });
  });

  describe('Checkbox Functionality', () => {
    it('should handle isActive checkbox', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      const isActiveCheckbox = screen.getByRole('checkbox', { name: /active/i });
      
      // Checkbox should be checked by default
      expect(isActiveCheckbox).toBeChecked();

      // Uncheck the checkbox
      await user.click(isActiveCheckbox);
      expect(isActiveCheckbox).not.toBeChecked();

      // Check the checkbox again
      await user.click(isActiveCheckbox);
      expect(isActiveCheckbox).toBeChecked();
    });

    it('should handle lockoutEnabled checkbox', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      const lockoutCheckbox = screen.getByRole('checkbox', { name: /lock account/i });
      
      // Checkbox should be checked by default
      expect(lockoutCheckbox).toBeChecked();

      // Uncheck the checkbox
      await user.click(lockoutCheckbox);
      expect(lockoutCheckbox).not.toBeChecked();

      // Check the checkbox again
      await user.click(lockoutCheckbox);
      expect(lockoutCheckbox).toBeChecked();
    });

    it('should submit form with correct checkbox values', async () => {
      const user = userEvent.setup();
      userCreateMock.mockResolvedValue({});

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Uncheck both checkboxes
      const isActiveCheckbox = screen.getByRole('checkbox', { name: /active/i });
      const lockoutCheckbox = screen.getByRole('checkbox', { name: /lock account/i });

      await user.click(isActiveCheckbox);
      await user.click(lockoutCheckbox);

      // Fill required fields
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(userCreateMock).toHaveBeenCalledWith({
          body: expect.objectContaining({
            isActive: false,
            lockoutEnabled: false,
          }),
        });
      });
    });
  });

  describe('Accessibility and UX', () => {
    it('should have proper form labels and accessibility', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Check that all form fields have proper labels
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Lock account after failed login attempts')).toBeInTheDocument();

      // Check that form fields are properly labeled
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    it('should handle keyboard navigation', async () => {
      const user = userEvent.setup();
      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Navigate through form fields
      await user.tab();
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      expect(usernameInput).toHaveFocus();

      await user.tab();
      const passwordInput = screen.getByPlaceholderText(/password/i);
      expect(passwordInput).toHaveFocus();

      await user.tab();
      const nameInput = screen.getByPlaceholderText(/name/i);
      expect(nameInput).toHaveFocus();
    });

    it('should handle form submission with Enter key', async () => {
      const user = userEvent.setup();
      userCreateMock.mockResolvedValue({});

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill required fields
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');

      // Submit form with Enter key
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(userCreateMock).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup();
      userCreateMock.mockRejectedValue(new Error('Network error'));

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill form
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockToast.toast).toHaveBeenCalledWith({
          title: 'Failed',
          description: "User creation wasn't successful.",
          variant: 'destructive',
        });
      });
    });

    it('should handle validation errors from API', async () => {
      const user = userEvent.setup();
      const validationError = new Error('Validation failed');
      userCreateMock.mockRejectedValue(validationError);

      renderComponent(<AddUser />);

      // Open dialog
      const createButton = screen.getByRole('button', { name: /create new user/i });
      await user.click(createButton);

      // Fill form
      const usernameInput = screen.getByPlaceholderText(/user name/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.type(emailInput, 'test@example.com');

      // Submit form
      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockToast.toast).toHaveBeenCalledWith({
          title: 'Failed',
          description: "User creation wasn't successful.",
          variant: 'destructive',
        });
      });
    });
  });
}); 