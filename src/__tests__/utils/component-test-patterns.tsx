/**
 * Common component testing patterns and templates
 * This file provides reusable test patterns for different types of components
 */

import { renderComponent, componentTestUtils, testComponentVariants } from './component-testing';
import { screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

/**
 * Standard test suite for basic UI components
 */
export function createBasicComponentTests<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string,
  defaultProps: T
) {
  return {
    /**
     * Test basic rendering
     */
    'should render without crashing': () => {
      const { container } = renderComponent(<Component {...defaultProps} />);
      expect(container.firstChild).toBeInTheDocument();
    },

    /**
     * Test className prop
     */
    'should accept custom className': () => {
      const customClass = 'custom-test-class';
      const { container } = renderComponent(
        <Component {...defaultProps} className={customClass} />
      );
      expect(container.firstChild).toHaveClass(customClass);
    },

    /**
     * Test data attributes
     */
    'should accept data attributes': () => {
      const { container } = renderComponent(
        <Component {...defaultProps} data-testid="test-component" />
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'test-component');
    },

    /**
     * Test ref forwarding
     */
    'should forward ref correctly': () => {
      const ref = React.createRef<HTMLElement>();
      renderComponent(<Component {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    },
  };
}

/**
 * Test suite for interactive components (buttons, inputs, etc.)
 */
export function createInteractiveComponentTests<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string,
  defaultProps: T & { onClick?: jest.Mock; onChange?: jest.Mock }
) {
  return {
    ...createBasicComponentTests(Component, componentName, defaultProps),

    /**
     * Test click handling
     */
    'should handle click events': async () => {
      const onClick = jest.fn();
      const { user } = renderComponent(<Component {...defaultProps} onClick={onClick} />);
      
      const element = screen.getByRole('button') || screen.getByRole('textbox') || 
                     document.querySelector('[data-slot]');
      
      if (element) {
        await user.click(element);
        expect(onClick).toHaveBeenCalled();
      }
    },

    /**
     * Test disabled state
     */
    'should handle disabled state': () => {
      const { container } = renderComponent(<Component {...defaultProps} disabled />);
      const element = container.firstChild as HTMLElement;
      
      expect(element).toHaveAttribute('disabled');
      expect(element).toHaveClass(/disabled|opacity-50/);
    },

    /**
     * Test keyboard navigation
     */
    'should support keyboard navigation': async () => {
      const onClick = jest.fn();
      const { user } = renderComponent(<Component {...defaultProps} onClick={onClick} />);
      
      const element = screen.getByRole('button') || screen.getByRole('textbox');
      
      if (element) {
        await user.tab();
        expect(element).toHaveFocus();
        
        await user.keyboard('{Enter}');
        if (onClick) {
          expect(onClick).toHaveBeenCalled();
        }
      }
    },

    /**
     * Test ARIA attributes
     */
    'should have proper ARIA attributes': () => {
      const { container } = renderComponent(<Component {...defaultProps} />);
      const element = container.firstChild as HTMLElement;
      
      // Check for basic accessibility attributes
      const hasAriaLabel = element.hasAttribute('aria-label');
      const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
      const hasRole = element.hasAttribute('role');
      
      expect(hasAriaLabel || hasAriaLabelledBy || hasRole).toBe(true);
    },
  };
}

/**
 * Test suite for form components
 */
export function createFormComponentTests<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string,
  defaultProps: T & { onChange?: jest.Mock; onBlur?: jest.Mock; value?: any }
) {
  return {
    ...createInteractiveComponentTests(Component, componentName, defaultProps),

    /**
     * Test value changes
     */
    'should handle value changes': async () => {
      const onChange = jest.fn();
      const { user } = renderComponent(
        <Component {...defaultProps} onChange={onChange} />
      );
      
      const input = screen.getByRole('textbox') || screen.getByRole('combobox');
      
      if (input) {
        await user.type(input, 'test value');
        expect(onChange).toHaveBeenCalled();
      }
    },

    /**
     * Test controlled vs uncontrolled
     */
    'should work as controlled component': () => {
      const value = 'controlled value';
      renderComponent(<Component {...defaultProps} value={value} />);
      
      const input = screen.getByRole('textbox') || screen.getByRole('combobox');
      if (input) {
        expect(input).toHaveValue(value);
      }
    },

    /**
     * Test validation states
     */
    'should display validation states': () => {
      const { rerender } = renderComponent(<Component {...defaultProps} />);
      
      // Test error state
      rerender(<Component {...defaultProps} aria-invalid="true" />);
      const element = screen.getByRole('textbox') || screen.getByRole('combobox');
      
      if (element) {
        expect(element).toHaveAttribute('aria-invalid', 'true');
      }
    },

    /**
     * Test focus and blur events
     */
    'should handle focus and blur events': async () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const { user } = renderComponent(
        <Component {...defaultProps} onFocus={onFocus} onBlur={onBlur} />
      );
      
      const input = screen.getByRole('textbox') || screen.getByRole('combobox');
      
      if (input) {
        await user.click(input);
        expect(onFocus).toHaveBeenCalled();
        
        await user.tab();
        expect(onBlur).toHaveBeenCalled();
      }
    },
  };
}

