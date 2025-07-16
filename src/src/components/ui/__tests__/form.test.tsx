/**
 * Form component tests
 * Tests for Form and all its sub-components
 */

import React from 'react';
import { screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../form';
import { Input } from '../input';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';

// Test component that uses the form
const TestForm = ({ onSubmit = jest.fn() }) => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

describe('Form Component', () => {
  // Basic props for testing
  const defaultProps = {
    children: 'Test Form',
  };

  // Create comprehensive test suite for Form
  const formTestSuite = createComponentTestSuite(Form, {
    name: 'Form',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: [],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-form-class' },
        expectedClasses: ['custom-form-class'],
      },
    ],
  });

  // Run the generated test suite for Form
  Object.entries(formTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Form component
  describe('Form-specific functionality', () => {
    it('should render children correctly', () => {
      renderComponent(
        <Form>
          <div data-testid="form-child">Form Child</div>
        </Form>
      );

      expect(screen.getByTestId('form-child')).toBeInTheDocument();
    });

    it('should work with react-hook-form', () => {
      const onSubmit = jest.fn();
      renderComponent(<TestForm onSubmit={onSubmit} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Enter your full name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
  });
});

describe('FormItem Component', () => {
  const defaultProps = {
    children: 'Test Item',
  };

  const itemTestSuite = createComponentTestSuite(FormItem, {
    name: 'FormItem',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['grid', 'gap-2'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-item-class' },
        expectedClasses: ['custom-item-class'],
      },
    ],
  });

  Object.entries(itemTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('FormItem-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<FormItem {...defaultProps} />);
      const item = container.firstChild;
      
      expect(item).toHaveAttribute('data-slot', 'form-item');
    });

    it('should render children correctly', () => {
      renderComponent(
        <FormItem>
          <div data-testid="item-child">Item Child</div>
        </FormItem>
      );

      expect(screen.getByTestId('item-child')).toBeInTheDocument();
    });

    it('should provide form item context', () => {
      renderComponent(
        <FormItem>
          <FormLabel>Test Label</FormLabel>
        </FormItem>
      );

      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
  });
});

describe('FormLabel Component', () => {
  const defaultProps = {
    children: 'Test Label',
  };

  const labelTestSuite = createComponentTestSuite(FormLabel, {
    name: 'FormLabel',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['data-[error=true]:text-destructive'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-label-class' },
        expectedClasses: ['custom-label-class'],
      },
    ],
  });

  Object.entries(labelTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('FormLabel-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<FormLabel {...defaultProps} />);
      const label = container.firstChild;
      
      expect(label).toHaveAttribute('data-slot', 'form-label');
    });

    it('should render children correctly', () => {
      renderComponent(
        <FormLabel>
          <span data-testid="label-child">Label Child</span>
        </FormLabel>
      );

      expect(screen.getByTestId('label-child')).toBeInTheDocument();
    });

    it('should show error state when form has errors', () => {
      const TestFormWithError = () => {
        const form = useForm({
          defaultValues: { name: '' },
        });

        // Set an error
        form.setError('name', { type: 'required', message: 'Name is required' });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        );
      };

      const { container } = renderComponent(<TestFormWithError />);
      const label = container.querySelector('[data-slot="form-label"]');
      
      expect(label).toHaveAttribute('data-error', 'true');
    });
  });
});

describe('FormControl Component', () => {
  const defaultProps = {
    children: 'Test Control',
  };

  const controlTestSuite = createComponentTestSuite(FormControl, {
    name: 'FormControl',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: [],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-control-class' },
        expectedClasses: ['custom-control-class'],
      },
    ],
  });

  Object.entries(controlTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('FormControl-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<FormControl {...defaultProps} />);
      const control = container.firstChild;
      
      expect(control).toHaveAttribute('data-slot', 'form-control');
    });

    it('should render children correctly', () => {
      renderComponent(
        <FormControl>
          <div data-testid="control-child">Control Child</div>
        </FormControl>
      );

      expect(screen.getByTestId('control-child')).toBeInTheDocument();
    });

    it('should provide proper accessibility attributes', () => {
      const TestFormWithControl = () => {
        const form = useForm({
          defaultValues: { name: '' },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        );
      };

      const { container } = renderComponent(<TestFormWithControl />);
      const control = container.querySelector('[data-slot="form-control"]');
      
      expect(control).toHaveAttribute('id');
      expect(control).toHaveAttribute('aria-describedby');
    });
  });
});

