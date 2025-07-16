# Testing Strategy for ABP React Application

This document outlines the comprehensive testing strategy for the ABP React application, covering unit tests, integration tests, end-to-end tests, and performance testing.

## Testing Pyramid

Our testing strategy follows the testing pyramid approach:

```
    E2E Tests (Few)
       /\
      /  \
     /    \
Integration Tests (Some)
    /\
   /  \
  /    \
Unit Tests (Many)
```

## 1. Unit Testing

### Framework: Jest + React Testing Library

Unit tests focus on individual components and functions in isolation.

### Test Structure

```typescript
// __tests__/components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Coverage Areas

- **UI Components**: All reusable components
- **Hooks**: Custom React hooks
- **Utilities**: Helper functions and utilities
- **Form Validation**: Zod schemas and validation logic
- **API Client**: API interaction functions

### Running Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for CI
pnpm test:ci
```

## 2. Integration Testing

### Framework: Jest + React Testing Library + MSW

Integration tests verify that multiple components work together correctly.

### Test Structure

```typescript
// __tests__/integration/AddUser.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '../setup/msw-setup';
import AddUser from '@/components/user/AddUser';

describe('AddUser Integration', () => {
  test('creates user successfully', async () => {
    server.use(
      rest.post('/api/identity/users', (req, res, ctx) => {
        return res(ctx.json({ id: '123', userName: 'testuser' }));
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <AddUser />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/user created successfully/i)).toBeInTheDocument();
    });
  });
});
```

### Coverage Areas

- **Form Submissions**: Complete form workflows
- **API Integration**: Data fetching and mutations
- **State Management**: React Query integration
- **Authentication Flows**: Login/logout processes
- **Navigation**: Route changes and guards

## 3. End-to-End Testing

### Framework: Playwright

E2E tests verify complete user workflows in a real browser environment.

### Test Categories

#### Authentication Tests (`auth.spec.ts`)
- Login with valid/invalid credentials
- Session management
- Logout functionality
- Access control

#### Admin Dashboard Tests (`admin-dashboard.spec.ts`)
- Navigation between pages
- User management (CRUD operations)
- Role management
- Settings configuration

#### CMS Tests (`cms.spec.ts`)
- Page creation and editing
- Menu management
- Content publishing
- Comment moderation

#### Performance Tests (`performance.spec.ts`)
- Page load times
- API response times
- User interaction performance
- Memory usage monitoring

#### Visual Regression Tests (`visual-regression.spec.ts`)
- UI consistency across changes
- Responsive design verification
- Theme switching
- Component visual states

### Running E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests with UI mode
pnpm test:e2e:ui

# Run tests in headed mode
pnpm test:e2e:headed

# Run specific test file
pnpm test:e2e auth.spec.ts

# Run tests in specific browser
pnpm test:e2e --project=chromium
```

## 4. Performance Testing

### Metrics Tracked

- **Page Load Times**: Time to interactive
- **API Response Times**: Backend performance
- **User Interaction Times**: Form submissions, navigation
- **Memory Usage**: JavaScript heap size
- **Bundle Size**: Application size monitoring

### Performance Budgets

```typescript
// Performance assertions
expect(loadTime).toBeLessThan(3000); // Dashboard load
expect(apiResponseTime).toBeLessThan(500); // API calls
expect(formSubmissionTime).toBeLessThan(2000); // Form submissions
```

## 5. Visual Regression Testing

### Purpose
Ensure UI consistency across changes and prevent visual regressions.

### Test Coverage
- Page layouts and components
- Responsive design (mobile, tablet, desktop)
- Theme variations (light/dark mode)
- Loading and error states
- Interactive elements (modals, dropdowns)

### Screenshot Comparison
```typescript
await expect(page).toHaveScreenshot('admin-dashboard.png', {
  fullPage: true,
  animations: 'disabled'
});
```

## 6. Test Data Management

### Mock Data Strategy

```typescript
// __tests__/fixtures/users.ts
export const mockUsers = [
  {
    id: '1',
    userName: 'admin',
    name: 'Admin User',
    emailAddress: 'admin@example.com',
    isActive: true
  }
];
```

### Test Data Cleanup
- Each test creates its own data
- Automatic cleanup in `afterEach` hooks
- Database state reset between tests

## 7. CI/CD Integration

### GitHub Actions Workflow

The E2E testing workflow includes:
- **Multi-browser testing**: Chrome, Firefox, Safari
- **Mobile testing**: Mobile Chrome, Mobile Safari
- **Performance testing**: Dedicated performance job
- **Visual regression**: Screenshot comparison
- **Artifact upload**: Test reports, screenshots, videos

### Workflow Structure
```yaml
jobs:
  e2e-tests: # Browser compatibility
  e2e-performance: # Performance benchmarks
  e2e-visual-regression: # UI consistency
  e2e-mobile: # Mobile responsiveness
  test-summary: # Results aggregation
