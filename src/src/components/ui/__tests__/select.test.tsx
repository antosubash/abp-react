/**
 * Select component tests
 * Tests for Select and all its sub-components
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectSeparator } from '../select';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';

describe('Select Component', () => {
  // Basic props for testing
  const defaultProps = {
    children: 'Test Select',
  };

  // Create comprehensive test suite for Select
  const selectTestSuite = createComponentTestSuite(Select, {
    name: 'Select',
    type: 'interactive',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: [],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-select-class' },
        expectedClasses: ['custom-select-class'],
      },
    ],
  });

  // Run the generated test suite for Select
  Object.entries(selectTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Select component
  describe('Select-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<Select {...defaultProps} />);
      const select = container.firstChild;
      
      expect(select).toHaveAttribute('data-slot', 'select');
    });

    it('should render children correctly', () => {
      renderComponent(
        <Select>
          <div data-testid="select-child">Select Child</div>
        </Select>
      );

      expect(screen.getByTestId('select-child')).toBeInTheDocument();
    });
  });
});

describe('SelectTrigger Component', () => {
  const defaultProps = {
    children: 'Test Trigger',
  };

  const triggerTestSuite = createComponentTestSuite(SelectTrigger, {
    name: 'SelectTrigger',
    type: 'interactive',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['border-input', 'flex', 'w-fit', 'items-center', 'justify-between', 'gap-2', 'rounded-md', 'border', 'bg-transparent', 'px-3', 'py-2', 'text-sm'],
      },
      {
        name: 'small size',
        props: { size: 'sm' },
        expectedClasses: ['data-[size=sm]:h-8'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-trigger-class' },
        expectedClasses: ['custom-trigger-class'],
      },
    ],
  });

  Object.entries(triggerTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('SelectTrigger-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectTrigger {...defaultProps} />);
      const trigger = container.firstChild;
      
      expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
    });

    it('should have correct data-size attribute', () => {
      const { container } = renderComponent(<SelectTrigger size="sm" {...defaultProps} />);
      const trigger = container.firstChild;
      
      expect(trigger).toHaveAttribute('data-size', 'sm');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectTrigger>
          <div data-testid="trigger-child">Trigger Child</div>
        </SelectTrigger>
      );

      expect(screen.getByTestId('trigger-child')).toBeInTheDocument();
    });

    it('should render chevron icon', () => {
      renderComponent(<SelectTrigger>Test</SelectTrigger>);
      
      // Check for chevron icon (lucide-react icon)
      const chevron = document.querySelector('[data-slot="select-trigger"] svg');
      expect(chevron).toBeInTheDocument();
    });
  });
});

describe('SelectValue Component', () => {
  const defaultProps = {
    children: 'Test Value',
  };

  const valueTestSuite = createComponentTestSuite(SelectValue, {
    name: 'SelectValue',
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
        props: { className: 'custom-value-class' },
        expectedClasses: ['custom-value-class'],
      },
    ],
  });

  Object.entries(valueTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('SelectValue-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectValue {...defaultProps} />);
      const value = container.firstChild;
      
      expect(value).toHaveAttribute('data-slot', 'select-value');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectValue>
          <span data-testid="value-child">Value Child</span>
        </SelectValue>
      );

      expect(screen.getByTestId('value-child')).toBeInTheDocument();
    });
  });
});

describe('SelectContent Component', () => {
  const defaultProps = {
    children: 'Test Content',
  };

  const contentTestSuite = createComponentTestSuite(SelectContent, {
    name: 'SelectContent',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['bg-popover', 'text-popover-foreground', 'relative', 'z-50', 'max-h-(--radix-select-content-available-height)', 'min-w-[8rem]', 'overflow-x-hidden', 'overflow-y-auto', 'rounded-md', 'border', 'shadow-md'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-content-class' },
        expectedClasses: ['custom-content-class'],
      },
    ],
  });

  Object.entries(contentTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('SelectContent-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectContent {...defaultProps} />);
      const content = container.firstChild;
      
      expect(content).toHaveAttribute('data-slot', 'select-content');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectContent>
          <div data-testid="content-child">Content Child</div>
        </SelectContent>
      );

      expect(screen.getByTestId('content-child')).toBeInTheDocument();
    });

    it('should render in portal', () => {
      renderComponent(<SelectContent>Portal Content</SelectContent>);
      
      // Content should be rendered in a portal (outside the normal DOM tree)
      expect(screen.getByText('Portal Content')).toBeInTheDocument();
    });
  });
});

describe('SelectItem Component', () => {
  const defaultProps = {
    value: 'test-value',
    children: 'Test Item',
  };

  const itemTestSuite = createComponentTestSuite(SelectItem, {
    name: 'SelectItem',
    type: 'interactive',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['relative', 'flex', 'w-full', 'cursor-default', 'items-center', 'gap-2', 'rounded-sm', 'py-1.5', 'pr-8', 'pl-2', 'text-sm'],
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

  describe('SelectItem-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectItem {...defaultProps} />);
      const item = container.firstChild;
      
      expect(item).toHaveAttribute('data-slot', 'select-item');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectItem value="test">
          <span data-testid="item-child">Item Child</span>
        </SelectItem>
      );

      expect(screen.getByTestId('item-child')).toBeInTheDocument();
    });

    it('should have correct value attribute', () => {
      const { container } = renderComponent(<SelectItem value="test-value">Test</SelectItem>);
      const item = container.firstChild;
      
      expect(item).toHaveAttribute('data-value', 'test-value');
    });
  });
});

describe('SelectLabel Component', () => {
  const defaultProps = {
    children: 'Test Label',
  };

  const labelTestSuite = createComponentTestSuite(SelectLabel, {
    name: 'SelectLabel',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['text-muted-foreground', 'px-2', 'py-1.5', 'text-xs'],
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

  describe('SelectLabel-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectLabel {...defaultProps} />);
      const label = container.firstChild;
      
      expect(label).toHaveAttribute('data-slot', 'select-label');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectLabel>
          <span data-testid="label-child">Label Child</span>
        </SelectLabel>
      );

      expect(screen.getByTestId('label-child')).toBeInTheDocument();
    });
  });
});

describe('SelectGroup Component', () => {
  const defaultProps = {
    children: 'Test Group',
  };

  const groupTestSuite = createComponentTestSuite(SelectGroup, {
    name: 'SelectGroup',
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
        props: { className: 'custom-group-class' },
        expectedClasses: ['custom-group-class'],
      },
    ],
  });

  Object.entries(groupTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('SelectGroup-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectGroup {...defaultProps} />);
      const group = container.firstChild;
      
      expect(group).toHaveAttribute('data-slot', 'select-group');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectGroup>
          <div data-testid="group-child">Group Child</div>
        </SelectGroup>
      );

      expect(screen.getByTestId('group-child')).toBeInTheDocument();
    });
  });
});

describe('SelectSeparator Component', () => {
  const defaultProps = {
    children: 'Test Separator',
  };

  const separatorTestSuite = createComponentTestSuite(SelectSeparator, {
    name: 'SelectSeparator',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['bg-border', 'pointer-events-none', '-mx-1', 'my-1', 'h-px'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-separator-class' },
        expectedClasses: ['custom-separator-class'],
      },
    ],
  });

  Object.entries(separatorTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('SelectSeparator-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<SelectSeparator {...defaultProps} />);
      const separator = container.firstChild;
      
      expect(separator).toHaveAttribute('data-slot', 'select-separator');
    });

    it('should render children correctly', () => {
      renderComponent(
        <SelectSeparator>
          <div data-testid="separator-child">Separator Child</div>
        </SelectSeparator>
      );

      expect(screen.getByTestId('separator-child')).toBeInTheDocument();
    });
  });
});

describe('Select Integration Tests', () => {
  it('should work together as a complete select component', async () => {
    const user = userEvent.setup();
    
    renderComponent(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectSeparator />
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="lettuce">Lettuce</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    // Check that trigger is rendered
    expect(screen.getByText('Select an option')).toBeInTheDocument();
    
    // Open the select
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    
    // Check that content is rendered
    await waitFor(() => {
      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
      expect(screen.getByText('Carrot')).toBeInTheDocument();
      expect(screen.getByText('Lettuce')).toBeInTheDocument();
    });
  });

  it('should handle selection correctly', async () => {
    const user = userEvent.setup();
    
    renderComponent(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    // Open select
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    
    // Select an option
    const option = screen.getByText('Option 1');
    await user.click(option);
    
    // Check that value is updated
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  it('should handle disabled state', () => {
    renderComponent(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('should handle custom styling on all components', () => {
    const { container } = renderComponent(
      <Select className="custom-select">
        <SelectTrigger className="custom-trigger">
          <SelectValue className="custom-value" placeholder="Custom" />
        </SelectTrigger>
        <SelectContent className="custom-content">
          <SelectGroup className="custom-group">
            <SelectLabel className="custom-label">Label</SelectLabel>
            <SelectItem className="custom-item" value="test">Test</SelectItem>
            <SelectSeparator className="custom-separator" />
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const select = container.querySelector('[data-slot="select"]');
    expect(select).toHaveClass('custom-select');
    
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toHaveClass('custom-trigger');
    
    const value = container.querySelector('[data-slot="select-value"]');
    expect(value).toHaveClass('custom-value');
  });
}); 