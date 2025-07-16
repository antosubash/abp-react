/**
 * Table component tests
 * Tests for Table and all its sub-components
 */

import React from 'react';
import { screen } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '../table';
import { renderComponent } from '../../../../__tests__/utils/component-testing';
import { createComponentTestSuite } from '../../../../__tests__/utils/component-test-patterns';

describe('Table Component', () => {
  // Basic props for testing
  const defaultProps = {
    children: 'Test Table',
  };

  // Create comprehensive test suite for Table
  const tableTestSuite = createComponentTestSuite(Table, {
    name: 'Table',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['w-full', 'caption-bottom', 'text-sm'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-table-class' },
        expectedClasses: ['custom-table-class'],
      },
    ],
  });

  // Run the generated test suite for Table
  Object.entries(tableTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  // Additional specific tests for Table component
  describe('Table-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<Table {...defaultProps} />);
      const table = container.querySelector('[data-slot="table"]');
      
      expect(table).toHaveAttribute('data-slot', 'table');
    });

    it('should have table container wrapper', () => {
      const { container } = renderComponent(<Table {...defaultProps} />);
      const containerDiv = container.querySelector('[data-slot="table-container"]');
      
      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv).toHaveClass('relative', 'w-full', 'overflow-x-auto');
    });

    it('should render children correctly', () => {
      renderComponent(
        <Table>
          <tbody>
            <tr>
              <td data-testid="table-child">Table Child</td>
            </tr>
          </tbody>
        </Table>
      );

      expect(screen.getByTestId('table-child')).toBeInTheDocument();
    });
  });
});

describe('TableHeader Component', () => {
  const defaultProps = {
    children: 'Test Header',
  };

  const headerTestSuite = createComponentTestSuite(TableHeader, {
    name: 'TableHeader',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['[&_tr]:border-b'],
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

  describe('TableHeader-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableHeader {...defaultProps} />);
      const header = container.firstChild;
      
      expect(header).toHaveAttribute('data-slot', 'table-header');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableHeader>
          <tr>
            <th data-testid="header-child">Header Child</th>
          </tr>
        </TableHeader>
      );

      expect(screen.getByTestId('header-child')).toBeInTheDocument();
    });
  });
});

describe('TableBody Component', () => {
  const defaultProps = {
    children: 'Test Body',
  };

  const bodyTestSuite = createComponentTestSuite(TableBody, {
    name: 'TableBody',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['[&_tr:last-child]:border-0'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-body-class' },
        expectedClasses: ['custom-body-class'],
      },
    ],
  });

  Object.entries(bodyTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('TableBody-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableBody {...defaultProps} />);
      const body = container.firstChild;
      
      expect(body).toHaveAttribute('data-slot', 'table-body');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableBody>
          <tr>
            <td data-testid="body-child">Body Child</td>
          </tr>
        </TableBody>
      );

      expect(screen.getByTestId('body-child')).toBeInTheDocument();
    });
  });
});

describe('TableFooter Component', () => {
  const defaultProps = {
    children: 'Test Footer',
  };

  const footerTestSuite = createComponentTestSuite(TableFooter, {
    name: 'TableFooter',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['bg-muted/50', 'border-t', 'font-medium', '[&>tr]:last:border-b-0'],
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

  describe('TableFooter-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableFooter {...defaultProps} />);
      const footer = container.firstChild;
      
      expect(footer).toHaveAttribute('data-slot', 'table-footer');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableFooter>
          <tr>
            <td data-testid="footer-child">Footer Child</td>
          </tr>
        </TableFooter>
      );

      expect(screen.getByTestId('footer-child')).toBeInTheDocument();
    });
  });
});

describe('TableRow Component', () => {
  const defaultProps = {
    children: 'Test Row',
  };

  const rowTestSuite = createComponentTestSuite(TableRow, {
    name: 'TableRow',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['hover:bg-muted/50', 'data-[state=selected]:bg-muted', 'border-b', 'transition-colors'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-row-class' },
        expectedClasses: ['custom-row-class'],
      },
    ],
  });

  Object.entries(rowTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('TableRow-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableRow {...defaultProps} />);
      const row = container.firstChild;
      
      expect(row).toHaveAttribute('data-slot', 'table-row');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableRow>
          <td data-testid="row-child">Row Child</td>
        </TableRow>
      );

      expect(screen.getByTestId('row-child')).toBeInTheDocument();
    });

    it('should handle selected state', () => {
      const { container } = renderComponent(
        <TableRow data-state="selected">
          <td>Selected Row</td>
        </TableRow>
      );

      const row = container.firstChild;
      expect(row).toHaveAttribute('data-state', 'selected');
    });
  });
});