```

## 8. Testing Best Practices

### 1. Test Isolation
- Each test should be independent
- No shared state between tests
- Proper setup and teardown

### 2. Reliable Selectors
```typescript
// Good: Stable selectors
await page.click('[data-testid="add-user-button"]');

// Avoid: Fragile selectors
await page.click('button:has-text("Add User")');
```

### 3. Waiting Strategies
```typescript
// Wait for network idle
await page.waitForLoadState('networkidle');

// Wait for specific URL
await page.waitForURL('/admin/users');

// Wait for API response
await page.waitForResponse(response => 
  response.url().includes('/api/') && response.status() === 200
);
```

### 4. Error Handling
```typescript
test('handles API errors gracefully', async ({ page }) => {
  // Mock API error
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  await page.goto('/admin/users');
  await expect(page.locator('text=Error loading users')).toBeVisible();
});
```

### 5. Performance Testing
```typescript
test('measures page load performance', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/admin');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000);
});
```

## 9. Debugging and Troubleshooting

### Debugging Unit Tests
```bash
# Run specific test with debugging
pnpm test --testNamePattern="Button Component"
```

### Debugging E2E Tests
```bash
# Run in debug mode
pnpm test:e2e:debug

# Run with UI mode
pnpm test:e2e:ui

# Show test report
pnpm test:e2e:report
```

### Common Issues and Solutions

1. **Flaky Tests**
   - Add explicit waits
   - Use more reliable selectors
   - Increase timeouts if needed

2. **Performance Test Failures**
   - Check network conditions
   - Verify server performance
   - Adjust performance budgets

3. **Visual Regression Failures**
   - Review UI changes
   - Update baseline screenshots
   - Check for intentional changes

## 10. Test Coverage Goals

### Unit Tests: 80%+
- Component rendering
- User interactions
- State changes
- Error handling

### Integration Tests: 60%+
- API interactions
- Form workflows
- Authentication flows
- Data mutations

### E2E Tests: 40%+
- Critical user journeys
- Cross-browser compatibility
- Performance benchmarks
- Visual regression

## 11. Monitoring and Reporting

### Test Metrics
- Test execution time
- Pass/fail rates
- Coverage percentages
- Performance trends

### Reporting Tools
- Jest coverage reports
- Playwright HTML reports
- Performance dashboards
- Visual regression comparisons

## 12. Future Enhancements

### Planned Improvements
- **Accessibility Testing**: Automated a11y checks
- **Security Testing**: Vulnerability scanning
- **Load Testing**: High-traffic scenarios
- **Cross-Device Testing**: Real device testing
- **Visual Testing**: Advanced visual regression tools

### Continuous Improvement
- Regular test maintenance
- Performance optimization
- Test data management
- CI/CD pipeline optimization

This comprehensive testing strategy ensures high-quality, reliable, and maintainable code while providing confidence in application functionality across all environments. 