---
sidebar_position: 3
---

# Testing Guide

Testing is a crucial part of building reliable and maintainable applications. ABP React provides comprehensive testing capabilities using modern testing tools and best practices.

## 🎯 Testing Strategy

### Testing Pyramid

ABP React follows the testing pyramid approach:

```
    ┌─────────────┐
    │   E2E Tests │  (Few, high-level)
    └─────────────┘
    ┌─────────────┐
    │Integration  │  (Some, medium-level)
    │   Tests     │
    └─────────────┘
    ┌─────────────┐
    │  Unit Tests │  (Many, low-level)
    └─────────────┘
```

### Testing Tools

- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing
- **MSW (Mock Service Worker)**: API mocking

## 🧪 Unit Testing

### Setting Up Unit Tests

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Testing Utilities

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

### Component Testing

```typescript
// UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(onEdit).toHaveBeenCalledWith(mockUser.id);
  });

  it('shows delete confirmation when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<UserCard user={mockUser} onDelete={onDelete} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });
});
```

### Hook Testing

```typescript
// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    expect(result.current.count).toBe(5);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(1));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(0);
  });

  it('should reset counter', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(0);
  });
});
```

### Utility Function Testing

```typescript
// utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, validateEmail, debounce } from './utils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2023-01-15');
    const formatted = formatDate(date);
    
    expect(formatted).toBe('Jan 15, 2023');
  });

  it('should handle invalid date', () => {
    const formatted = formatDate('invalid-date');
    
    expect(formatted).toBe('Invalid Date');
  });
});

describe('validateEmail', () => {
  it('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('should reject invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });
});

describe('debounce', () => {
  it('should debounce function calls', async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);
    
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    expect(fn).not.toHaveBeenCalled();
    
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
```

## 🔗 Integration Testing

### API Integration Testing

```typescript
// userService.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userService } from './userService';
import { api } from '@/lib/api';

// Mock the API module
vi.mock('@/lib/api');

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch users successfully', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockUsers });

    const result = await userService.getUsers();

    expect(api.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual(mockUsers);
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(userService.getUsers()).rejects.toThrow('Network error');
  });
});
```

### Component Integration Testing

```typescript
// UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { UserList } from './UserList';
import { userService } from './userService';

// Mock the user service
vi.mock('./userService');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('UserList', () => {
  it('should render users from API', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);

    render(
      <TestWrapper>
        <UserList />
      </TestWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should handle loading state', () => {
    vi.mocked(userService.getUsers).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <TestWrapper>
        <UserList />
      </TestWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    vi.mocked(userService.getUsers).mockRejectedValue(
      new Error('Failed to fetch users')
    );

    render(
      <TestWrapper>
        <UserList />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading users')).toBeInTheDocument();
    });
  });
});
```

## 🌐 End-to-End Testing

### Setting Up Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email"]', 'admin@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email"]', 'invalid@example.com');
    await page.fill('[data-testid="password"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      'Invalid credentials'
    );
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'admin@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    
    await expect(page).toHaveURL('/login');
  });
});
```

```typescript
// e2e/user-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'admin@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
  });

  test('should create a new user', async ({ page }) => {
    await page.goto('/admin/users');
    
    await page.click('[data-testid="create-user-button"]');
    
    await page.fill('[data-testid="user-name"]', 'New User');
    await page.fill('[data-testid="user-email"]', 'newuser@example.com');
    await page.selectOption('[data-testid="user-role"]', 'User');
    
    await page.click('[data-testid="save-button"]');
    
    await expect(page.locator('text=New User')).toBeVisible();
    await expect(page.locator('text=newuser@example.com')).toBeVisible();
  });

  test('should edit existing user', async ({ page }) => {
    await page.goto('/admin/users');
    
    await page.click('[data-testid="edit-user-1"]');
    
    await page.fill('[data-testid="user-name"]', 'Updated Name');
    await page.click('[data-testid="save-button"]');
    
    await expect(page.locator('text=Updated Name')).toBeVisible();
  });

  test('should delete user', async ({ page }) => {
    await page.goto('/admin/users');
    
    await page.click('[data-testid="delete-user-1"]');
    await page.click('[data-testid="confirm-delete"]');
    
    await expect(page.locator('[data-testid="user-1"]')).not.toBeVisible();
  });
});
```

## 🎭 Mocking

### API Mocking with MSW

```typescript
// src/test/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ])
    );
  }),

  rest.post('/api/users', (req, res, ctx) => {
    const { name, email } = req.body as any;
    
    return res(
      ctx.status(201),
      ctx.json({
        id: '3',
        name,
        email,
        createdAt: new Date().toISOString(),
      })
    );
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
```

```typescript
// src/test/setup.ts
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Component Mocking

```typescript
// Mocking child components
vi.mock('./UserCard', () => ({
  UserCard: ({ user, onEdit, onDelete }: any) => (
    <div data-testid="user-card">
      <span data-testid="user-name">{user.name}</span>
      <button onClick={() => onEdit?.(user.id)}>Edit</button>
      <button onClick={() => onDelete?.(user.id)}>Delete</button>
    </div>
  ),
}));
```

## 📊 Test Coverage

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
});
```

### Coverage Reports

```bash
# Run tests with coverage
npm run test:coverage

# Generate coverage report
npm run test:coverage:report
```

## 🚀 Performance Testing

### Component Performance Testing

```typescript
// Performance test example
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserList } from './UserList';

describe('UserList Performance', () => {
  it('should render large lists efficiently', () => {
    const largeUserList = Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));

    const startTime = performance.now();
    
    render(<UserList users={largeUserList} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render in less than 100ms
    expect(renderTime).toBeLessThan(100);
  });
});
```

## 🔧 Test Utilities

### Custom Test Helpers

```typescript
// src/test/utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Test Data Factories

```typescript
// src/test/factories.ts
import { faker } from '@faker-js/faker';

export const createUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['Admin', 'User', 'Manager']),
  createdAt: faker.date.past().toISOString(),
  ...overrides,
});

export const createUserList = (count: number) =>
  Array.from({ length: count }, () => createUser());
```

## 📝 Best Practices

### 1. Test Organization

```typescript
// Organize tests by feature
describe('User Management', () => {
  describe('User List', () => {
    it('should display users', () => { /* ... */ });
    it('should handle empty state', () => { /* ... */ });
  });

  describe('User Creation', () => {
    it('should create user successfully', () => { /* ... */ });
    it('should validate required fields', () => { /* ... */ });
  });
});
```

### 2. Test Naming

```typescript
// Use descriptive test names
it('should show error message when email is invalid', () => { /* ... */ });
it('should redirect to dashboard after successful login', () => { /* ... */ });
it('should disable submit button when form is invalid', () => { /* ... */ });
```

### 3. Test Isolation

```typescript
// Each test should be independent
describe('UserService', () => {
  beforeEach(() => {
    // Reset mocks and state before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks();
  });
});
```

### 4. Assertion Best Practices

```typescript
// Test behavior, not implementation
// Good
expect(screen.getByText('User created successfully')).toBeInTheDocument();

// Avoid
expect(mockApi.createUser).toHaveBeenCalledWith(userData);
```

## 📚 Related Documentation

- **[Custom Hooks](/docs/development/custom-hooks)** - Testing custom hooks
- **[API Integration](/docs/fundamentals/api-integration)** - Testing API calls
- **[Performance Optimization](/docs/development/performance)** - Performance testing
- **[Component Development](/docs/components/ui-components)** - Component testing

---

Testing is essential for building reliable applications. By following these testing patterns and best practices, you can ensure your ABP React application is robust, maintainable, and bug-free. 