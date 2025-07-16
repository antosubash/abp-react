/**
 * Component test helpers and utilities
 * This file provides helper functions for common testing scenarios
 */

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Form testing helpers
 */
export const formHelpers = {
  /**
   * Fill out a form with provided data
   */
  async fillForm(
    user: ReturnType<typeof userEvent.setup>,
    formData: Record<string, string>
  ): Promise<void> {
    for (const [fieldName, value] of Object.entries(formData)) {
      const field = screen.getByLabelText(new RegExp(fieldName, 'i')) || 
                   screen.getByPlaceholderText(new RegExp(fieldName, 'i')) ||
                   screen.getByRole('textbox', { name: new RegExp(fieldName, 'i') });
      
      if (field) {
        await user.clear(field);
        await user.type(field, value);
      }
    }
  },

  /**
   * Submit a form
   */
  async submitForm(user: ReturnType<typeof userEvent.setup>): Promise<void> {
    const submitButton = screen.getByRole('button', { name: /submit|save|create|update/i });
    await user.click(submitButton);
  },

  /**
   * Check form validation errors
   */
  async expectValidationErrors(expectedErrors: string[]): Promise<void> {
    for (const error of expectedErrors) {
      await waitFor(() => {
        expect(screen.getByText(new RegExp(error, 'i'))).toBeInTheDocument();
      });
    }
  },

  /**
   * Check if form is in loading state
   */
  expectFormLoading(): void {
    const loadingIndicator = screen.queryByText(/loading|submitting/i) ||
                           screen.queryByRole('button', { name: /loading|submitting/i });
    expect(loadingIndicator).toBeInTheDocument();
  },
};

/**
 * Button testing helpers
 */
export const buttonHelpers = {
  /**
   * Test button click behavior
   */
  async testButtonClick(
    user: ReturnType<typeof userEvent.setup>,
    buttonText: string | RegExp,
    expectedCallback?: jest.Mock
  ): Promise<void> {
    const button = screen.getByRole('button', { name: buttonText });
    await user.click(button);
    
    if (expectedCallback) {
      expect(expectedCallback).toHaveBeenCalled();
    }
  },

  /**
   * Test button disabled state
   */
  expectButtonDisabled(buttonText: string | RegExp): void {
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeDisabled();
  },

  /**
   * Test button enabled state
   */
  expectButtonEnabled(buttonText: string | RegExp): void {
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeEnabled();
  },

  /**
   * Test button loading state
   */
  expectButtonLoading(buttonText: string | RegExp): void {
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toHaveAttribute('aria-busy', 'true');
  },
};

/**
 * Input testing helpers
 */
export const inputHelpers = {
  /**
   * Test input value change
   */
  async testInputChange(
    user: ReturnType<typeof userEvent.setup>,
    inputLabel: string | RegExp,
    value: string,
    expectedCallback?: jest.Mock
  ): Promise<void> {
    const input = screen.getByLabelText(inputLabel) || screen.getByPlaceholderText(inputLabel);
    await user.clear(input);
    await user.type(input, value);
    
    expect(input).toHaveValue(value);
    
    if (expectedCallback) {
      expect(expectedCallback).toHaveBeenCalled();
    }
  },

  /**
   * Test input validation
   */
  async testInputValidation(
    user: ReturnType<typeof userEvent.setup>,
    inputLabel: string | RegExp,
    invalidValue: string,
    expectedError: string
  ): Promise<void> {
    const input = screen.getByLabelText(inputLabel) || screen.getByPlaceholderText(inputLabel);
    await user.clear(input);
    await user.type(input, invalidValue);
    await user.tab(); // Trigger blur event
    
    await waitFor(() => {
      expect(screen.getByText(new RegExp(expectedError, 'i'))).toBeInTheDocument();
    });
  },

  /**
   * Test input focus behavior
   */
  async testInputFocus(
    user: ReturnType<typeof userEvent.setup>,
    inputLabel: string | RegExp
  ): Promise<void> {
    const input = screen.getByLabelText(inputLabel) || screen.getByPlaceholderText(inputLabel);
    await user.click(input);
    expect(input).toHaveFocus();
  },
};

/**
 * Modal/Dialog testing helpers
 */
export const modalHelpers = {
  /**
   * Test modal opening
   */
  async testModalOpen(
    user: ReturnType<typeof userEvent.setup>,
    triggerText: string | RegExp,
    modalTitle: string | RegExp
  ): Promise<void> {
    const trigger = screen.getByRole('button', { name: triggerText });
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(modalTitle)).toBeInTheDocument();
    });
  },

  /**
   * Test modal closing
   */
  async testModalClose(
    user: ReturnType<typeof userEvent.setup>,
    closeMethod: 'button' | 'escape' | 'overlay' = 'button'
  ): Promise<void> {
    if (closeMethod === 'button') {
      const closeButton = screen.getByRole('button', { name: /close|cancel|×/i });
      await user.click(closeButton);
    } else if (closeMethod === 'escape') {
      await user.keyboard('{Escape}');
    } else if (closeMethod === 'overlay') {
      const overlay = screen.getByRole('dialog').parentElement;
      if (overlay) {
        await user.click(overlay);
      }
    }
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  },

  /**
   * Test modal focus trap
   */
  async testModalFocusTrap(user: ReturnType<typeof userEvent.setup>): Promise<void> {
    const modal = screen.getByRole('dialog');
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 1) {
      // Tab through all elements
      for (let i = 0; i < focusableElements.length; i++) {
        await user.tab();
      }
      
      // Should cycle back to first element
      await user.tab();
      expect(focusableElements[0]).toHaveFocus();
    }
  },
};

