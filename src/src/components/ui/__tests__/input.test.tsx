/**
 * Input component tests
 * Demonstrates comprehensive testing of the Input UI component
 */

import React from 'react';
import { screen } from '@testing-library/react';
import { Input } from '../input';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';
import { inputHelpers } from '../../../../__tests__/utils/component-test-helpers';

describe('Input Component', () => {
  // Basic props for testing
  const defaultProps = {
    placeholder: 'Test input',
    onChange: jest.fn(),
  };

  // Create comprehensive test suite
  const testSuite = createComponentTestSuite(Input, {
    name: 'Input',
    type: 'form',
    defaultProps,
  });

  // Run the generated test suite
  Object.entries(testSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Input component
  describe('Input-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<Input {...defaultProps} />);
      const input = container.firstChild;
      
      expect(input).toHaveAttribute('data-slot', 'input');
    });

    it('should handle different input types', () => {
      const types = ['text', 'email', 'password', 'number', 'tel', 'url'];
      
      types.forEach(type => {
        const { container } = renderComponent(<Input type={type} />);
        const input = container.firstChild;
        expect(input).toHaveAttribute('type', type);
      });
    });

    it('should handle value changes correctly', async () => {
      const onChange = jest.fn();
      const { user } = renderComponent(
        <Input placeholder="Test input" onChange={onChange} />
      );

      await inputHelpers.testInputChange(user, 'Test input', 'test value', onChange);
    });

    it('should support controlled input', () => {
      const value = 'controlled value';
      renderComponent(<Input value={value} onChange={jest.fn()} />);
      
      const input = screen.getByDisplayValue(value);
      expect(input).toBeInTheDocument();
    });

    it('should support uncontrolled input with defaultValue', () => {
      const defaultValue = 'default value';
      renderComponent(<Input defaultValue={defaultValue} />);
      
      const input = screen.getByDisplayValue(defaultValue);
      expect(input).toBeInTheDocument();
    });

    it('should handle focus and blur events', async () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const { user } = renderComponent(
        <Input placeholder="Focus test" onFocus={onFocus} onBlur={onBlur} />
      );

      await inputHelpers.testInputFocus(user, 'Focus test');
      expect(onFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(onBlur).toHaveBeenCalled();
    });

    it('should show validation states correctly', () => {
      const { rerender } = renderComponent(<Input />);
      
      // Test invalid state
      rerender(<Input aria-invalid="true" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveClass('aria-invalid:border-destructive');
    });

    it('should handle disabled state', () => {
      renderComponent(<Input disabled />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:opacity-50');
    });

    it('should handle readonly state', () => {
      renderComponent(<Input readOnly value="readonly" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('should support file input type', () => {
      renderComponent(<Input type="file" />);
      
      const input = screen.getByRole('textbox', { hidden: true }) || 
                   document.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('type', 'file');
    });

    it('should apply focus styles correctly', async () => {
      const { user } = renderComponent(<Input placeholder="Focus styles" />);
      
      const input = screen.getByPlaceholderText('Focus styles');
      await user.click(input);
      
      expect(input).toHaveFocus();
      expect(input).toHaveClass('focus-visible:ring-ring/50');
    });

    it('should handle keyboard navigation', async () => {
      const { user } = renderComponent(<Input placeholder="Keyboard test" />);
      
      await user.tab();
      const input = screen.getByPlaceholderText('Keyboard test');
      expect(input).toHaveFocus();
    });

    it('should support input validation attributes', () => {
      renderComponent(
        <Input 
          type="email"
          required
          minLength={5}
          maxLength={50}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('minlength', '5');
      expect(input).toHaveAttribute('maxlength', '50');
      expect(input).toHaveAttribute('pattern');
    });

    it('should handle autocomplete attributes', () => {
      renderComponent(<Input autoComplete="email" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('should support ARIA attributes', () => {
      renderComponent(
        <Input 
          aria-label="Email input"
          aria-describedby="email-help"
          aria-required="true"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Email input');
      expect(input).toHaveAttribute('aria-describedby', 'email-help');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  // Edge cases and performance tests
  describe('Edge cases and performance', () => {
    it('should handle rapid typing gracefully', async () => {
      const onChange = jest.fn();
      const { user } = renderComponent(
        <Input placeholder="Rapid typing" onChange={onChange} />
      );

      const input = screen.getByPlaceholderText('Rapid typing');
      
      // Simulate rapid typing
      await user.type(input, 'rapid');
      
      expect(onChange).toHaveBeenCalledTimes(5); // One for each character
    });

    it('should handle special characters correctly', async () => {
      const onChange = jest.fn();
      const { user } = renderComponent(
        <Input placeholder="Special chars" onChange={onChange} />
      );

      const input = screen.getByPlaceholderText('Special chars');
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      await user.type(input, specialText);
      expect(input).toHaveValue(specialText);
    });

    it('should handle very long input values', async () => {
      const longValue = 'a'.repeat(1000);
      const { user } = renderComponent(<Input placeholder="Long input" />);

      const input = screen.getByPlaceholderText('Long input');
      await user.type(input, longValue);
      
      expect(input).toHaveValue(longValue);
    });

    it('should handle copy and paste operations', async () => {
      const { user } = renderComponent(<Input placeholder="Copy paste test" />);

      const input = screen.getByPlaceholderText('Copy paste test');
      const textToPaste = 'Pasted content';
      
      await user.click(input);
      await user.paste(textToPaste);
      
      expect(input).toHaveValue(textToPaste);
    });

    it('should maintain performance with frequent re-renders', () => {
      const { rerender } = renderComponent(<Input value="" onChange={jest.fn()} />);
      
      // Simulate frequent re-renders
      for (let i = 0; i < 100; i++) {
        rerender(<Input value={`value-${i}`} onChange={jest.fn()} />);
      }
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('value-99');
    });
  });
});