describe('TableHead Component', () => {
  const defaultProps = {
    children: 'Test Head',
  };

  const headTestSuite = createComponentTestSuite(TableHead, {
    name: 'TableHead',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['text-foreground', 'h-10', 'px-2', 'text-left', 'align-middle', 'font-medium', 'whitespace-nowrap'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-head-class' },
        expectedClasses: ['custom-head-class'],
      },
    ],
  });

  Object.entries(headTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('TableHead-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableHead {...defaultProps} />);
      const head = container.firstChild;
      
      expect(head).toHaveAttribute('data-slot', 'table-head');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableHead>
          <span data-testid="head-child">Head Child</span>
        </TableHead>
      );

      expect(screen.getByTestId('head-child')).toBeInTheDocument();
    });
  });
});

describe('TableCell Component', () => {
  const defaultProps = {
    children: 'Test Cell',
  };

  const cellTestSuite = createComponentTestSuite(TableCell, {
    name: 'TableCell',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['p-2', 'align-middle', 'whitespace-nowrap'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-cell-class' },
        expectedClasses: ['custom-cell-class'],
      },
    ],
  });

  Object.entries(cellTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('TableCell-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableCell {...defaultProps} />);
      const cell = container.firstChild;
      
      expect(cell).toHaveAttribute('data-slot', 'table-cell');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableCell>
          <span data-testid="cell-child">Cell Child</span>
        </TableCell>
      );

      expect(screen.getByTestId('cell-child')).toBeInTheDocument();
    });
  });
});

describe('TableCaption Component', () => {
  const defaultProps = {
    children: 'Test Caption',
  };

  const captionTestSuite = createComponentTestSuite(TableCaption, {
    name: 'TableCaption',
    type: 'layout',
    defaultProps,
    variants: [
      {
        name: 'default',
        props: {},
        expectedClasses: ['text-muted-foreground', 'mt-4', 'text-sm'],
      },
      {
        name: 'with custom className',
        props: { className: 'custom-caption-class' },
        expectedClasses: ['custom-caption-class'],
      },
    ],
  });

  Object.entries(captionTestSuite).forEach(([testName, testFn]) => {
    it(testName, testFn);
  });

  describe('TableCaption-specific functionality', () => {
    it('should have correct data-slot attribute', () => {
      const { container } = renderComponent(<TableCaption {...defaultProps} />);
      const caption = container.firstChild;
      
      expect(caption).toHaveAttribute('data-slot', 'table-caption');
    });

    it('should render children correctly', () => {
      renderComponent(
        <TableCaption>
          <span data-testid="caption-child">Caption Child</span>
        </TableCaption>
      );

      expect(screen.getByTestId('caption-child')).toBeInTheDocument();
    });
  });
});

describe('Table Integration Tests', () => {
  it('should work together as a complete table', () => {
    renderComponent(
      <Table>
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: 2 users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByText('User List')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Total: 2 users')).toBeInTheDocument();
  });

  it('should handle custom styling on all components', () => {
    const { container } = renderComponent(
      <Table className="custom-table">
        <TableCaption className="custom-caption">Custom Caption</TableCaption>
        <TableHeader className="custom-header">
          <TableRow className="custom-row">
            <TableHead className="custom-head">Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="custom-body">
          <TableRow className="custom-row">
            <TableCell className="custom-cell">Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="custom-footer">
          <TableRow className="custom-row">
            <TableCell className="custom-cell">Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const table = container.querySelector('[data-slot="table"]');
    expect(table).toHaveClass('custom-table');
    
    const caption = container.querySelector('[data-slot="table-caption"]');
    expect(caption).toHaveClass('custom-caption');
    
    const header = container.querySelector('[data-slot="table-header"]');
    expect(header).toHaveClass('custom-header');
    
    const head = container.querySelector('[data-slot="table-head"]');
    expect(head).toHaveClass('custom-head');
    
    const body = container.querySelector('[data-slot="table-body"]');
    expect(body).toHaveClass('custom-body');
    
    const row = container.querySelector('[data-slot="table-row"]');
    expect(row).toHaveClass('custom-row');
    
    const cell = container.querySelector('[data-slot="table-cell"]');
    expect(cell).toHaveClass('custom-cell');
    
    const footer = container.querySelector('[data-slot="table-footer"]');
    expect(footer).toHaveClass('custom-footer');
  });

  it('should handle table with no data', () => {
    renderComponent(
      <Table>
        <TableCaption>Empty Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* No rows */}
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Empty Table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should handle table with many rows', () => {
    const users = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    renderComponent(
      <Table>
        <TableCaption>Many Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Many Users')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    
    // Check that all users are rendered
    users.forEach((user) => {
      expect(screen.getByText(user.id.toString())).toBeInTheDocument();
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });
}); 