describe('FormDescription Component', () => {
  const defaultProps = {
    children: 'Test Description',
  };

  const descriptionTestSuite = createComponentTestSuite(FormDescription, {
    name: 'FormDescription',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['text-muted-foreground', 'text-sm'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-description-class' },
        expectedClasses: ['custom-description-class'],
      },
    ],
  });

  Object.entries(descriptionTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('FormDescription-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<FormDescription {...defaultProps} />);
      const description = container.firstChild;
      
      expect(description).toHaveAttribute('data-slot', 'form-description');
    });

    it('should render children correctly', () => {
      renderComponent(
        <FormDescription>
          <span data-testid="description-child">Description Child</span>
        </FormDescription>
      );

      expect(screen.getByTestId('description-child')).toBeInTheDocument();
    });

    it('should have proper ID for accessibility', () => {
      const TestFormWithDescription = () => {
        const form = useForm({
          defaultValues: { name: '' },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                </FormItem>
              )}
            />
          </Form>
        );
      };

      const { container } = renderComponent(<TestFormWithDescription />);
      const description = container.querySelector('[data-slot="form-description"]');
      
      expect(description).toHaveAttribute('id');
    });
  });
});

describe('FormMessage Component', () => {
  const defaultProps = {
    children: 'Test Message',
  };

  const messageTestSuite = createComponentTestSuite(FormMessage, {
    name: 'FormMessage',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['text-destructive', 'text-sm'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-message-class' },
        expectedClasses: ['custom-message-class'],
      },
    ],
  });

  Object.entries(messageTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('FormMessage-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<FormMessage {...defaultProps} />);
      const message = container.firstChild;
      
      expect(message).toHaveAttribute('data-slot', 'form-message');
    });

    it('should render children correctly', () => {
      renderComponent(
        <FormMessage>
          <span data-testid="message-child">Message Child</span>
        </FormMessage>
      );

      expect(screen.getByTestId('message-child')).toBeInTheDocument();
    });

    it('should display error message when form has errors', () => {
      const TestFormWithError = () => {
        const form = useForm({
          defaultValues: { name: '' },
        });

        // Set an error
        form.setError('name', { type: 'required', message: 'Name is required' });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      renderComponent(<TestFormWithError />);
      
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('should not render when there is no error', () => {
      const TestFormWithoutError = () => {
        const form = useForm({
          defaultValues: { name: '' },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      const { container } = renderComponent(<TestFormWithoutError />);
      const message = container.querySelector('[data-slot="form-message"]');
      
      expect(message).not.toBeInTheDocument();
    });
  });
});

describe('FormField Component', () => {
  describe('FormField-specific functionality', () => {
    it('should render field with proper context', () => {
      const TestFormWithField = () => {
        const form = useForm({
          defaultValues: { name: '' },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      renderComponent(<TestFormWithField />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Enter your name')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should handle field validation', () => {
      const TestFormWithValidation = () => {
        const form = useForm({
          defaultValues: { email: '' },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      renderComponent(<TestFormWithValidation />);

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });
  });
});

describe('Form Integration Tests', () => {
  it('should work together as a complete form', async () => {
    const onSubmit = jest.fn();
    
    renderComponent(<TestForm onSubmit={onSubmit} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    
    renderComponent(<TestForm onSubmit={onSubmit} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(
      { name: 'John Doe', email: 'john@example.com' },
      expect.anything()
    );
  });

  it('should handle form validation errors', async () => {
    const TestFormWithValidation = () => {
      const form = useForm({
        defaultValues: { name: '', email: '' },
      });

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(jest.fn())}>
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </form>
        </Form>
      );
    };

    const user = userEvent.setup();
    
    renderComponent(<TestFormWithValidation />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('should handle custom styling on all components', () => {
    const TestFormWithCustomStyling = () => {
      const form = useForm({
        defaultValues: { name: '' },
      });

      return (
        <Form {...form} className="custom-form">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="custom-item">
                <FormLabel className="custom-label">Name</FormLabel>
                <FormControl className="custom-control">
                  <Input {...field} />
                </FormControl>
                <FormDescription className="custom-description">Enter your name</FormDescription>
                <FormMessage className="custom-message" />
              </FormItem>
            )}
          />
        </Form>
      );
    };

    const { container } = renderComponent(<TestFormWithCustomStyling />);

    const form = container.querySelector('[data-slot="form"]');
    expect(form).toHaveClass('custom-form');
    
    const item = container.querySelector('[data-slot="form-item"]');
    expect(item).toHaveClass('custom-item');
    
    const label = container.querySelector('[data-slot="form-label"]');
    expect(label).toHaveClass('custom-label');
    
    const control = container.querySelector('[data-slot="form-control"]');
    expect(control).toHaveClass('custom-control');
    
    const description = container.querySelector('[data-slot="form-description"]');
    expect(description).toHaveClass('custom-description');
  });
}); 