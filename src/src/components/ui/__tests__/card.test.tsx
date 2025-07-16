/**
 * Card component tests
 * Tests for Card and all its sub-components (CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction)
 */

import React from 'react';
import { screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../card';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';

describe('Card Component', () => {
  // Basic props for testing
  const defaultProps = {
    children: 'Test Card Content',
  };

  // Create comprehensive test suite for Card
  const cardTestSuite = createComponentTestSuite(Card, {
    name: 'Card',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['bg-card', 'text-card-foreground', 'flex', 'flex-col', 'gap-6', 'rounded-xl', 'border', 'py-6', 'shadow-sm'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-card-class' },
        expectedClasses: ['custom-card-class'],
      },
    ],
  });

  // Run the generated test suite for Card
  Object.entries(cardTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Card component
  describe('Card-specific functionality', () => {
    it('should render children correctly', () => {
      renderComponent(
        <Card>
          <div data-testid="card-child">Card Child</div>
        </Card>
      );

      expect(screen.getByTestId('card-child')).toBeInTheDocument();
      expect(screen.getByText('Card Child')).toBeInTheDocument();
    });

    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<Card {...defaultProps} />);
      const card = container.firstChild;
      
      expect(card).toHaveAttribute('data-slot', 'card');
    });

    it('should handle complex nested content', () => {
      renderComponent(
        <Card>
          <div>Header</div>
          <div>Content</div>
          <div>Footer</div>
        </Card>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('should apply custom styles correctly', () => {
      const { container } = renderComponent(
        <Card className="bg-red-500 text-white">
          Custom Styled Card
        </Card>
      );

      const card = container.firstChild;
      expect(card).toHaveClass('bg-red-500');
      expect(card).toHaveClass('text-white');
    });
  });
});

describe('CardHeader Component', () => {
  const defaultProps = {
    children: 'Test Header',
  };

  const headerTestSuite = createComponentTestSuite(CardHeader, {
    name: 'CardHeader',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['@container/card-header', 'grid', 'auto-rows-min', 'grid-rows-[auto_auto]', 'items-start', 'gap-1.5', 'px-6'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-header-class' },
        expectedClasses: ['custom-header-class'],
      },
    ],
  });

  Object.entries(headerTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('CardHeader-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<CardHeader {...defaultProps} />);
      const header = container.firstChild;
      
      expect(header).toHaveAttribute('data-slot', 'card-header');
    });

    it('should render children correctly', () => {
      renderComponent(
        <CardHeader>
          <div data-testid="header-child">Header Child</div>
        </CardHeader>
      );

      expect(screen.getByTestId('header-child')).toBeInTheDocument();
    });
  });
});

describe('CardTitle Component', () => {
  const defaultProps = {
    children: 'Test Title',
  };

  const titleTestSuite = createComponentTestSuite(CardTitle, {
    name: 'CardTitle',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['leading-none', 'font-semibold'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-title-class' },
        expectedClasses: ['custom-title-class'],
      },
    ],
  });

  Object.entries(titleTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('CardTitle-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<CardTitle {...defaultProps} />);
      const title = container.firstChild;
      
      expect(title).toHaveAttribute('data-slot', 'card-title');
    });

    it('should render children correctly', () => {
      renderComponent(
        <CardTitle>
          <span data-testid="title-child">Title Child</span>
        </CardTitle>
      );

      expect(screen.getByTestId('title-child')).toBeInTheDocument();
    });
  });
});

describe('CardDescription Component', () => {
  const defaultProps = {
    children: 'Test Description',
  };

  const descriptionTestSuite = createComponentTestSuite(CardDescription, {
    name: 'CardDescription',
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

  describe('CardDescription-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<CardDescription {...defaultProps} />);
      const description = container.firstChild;
      
      expect(description).toHaveAttribute('data-slot', 'card-description');
    });

    it('should render children correctly', () => {
      renderComponent(
        <CardDescription>
          <span data-testid="description-child">Description Child</span>
        </CardDescription>
      );

      expect(screen.getByTestId('description-child')).toBeInTheDocument();
    });
  });
});

describe('CardContent Component', () => {
  const defaultProps = {
    children: 'Test Content',
  };

  const contentTestSuite = createComponentTestSuite(CardContent, {
    name: 'CardContent',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['px-6'],
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

  describe('CardContent-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<CardContent {...defaultProps} />);
      const content = container.firstChild;
      
      expect(content).toHaveAttribute('data-slot', 'card-content');
    });

    it('should render children correctly', () => {
      renderComponent(
        <CardContent>
          <div data-testid="content-child">Content Child</div>
        </CardContent>
      );

      expect(screen.getByTestId('content-child')).toBeInTheDocument();
    });
  });
});

describe('CardFooter Component', () => {
  const defaultProps = {
    children: 'Test Footer',
  };

  const footerTestSuite = createComponentTestSuite(CardFooter, {
    name: 'CardFooter',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['flex', 'items-center', 'px-6'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-footer-class' },
        expectedClasses: ['custom-footer-class'],
      },
    ],
  });

  Object.entries(footerTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('CardFooter-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<CardFooter {...defaultProps} />);
      const footer = container.firstChild;
      
      expect(footer).toHaveAttribute('data-slot', 'card-footer');
    });

    it('should render children correctly', () => {
      renderComponent(
        <CardFooter>
          <div data-testid="footer-child">Footer Child</div>
        </CardFooter>
      );

      expect(screen.getByTestId('footer-child')).toBeInTheDocument();
    });
  });
});

describe('CardAction Component', () => {
  const defaultProps = {
    children: 'Test Action',
  };

  const actionTestSuite = createComponentTestSuite(CardAction, {
    name: 'CardAction',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['col-start-2', 'row-span-2', 'row-start-1', 'self-start', 'justify-self-end'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-action-class' },
        expectedClasses: ['custom-action-class'],
      },
    ],
  });

  Object.entries(actionTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('CardAction-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<CardAction {...defaultProps} />);
      const action = container.firstChild;
      
      expect(action).toHaveAttribute('data-slot', 'card-action');
    });

    it('should render children correctly', () => {
      renderComponent(
        <CardAction>
          <button data-testid="action-child">Action Child</button>
        </CardAction>
      );

      expect(screen.getByTestId('action-child')).toBeInTheDocument();
    });
  });
});

describe('Card Integration Tests', () => {
  it('should work together as a complete card', () => {
    renderComponent(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>
            <button>Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Save</button>
          <button>Cancel</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card content goes here')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should handle custom styling on all components', () => {
    const { container } = renderComponent(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-description">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );

    const card = container.firstChild;
    expect(card).toHaveClass('custom-card');
    
    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toHaveClass('custom-header');
    
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).toHaveClass('custom-title');
    
    const description = container.querySelector('[data-slot="card-description"]');
    expect(description).toHaveClass('custom-description');
    
    const content = container.querySelector('[data-slot="card-content"]');
    expect(content).toHaveClass('custom-content');
    
    const footer = container.querySelector('[data-slot="card-footer"]');
    expect(footer).toHaveClass('custom-footer');
  });
}); 