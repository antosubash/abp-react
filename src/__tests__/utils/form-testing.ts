/**
 * Form testing utilities
 * This file provides utilities for testing form components
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Interface for form field configuration
 */
export interface FormField {
  /**
   * Field name/identifier
   */
  name: string;
  
  /**
   * Field label or aria-label for finding the element
   */
  label: string;
  
  /**
   * Field type (input, select, checkbox, etc.)
   */
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea';
  
  /**
   * Test value to enter in the field
   */
  testValue?: any;
  
  /**
   * For select fields, the options to select from
   */
  options?: string[];
}

/**
 * Fill a form with test data
 * @param fields - Form field configurations
 * @returns Promise that resolves when form is filled
 */
export async function fillForm(fields: FormField[]): Promise<void> {
  const user = userEvent.setup();
  
  for (const field of fields) {
    // Find the form element
    let element;
    
    try {
      // Try to find by label text first
      element = screen.getByLabelText(field.label);
    } catch (e) {
      try {
        // Try to find by placeholder
        element = screen.getByPlaceholderText(field.label);
      } catch (e) {
        try {
          // Try to find by test id
          element = screen.getByTestId(field.name);
        } catch (e) {
          // Try to find by role and name
          element = screen.getByRole('textbox', { name: field.label });
        }
      }
    }
    
    // Fill the field based on its type
    switch (field.type) {
      case 'checkbox':
        if (field.testValue) {
          await user.click(element);
        }
        break;
        
      case 'radio':
        await user.click(element);
        break;
        
      case 'select':
        await user.click(element);
        // Find and click the option
        if (field.testValue && field.options) {
          const option = screen.getByText(field.testValue);
          await user.click(option);
        }
        break;
        
      default:
        // Clear the field first
        await user.clear(element);
        // Type the test value
        if (field.testValue !== undefined && field.testValue !== null) {
          await user.type(element, String(field.testValue));
        }
        break;
    }
  }
}

/**
 * Submit a form by clicking the submit button
 * @param submitButtonText - Text on the submit button
 * @returns Promise that resolves when form is submitted
 */
export async function submitForm(submitButtonText = 'Submit'): Promise<void> {
  const user = userEvent.setup();
  
  // Find the submit button
  let submitButton;
  try {
    submitButton = screen.getByRole('button', { name: submitButtonText });
  } catch (e) {
    try {
      submitButton = screen.getByText(submitButtonText);
    } catch (e) {
      submitButton = screen.getByTestId('submit-button');
    }
  }
  
  // Click the submit button
  await user.click(submitButton);
}

/**
 * Check for validation errors in a form
 * @param fieldErrors - Map of field names to expected error messages
 * @returns Promise that resolves when validation is checked
 */
export async function checkValidationErrors(fieldErrors: Record<string, string>): Promise<void> {
  await waitFor(() => {
    for (const [field, errorMessage] of Object.entries(fieldErrors)) {
      // Find the error message
      const errorElement = screen.getByText(errorMessage);
      expect(errorElement).toBeInTheDocument();
    }
  });
}

/**
 * Test a complete form submission flow
 * @param fields - Form field configurations
 * @param submitButtonText - Text on the submit button
 * @param validationErrors - Expected validation errors (if any)
 * @returns Promise that resolves when form submission is complete
 */
export async function testFormSubmission(
  fields: FormField[],
  submitButtonText = 'Submit',
  validationErrors?: Record<string, string>
): Promise<void> {
  // Fill the form
  await fillForm(fields);
  
  // Submit the form
  await submitForm(submitButtonText);
  
  // Check for validation errors if provided
  if (validationErrors) {
    await checkValidationErrors(validationErrors);
  }
}