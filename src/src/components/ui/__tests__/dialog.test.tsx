/**
 * Dialog component tests
 * Tests for Dialog and all its sub-components
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DialogClose } from '../dialog';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';

describe('Dialog Component', () => {
  // Basic props for testing
  const defaultProps = {
    children: 'Test Dialog',
  };

  // Create comprehensive test suite for Dialog
  const dialogTestSuite = createComponentTestSuite(Dialog, {
    name: 'Dialog',
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
        props: { className: 'custom-dialog-class' },
        expectedClasses: ['custom-dialog-class'],
      },
    ],
  });

  // Run the generated test suite for Dialog
  Object.entries(dialogTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Dialog component
  describe('Dialog-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<Dialog {...defaultProps} />);
      const dialog = container.firstChild;
      
      expect(dialog).toHaveAttribute('data-slot', 'dialog');
    });

    it('should render children correctly', () => {
      renderComponent(
        <Dialog>
          <div data-testid="dialog-child">Dialog Child</div>
        </Dialog>
      );

      expect(screen.getByTestId('dialog-child')).toBeInTheDocument();
    });
  });
});

describe('DialogTrigger Component', () => {
  const defaultProps = {
    children: 'Test Trigger',
  };

  const triggerTestSuite = createComponentTestSuite(DialogTrigger, {
    name: 'DialogTrigger',
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
        props: { className: 'custom-trigger-class' },
        expectedClasses: ['custom-trigger-class'],
      },
    ],
  });

  Object.entries(triggerTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('DialogTrigger-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogTrigger {...defaultProps} />);
      const trigger = container.firstChild;
      
      expect(trigger).toHaveAttribute('data-slot', 'dialog-trigger');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogTrigger>
          <button data-testid="trigger-child">Trigger Child</button>
        </DialogTrigger>
      );

      expect(screen.getByTestId('trigger-child')).toBeInTheDocument();
    });
  });
});

describe('DialogContent Component', () => {
  const defaultProps = {
    children: 'Test Content',
  };

  const contentTestSuite = createComponentTestSuite(DialogContent, {
    name: 'DialogContent',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['bg-background', 'fixed', 'top-[50%]', 'left-[50%]', 'z-50', 'grid', 'w-full', 'max-w-[calc(100%-2rem)]', 'translate-x-[-50%]', 'translate-y-[-50%]', 'gap-4', 'rounded-lg', 'border', 'p-6', 'shadow-lg'],
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

  describe('DialogContent-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogContent {...defaultProps} />);
      const content = container.firstChild;
      
      expect(content).toHaveAttribute('data-slot', 'dialog-content');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogContent>
          <div data-testid="content-child">Content Child</div>
        </DialogContent>
      );

      expect(screen.getByTestId('content-child')).toBeInTheDocument();
    });

    it('should render close button', () => {
      renderComponent(<DialogContent>Test Content</DialogContent>);
      
      // Check for close button with X icon
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('should render in portal', () => {
      renderComponent(<DialogContent>Portal Content</DialogContent>);
      
      // Content should be rendered in a portal
      expect(screen.getByText('Portal Content')).toBeInTheDocument();
    });
  });
});

describe('DialogOverlay Component', () => {
  const defaultProps = {
    children: 'Test Overlay',
  };

  const overlayTestSuite = createComponentTestSuite(DialogOverlay, {
    name: 'DialogOverlay',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['fixed', 'inset-0', 'z-50', 'bg-black/50'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-overlay-class' },
        expectedClasses: ['custom-overlay-class'],
      },
    ],
  });

  Object.entries(overlayTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('DialogOverlay-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogOverlay {...defaultProps} />);
      const overlay = container.firstChild;
      
      expect(overlay).toHaveAttribute('data-slot', 'dialog-overlay');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogOverlay>
          <div data-testid="overlay-child">Overlay Child</div>
        </DialogOverlay>
      );

      expect(screen.getByTestId('overlay-child')).toBeInTheDocument();
    });
  });
});

describe('DialogHeader Component', () => {
  const defaultProps = {
    children: 'Test Header',
  };

  const headerTestSuite = createComponentTestSuite(DialogHeader, {
    name: 'DialogHeader',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['flex', 'flex-col', 'gap-2', 'text-center', 'sm:text-left'],
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

  describe('DialogHeader-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogHeader {...defaultProps} />);
      const header = container.firstChild;
      
      expect(header).toHaveAttribute('data-slot', 'dialog-header');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogHeader>
          <div data-testid="header-child">Header Child</div>
        </DialogHeader>
      );

      expect(screen.getByTestId('header-child')).toBeInTheDocument();
    });
  });
});

describe('DialogFooter Component', () => {
  const defaultProps = {
    children: 'Test Footer',
  };

  const footerTestSuite = createComponentTestSuite(DialogFooter, {
    name: 'DialogFooter',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['flex', 'flex-col-reverse', 'gap-2', 'sm:flex-row', 'sm:justify-end'],
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

  describe('DialogFooter-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogFooter {...defaultProps} />);
      const footer = container.firstChild;
      
      expect(footer).toHaveAttribute('data-slot', 'dialog-footer');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogFooter>
          <div data-testid="footer-child">Footer Child</div>
        </DialogFooter>
      );

      expect(screen.getByTestId('footer-child')).toBeInTheDocument();
    });
  });
});

describe('DialogTitle Component', () => {
  const defaultProps = {
    children: 'Test Title',
  };

  const titleTestSuite = createComponentTestSuite(DialogTitle, {
    name: 'DialogTitle',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['text-lg', 'leading-none', 'font-semibold'],
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

  describe('DialogTitle-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogTitle {...defaultProps} />);
      const title = container.firstChild;
      
      expect(title).toHaveAttribute('data-slot', 'dialog-title');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogTitle>
          <span data-testid="title-child">Title Child</span>
        </DialogTitle>
      );

      expect(screen.getByTestId('title-child')).toBeInTheDocument();
    });
  });
});

describe('DialogDescription Component', () => {
  const defaultProps = {
    children: 'Test Description',
  };

  const descriptionTestSuite = createComponentTestSuite(DialogDescription, {
    name: 'DialogDescription',
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

  describe('DialogDescription-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogDescription {...defaultProps} />);
      const description = container.firstChild;
      
      expect(description).toHaveAttribute('data-slot', 'dialog-description');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogDescription>
          <span data-testid="description-child">Description Child</span>
        </DialogDescription>
      );

      expect(screen.getByTestId('description-child')).toBeInTheDocument();
    });
  });
});

describe('DialogClose Component', () => {
  const defaultProps = {
    children: 'Test Close',
  };

  const closeTestSuite = createComponentTestSuite(DialogClose, {
    name: 'DialogClose',
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
        props: { className: 'custom-close-class' },
        expectedClasses: ['custom-close-class'],
      },
    ],
  });

  Object.entries(closeTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('DialogClose-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogClose {...defaultProps} />);
      const close = container.firstChild;
      
      expect(close).toHaveAttribute('data-slot', 'dialog-close');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogClose>
          <span data-testid="close-child">Close Child</span>
        </DialogClose>
      );

      expect(screen.getByTestId('close-child')).toBeInTheDocument();
    });
  });
});

describe('DialogPortal Component', () => {
  const defaultProps = {
    children: 'Test Portal',
  };

  const portalTestSuite = createComponentTestSuite(DialogPortal, {
    name: 'DialogPortal',
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
        props: { className: 'custom-portal-class' },
        expectedClasses: ['custom-portal-class'],
      },
    ],
  });

  Object.entries(portalTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('DialogPortal-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<DialogPortal {...defaultProps} />);
      const portal = container.firstChild;
      
      expect(portal).toHaveAttribute('data-slot', 'dialog-portal');
    });

    it('should render children correctly', () => {
      renderComponent(
        <DialogPortal>
          <div data-testid="portal-child">Portal Child</div>
        </DialogPortal>
      );

      expect(screen.getByTestId('portal-child')).toBeInTheDocument();
    });
  });
});

describe('Dialog Integration Tests', () => {
  it('should work together as a complete dialog component', async () => {
    const user = userEvent.setup();
    
    renderComponent(
      <Dialog>
        <DialogTrigger>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog content goes here</div>
          <DialogFooter>
            <button>Cancel</button>
            <button>Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // Check that trigger is rendered
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    
    // Open the dialog
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    await user.click(trigger);
    
    // Check that content is rendered
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
      expect(screen.getByText('Dialog Description')).toBeInTheDocument();
      expect(screen.getByText('Dialog content goes here')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  it('should close dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    
    renderComponent(
      <Dialog>
        <DialogTrigger>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <div>Content</div>
        </DialogContent>
      </Dialog>
    );

    // Open dialog
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    await user.click(trigger);
    
    // Wait for dialog to open
    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });
    
    // Close dialog
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    // Check that dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
    });
  });

  it('should handle custom styling on all components', () => {
    const { container } = renderComponent(
      <Dialog className="custom-dialog">
        <DialogTrigger className="custom-trigger">
          <button>Trigger</button>
        </DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Title</DialogTitle>
            <DialogDescription className="custom-description">Description</DialogDescription>
          </DialogHeader>
          <div>Content</div>
          <DialogFooter className="custom-footer">
            <button>Action</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const dialog = container.querySelector('[data-slot="dialog"]');
    expect(dialog).toHaveClass('custom-dialog');
    
    const trigger = container.querySelector('[data-slot="dialog-trigger"]');
    expect(trigger).toHaveClass('custom-trigger');
    
    const content = container.querySelector('[data-slot="dialog-content"]');
    expect(content).toHaveClass('custom-content');
    
    const header = container.querySelector('[data-slot="dialog-header"]');
    expect(header).toHaveClass('custom-header');
    
    const title = container.querySelector('[data-slot="dialog-title"]');
    expect(title).toHaveClass('custom-title');
    
    const description = container.querySelector('[data-slot="dialog-description"]');
    expect(description).toHaveClass('custom-description');
    
    const footer = container.querySelector('[data-slot="dialog-footer"]');
    expect(footer).toHaveClass('custom-footer');
  });

  it('should handle keyboard interactions', async () => {
    const user = userEvent.setup();
    
    renderComponent(
      <Dialog>
        <DialogTrigger>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Keyboard Test</DialogTitle>
          <div>Content</div>
        </DialogContent>
      </Dialog>
    );

    // Open dialog
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    await user.click(trigger);
    
    // Wait for dialog to open
    await waitFor(() => {
      expect(screen.getByText('Keyboard Test')).toBeInTheDocument();
    });
    
    // Press Escape to close
    await user.keyboard('{Escape}');
    
    // Check that dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Keyboard Test')).not.toBeInTheDocument();
    });
  });
}); 