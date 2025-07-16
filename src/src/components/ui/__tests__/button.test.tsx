/**
 * Button component tests
 * Demonstrates comprehensive testing of the Button UI component
 */

import React from 'react';
import { screen } from '@testing-library/react';
import { Button } from '../button';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';
import { buttonHelpers } from '../../../../__tests__/utils/component-test-helpers';

describe('Button Component', () => {
  // Basic props for testing
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
  };

  // Create comprehensive test suite
  const testSuite = createComponentTestSuite(Button, {
    name: 'Button',
    type: 'interactive',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: { variant: 'default' },
        expectedClasses: ['bg-primary', 'text-primary-foreground'],
      },
      {
        name: 'destructive',
        props: { variant: 'destructive' },
        expectedClasses: ['bg-destructive', 'text-white'],
      },
      {
        name: 'outline',
        props: { variant: 'outline' },
        expectedClasses: ['border', 'bg-background'],
      },
      {
        name: 'secondary',
        props: { variant: 'secondary' },
        expectedClasses: ['bg-secondary', 'text-secondary-foreground'],
      },
      {
        name: 'ghost',
        props: { variant: 'ghost' },
        expectedClasses: ['hover:bg-accent'],
      },
      {
        name: 'link',
        props: { variant: 'link' },
        expectedClasses: ['text-primary', 'underline-offset-4'],
      },
      {
        name: 'small size',
        props: { size: 'sm' },
        expectedClasses: ['h-8', 'px-3'],
      },
      {
        name: 'large size',
        props: { size: 'lg' },
        expectedClasses: ['h-10', 'px-6'],
      },
      {
        name: 'icon size',
        props: { size: 'icon' },
        expectedClasses: ['size-9'],
      },
    ],
  });

  // Run the generated test suite
  Object.entries(testSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Button component
  describe('Button-specific functionality', () => {
    it('should render as child component when asChild is true', () => {
      renderComponent(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveTextContent('Link Button');
    });

    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<Button {...defaultProps} />);
      const button = container.firstChild;
      
      expect(button).toHaveAttribute('data-slot', 'button');
    });

    it('should handle click events correctly', async () => {
      const onClick = jest.fn();
      const { user } = renderComponent(
        <Button onClick={onClick}>Click me</Button>
      );

      await buttonHelpers.testButtonClick(user, 'Click me', onClick);
    });

    it('should not trigger click when disabled', async () => {
      const onClick = jest.fn();
      const { user } = renderComponent(
        <Button onClick={onClick} disabled>
          Disabled Button
        </Button>
      );

      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(onClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
    });

    it('should support keyboard activation', async () => {
      const onClick = jest.fn();
      const { user } = renderComponent(
        <Button onClick={onClick}>Keyboard Button</Button>
      );

      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should render with icon correctly', () => {
      const IconComponent = () => <svg data-testid="test-icon" />;
      
      renderComponent(
        <Button>
          <IconComponent />
          Button with Icon
        </Button>
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Button with Icon')).toBeInTheDocument();
    });

    it('should apply focus styles correctly', async () => {
      const { user } = renderComponent(<Button>Focus Test</Button>);
      
      const button = screen.getByRole('button');
      await user.tab();
      
      expect(button).toHaveFocus();
      expect(button).toHaveClass('focus-visible:ring-ring/50');
    });

    it('should handle loading state', () => {
      renderComponent(
        <Button disabled aria-busy="true">
          Loading...
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should combine multiple variants correctly', () => {
      const { container } = renderComponent(
        <Button variant="outline" size="lg" className="custom-class">
          Combined Button
        </Button>
      );

      const button = container.firstChild;
      expect(button).toHaveClass('border'); // outline variant
      expect(button).toHaveClass('h-10'); // lg size
      expect(button).toHaveClass('custom-class'); // custom class
    });

    it('should maintain accessibility standards', () => {
      renderComponent(<Button>Accessible Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toBeVisible();
      expect(button).not.toHaveAttribute('aria-hidden');
    });

    it('should support form submission', () => {
      renderComponent(
        <form data-testid="test-form">
          <Button type="submit">Submit</Button>
        </form>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  // Performance and edge case tests
  describe('Edge cases and performance', () => {
    it('should handle rapid clicks gracefully', async () => {
      const onClick = jest.fn();
      const { user } = renderComponent(
        <Button onClick={onClick}>Rapid Click</Button>
      );

      const button = screen.getByRole('button');
      
      // Simulate rapid clicks
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('should handle empty children gracefully', () => {
      const { container } = renderComponent(<Button />);
      const button = container.firstChild;
      
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });

    it('should handle complex children structures', () => {
      renderComponent(
        <Button>
          <span>Complex</span>
          <div>
            <span>Nested</span>
          </div>
          Content
        </Button>
      );

      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});