/**
 * Test suite for layout components (cards, containers, etc.)
 */
export function createLayoutComponentTests<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string,
  defaultProps: T
) {
  return {
    ...createBasicComponentTests(Component, componentName, defaultProps),

    /**
     * Test children rendering
     */
    'should render children correctly': () => {
      const testContent = 'Test content';
      renderComponent(<Component {...defaultProps}>{testContent}</Component>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    },

    /**
     * Test multiple children
     */
    'should render multiple children': () => {
      renderComponent(
        <Component {...defaultProps}>
          <div>Child 1</div>
          <div>Child 2</div>
        </Component>
      );
      
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    },

    /**
     * Test semantic HTML structure
     */
    'should use semantic HTML structure': () => {
      const { container } = renderComponent(<Component {...defaultProps} />);
      const element = container.firstChild as HTMLElement;
      
      // Check for semantic tags or proper roles
      const isSemanticElement = ['MAIN', 'SECTION', 'ARTICLE', 'ASIDE', 'HEADER', 'FOOTER', 'NAV']
        .includes(element.tagName) || element.hasAttribute('role');
      
      expect(isSemanticElement).toBe(true);
    },
  };
}

/**
 * Test suite for variant-based components (buttons with different styles, etc.)
 */
export function createVariantComponentTests<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string,
  variants: Array<{
    name: string;
    props: Partial<T>;
    expectedClasses?: string[];
    expectedAttributes?: Record<string, string>;
  }>
) {
  const tests = testComponentVariants(Component, variants);
  
  const testSuite: Record<string, () => void> = {};
  
  tests.forEach(({ name, test }) => {
    testSuite[`should render ${name} variant correctly`] = test;
  });
  
  return testSuite;
}

/**
 * Test suite for async components (components that load data)
 */
export function createAsyncComponentTests<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string,
  defaultProps: T
) {
  return {
    ...createBasicComponentTests(Component, componentName, defaultProps),

    /**
     * Test loading state
     */
    'should show loading state': () => {
      renderComponent(<Component {...defaultProps} loading />);
      
      const loadingIndicator = screen.queryByText(/loading/i) || 
                              screen.queryByTestId('loading') ||
                              document.querySelector('[data-loading]');
      
      expect(loadingIndicator).toBeInTheDocument();
    },

    /**
     * Test error state
     */
    'should show error state': () => {
      const error = 'Test error message';
      renderComponent(<Component {...defaultProps} error={error} />);
      
      expect(screen.getByText(error)).toBeInTheDocument();
    },

    /**
     * Test empty state
     */
    'should show empty state': () => {
      renderComponent(<Component {...defaultProps} data={[]} />);
      
      const emptyMessage = screen.queryByText(/no data|empty|nothing to show/i);
      expect(emptyMessage).toBeInTheDocument();
    },

    /**
     * Test retry functionality
     */
    'should handle retry': async () => {
      const onRetry = jest.fn();
      const { user } = renderComponent(
        <Component {...defaultProps} error="Error" onRetry={onRetry} />
      );
      
      const retryButton = screen.queryByRole('button', { name: /retry|try again/i });
      
      if (retryButton) {
        await user.click(retryButton);
        expect(onRetry).toHaveBeenCalled();
      }
    },
  };
}

/**
 * Create a complete test suite for a component based on its type
 */
export function createComponentTestSuite<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  config: {
    name: string;
    type: 'basic' | 'interactive' | 'form' | 'layout' | 'async';
    defaultProps: T;
    variants?: Array<{
      name: string;
      props: Partial<T>;
      expectedClasses?: string[];
      expectedAttributes?: Record<string, string>;
    }>;
  }
) {
  const { name, type, defaultProps, variants } = config;
  
  let testSuite: Record<string, () => void | Promise<void>> = {};
  
  switch (type) {
    case 'basic':
      testSuite = createBasicComponentTests(Component, name, defaultProps);
      break;
    case 'interactive':
      testSuite = createInteractiveComponentTests(Component, name, defaultProps);
      break;
    case 'form':
      testSuite = createFormComponentTests(Component, name, defaultProps);
      break;
    case 'layout':
      testSuite = createLayoutComponentTests(Component, name, defaultProps);
      break;
    case 'async':
      testSuite = createAsyncComponentTests(Component, name, defaultProps);
      break;
  }
  
  // Add variant tests if provided
  if (variants) {
    const variantTests = createVariantComponentTests(Component, name, variants);
    testSuite = { ...testSuite, ...variantTests };
  }
  
  return testSuite;
}