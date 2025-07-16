/**
 * Component testing utilities
 * This file provides utilities specifically for testing React components
 */

import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import userEvent from '@testing-library/user-event';

/**
 * Custom render options for component testing
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Whether to wrap with QueryClient provider
   */
  withQueryClient?: boolean;
  /**
   * Whether to wrap with Theme provider
   */
  withTheme?: boolean;
  /**
   * Initial theme for ThemeProvider
   */
  initialTheme?: string;
  /**
   * Custom QueryClient instance
   */
  queryClient?: QueryClient;
  /**
   * Additional wrapper components
   */
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

/**
 * Create a test wrapper with common providers
 */
function createTestWrapper(options: CustomRenderOptions = {}) {
  const {
    withQueryClient = true,
    withTheme = true,
    initialTheme = 'light',
    queryClient,
    wrapper: CustomWrapper,
  } = options;

  return function TestWrapper({ children }: { children: React.ReactNode }) {
    let content = children;

    // Wrap with custom wrapper if provided
    if (CustomWrapper) {
      content = <CustomWrapper>{content}</CustomWrapper>;
    }

    // Wrap with QueryClient if needed
    if (withQueryClient) {
      const client = queryClient || new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
          },
          mutations: {
            retry: false,
          },
        },
      });
      content = <QueryClientProvider client={client}>{content}</QueryClientProvider>;
    }

    // Wrap with Theme provider if needed
    if (withTheme) {
      content = (
        <ThemeProvider
          attribute="class"
          defaultTheme={initialTheme}
          enableSystem={false}
          disableTransitionOnChange
        >
          {content}
        </ThemeProvider>
      );
    }

    return <>{content}</>;
  };
}

/**
 * Custom render function for components with providers
 */
export function renderComponent(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const { wrapper, ...renderOptions } = options;
  
  const TestWrapper = createTestWrapper(options);
  
  const result = render(ui, {
    wrapper: TestWrapper,
    ...renderOptions,
  });

  // Set up user event
  const user = userEvent.setup();

  return {
    ...result,
    user,
  };
}

/**
 * Render a component with minimal setup (no providers)
 */
export function renderComponentMinimal(
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const result = render(ui, options);
  const user = userEvent.setup();

  return {
    ...result,
    user,
  };
}

/**
 * Create a mock QueryClient for testing
 */
export function createMockQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Wait for component to be rendered and stable
 */
export async function waitForComponentToStabilize(): Promise<void> {
  // Wait for any pending state updates
  await new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Common test utilities for component testing
 */
export const componentTestUtils = {
  /**
   * Get element by test id
   */
  getByTestId: (container: HTMLElement, testId: string) => 
    container.querySelector(`[data-testid="${testId}"]`),

  /**
   * Get element by data-slot attribute (used in UI components)
   */
  getBySlot: (container: HTMLElement, slot: string) => 
    container.querySelector(`[data-slot="${slot}"]`),

  /**
   * Check if element has specific class
   */
  hasClass: (element: Element, className: string) => 
    element.classList.contains(className),

  /**
   * Get computed styles of element
   */
  getComputedStyle: (element: Element) => 
    window.getComputedStyle(element),

  /**
   * Simulate keyboard navigation
   */
  simulateKeyboardNavigation: async (user: ReturnType<typeof userEvent.setup>, keys: string[]) => {
    for (const key of keys) {
      await user.keyboard(key);
    }
  },

  /**
   * Simulate form submission
   */
  simulateFormSubmission: async (user: ReturnType<typeof userEvent.setup>, form: HTMLElement) => {
    await user.click(form.querySelector('button[type="submit"]') || form.querySelector('button')!);
  },
};

/**
 * Custom matchers for component testing
 */
export const componentMatchers = {
  /**
   * Check if element is visible
   */
  toBeVisible: (element: Element) => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  },

  /**
   * Check if element has focus
   */
  toHaveFocus: (element: Element) => {
    return document.activeElement === element;
  },

  /**
   * Check if element has specific attribute value
   */
  toHaveAttributeValue: (element: Element, attribute: string, value: string) => {
    return element.getAttribute(attribute) === value;
  },
};

/**
 * Mock component props for testing
 */
export function createMockProps<T extends Record<string, any>>(
  overrides: Partial<T> = {}
): T {
  const defaultProps = {
    onClick: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    className: '',
    disabled: false,
    ...overrides,
  };

  return defaultProps as unknown as T;
}

/**
 * Test component variants systematically
 */
export function testComponentVariants<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  variants: Array<{
    name: string;
    props: Partial<T>;
    expectedClasses?: string[];
    expectedAttributes?: Record<string, string>;
  }>
) {
  return variants.map(({ name, props, expectedClasses, expectedAttributes }) => ({
    name,
    test: () => {
      const { container } = renderComponentMinimal(<Component {...(props as T)} />);
      const element = container.firstChild as Element;

      if (expectedClasses) {
        expectedClasses.forEach(className => {
          expect(element).toHaveClass(className);
        });
      }

      if (expectedAttributes) {
        Object.entries(expectedAttributes).forEach(([attr, value]) => {
          expect(element).toHaveAttribute(attr, value);
        });
      }
    },
  }));
}

/**
 * Test accessibility features of a component
 */
export async function testComponentAccessibility(
  Component: React.ComponentType<any>,
  props: any = {}
) {
  const { container, user } = renderComponent(<Component {...props} />);
  const element = container.firstChild as Element;

  // Test keyboard navigation
  if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
    await user.tab();
    expect(element).toHaveFocus();
    
    await user.keyboard('{Enter}');
    if (props.onClick) {
      expect(props.onClick).toHaveBeenCalled();
    }
  }

  // Test ARIA attributes
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const ariaDescribedBy = element.getAttribute('aria-describedby');

  if (!ariaLabel && !ariaLabelledBy) {
    console.warn('Component may need aria-label or aria-labelledby for accessibility');
  }

  return {
    hasAriaLabel: !!ariaLabel,
    hasAriaLabelledBy: !!ariaLabelledBy,
    hasAriaDescribedBy: !!ariaDescribedBy,
    isFocusable: (element as HTMLElement).tabIndex >= 0 || ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'].includes(element.tagName),
  };
}