/**
 * Table testing helpers
 */
export const tableHelpers = {
  /**
   * Test table sorting
   */
  async testTableSort(
    user: ReturnType<typeof userEvent.setup>,
    columnHeader: string | RegExp
  ): Promise<void> {
    const header = screen.getByRole('columnheader', { name: columnHeader });
    const sortButton = header.querySelector('button') || header;
    
    await user.click(sortButton);
    
    // Check for sort indicator
    expect(header).toHaveAttribute('aria-sort');
  },

  /**
   * Test table pagination
   */
  async testTablePagination(
    user: ReturnType<typeof userEvent.setup>,
    direction: 'next' | 'previous' | number
  ): Promise<void> {
    if (typeof direction === 'number') {
      const pageButton = screen.getByRole('button', { name: direction.toString() });
      await user.click(pageButton);
    } else {
      const button = screen.getByRole('button', { name: new RegExp(direction, 'i') });
      await user.click(button);
    }
    
    // Wait for table to update
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  },

  /**
   * Test table row selection
   */
  async testTableRowSelection(
    user: ReturnType<typeof userEvent.setup>,
    rowIndex: number
  ): Promise<void> {
    const rows = screen.getAllByRole('row');
    const targetRow = rows[rowIndex + 1]; // +1 to skip header row
    const checkbox = targetRow.querySelector('input[type="checkbox"]');
    
    if (checkbox) {
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    }
  },
};

/**
 * Dropdown/Select testing helpers
 */
export const dropdownHelpers = {
  /**
   * Test dropdown opening
   */
  async testDropdownOpen(
    user: ReturnType<typeof userEvent.setup>,
    triggerLabel: string | RegExp
  ): Promise<void> {
    const trigger = screen.getByRole('combobox', { name: triggerLabel }) ||
                   screen.getByRole('button', { name: triggerLabel });
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox') || screen.getByRole('menu')).toBeInTheDocument();
    });
  },

  /**
   * Test dropdown option selection
   */
  async testDropdownSelection(
    user: ReturnType<typeof userEvent.setup>,
    optionText: string | RegExp
  ): Promise<void> {
    const option = screen.getByRole('option', { name: optionText }) ||
                  screen.getByRole('menuitem', { name: optionText });
    
    await user.click(option);
    
    // Dropdown should close after selection
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  },
};

/**
 * Toast/Notification testing helpers
 */
export const toastHelpers = {
  /**
   * Test toast appearance
   */
  async expectToast(message: string | RegExp, type?: 'success' | 'error' | 'warning' | 'info'): Promise<void> {
    await waitFor(() => {
      const toast = screen.getByText(message);
      expect(toast).toBeInTheDocument();
      
      if (type) {
        const toastContainer = toast.closest('[role="alert"]') || toast.closest('[data-toast]');
        expect(toastContainer).toHaveAttribute('data-type', type);
      }
    });
  },

  /**
   * Test toast dismissal
   */
  async testToastDismiss(
    user: ReturnType<typeof userEvent.setup>,
    message: string | RegExp
  ): Promise<void> {
    const toast = screen.getByText(message);
    const dismissButton = toast.closest('[role="alert"]')?.querySelector('button') ||
                         toast.parentElement?.querySelector('[aria-label*="close"]');
    
    if (dismissButton) {
      await user.click(dismissButton);
      
      await waitFor(() => {
        expect(screen.queryByText(message)).not.toBeInTheDocument();
      });
    }
  },
};

/**
 * Loading state testing helpers
 */
export const loadingHelpers = {
  /**
   * Test loading state appearance
   */
  expectLoadingState(loadingText: string | RegExp = /loading/i): void {
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  },

  /**
   * Test skeleton loading
   */
  expectSkeletonLoading(): void {
    const skeleton = screen.getByTestId('skeleton') || 
                    document.querySelector('[data-skeleton]') ||
                    document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  },

  /**
   * Wait for loading to complete
   */
  async waitForLoadingToComplete(loadingText: string | RegExp = /loading/i): Promise<void> {
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
    });
  },
};

/**
 * Error state testing helpers
 */
export const errorHelpers = {
  /**
   * Test error message display
   */
  expectErrorMessage(errorText: string | RegExp): void {
    expect(screen.getByText(errorText)).toBeInTheDocument();
  },

  /**
   * Test error boundary
   */
  expectErrorBoundary(): void {
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  },

  /**
   * Test retry functionality
   */
  async testRetry(
    user: ReturnType<typeof userEvent.setup>,
    retryCallback?: jest.Mock
  ): Promise<void> {
    const retryButton = screen.getByRole('button', { name: /retry|try again/i });
    await user.click(retryButton);
    
    if (retryCallback) {
      expect(retryCallback).toHaveBeenCalled();
    }
  },
};