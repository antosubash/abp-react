# End-to-End Testing with Playwright

This directory contains comprehensive end-to-end (E2E) tests for the ABP React application using Playwright.

## Overview

The E2E test suite covers critical user journeys and workflows including:
- Authentication flows (login, logout, session management)
- Admin dashboard functionality
- User management (CRUD operations)
- CMS functionality (pages, menus, comments)
- Performance testing
- Cross-browser compatibility

## Test Structure

```
e2e/
├── auth.spec.ts              # Authentication tests
├── admin-dashboard.spec.ts   # Admin dashboard functionality
├── cms.spec.ts              # CMS functionality tests
├── performance.spec.ts       # Performance benchmarks
├── global-setup.ts          # Global test setup
├── global-teardown.ts       # Global test cleanup
├── utils/
│   └── test-helpers.ts      # Reusable test utilities
└── README.md               # This file
```

## Prerequisites

1. **Install Playwright browsers:**
   ```bash
   pnpm test:e2e:install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Running Tests

### Basic Commands

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests with UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Run tests in debug mode
pnpm test:e2e:debug

# Show test report
pnpm test:e2e:report
```

### Running Specific Tests

```bash
# Run only authentication tests
pnpm test:e2e auth.spec.ts

# Run tests matching a pattern
pnpm test:e2e --grep "login"

# Run tests in specific browser
pnpm test:e2e --project=chromium

# Run tests in mobile viewport
pnpm test:e2e --project="Mobile Chrome"
```

### CI/CD Integration

```bash
# Run tests for CI (headless, with retries)
pnpm test:e2e --reporter=html,junit,json
```

## Test Configuration

The Playwright configuration (`playwright.config.ts`) includes:

- **Multiple browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Retry logic**: 2 retries on CI, 0 in development
- **Parallel execution**: Fully parallel test execution
- **Web server**: Automatic dev server startup
- **Global setup/teardown**: Authentication state management
- **Performance settings**: Timeouts, screenshots, video recording

## Test Categories

### 1. Authentication Tests (`auth.spec.ts`)

Tests login/logout flows, session management, and access control:

```typescript
test('should successfully login with valid credentials', async ({ page }) => {
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', '1q2w3E*');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin');
});
```

### 2. Admin Dashboard Tests (`admin-dashboard.spec.ts`)

Tests navigation, user management, and admin functionality:

```typescript
test('should add a new user successfully', async ({ page }) => {
  await page.click('text=Users');
  await page.click('button:has-text("Add User")');
  // Fill form and submit
});
```

### 3. CMS Tests (`cms.spec.ts`)

Tests content management functionality:

```typescript
test('should create a new page', async ({ page }) => {
  await page.click('text=CMS');
  await page.click('text=Pages');
  await page.click('button:has-text("Create Page")');
  // Fill page form and submit
});
```

### 4. Performance Tests (`performance.spec.ts`)

Measures page load times, API response times, and user interaction performance:

```typescript
test('should load admin dashboard within performance budget', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/admin');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);
});
```

## Test Utilities

The `TestHelpers` class provides reusable utilities:

```typescript
import { TestHelpers } from './utils/test-helpers';

test('example using helpers', async ({ page }) => {
  const helpers = new TestHelpers(page);
  
  // Login
  await helpers.login();
  
  // Create item
  await helpers.createItem('Add User', {
    userName: 'testuser',
    name: 'Test User',
    emailAddress: 'test@example.com'
  });
  
  // Verify success
  await helpers.expectSuccessMessage('User created successfully');
});
```

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Use `beforeEach` for common setup
- Clean up test data in `afterEach`

### 2. Reliable Selectors
- Use `data-testid` attributes for stable selectors
- Avoid text-based selectors when possible
- Use semantic selectors (buttons, forms, etc.)

### 3. Waiting Strategies
- Use `waitForLoadState('networkidle')` for page loads
- Use `waitForURL()` for navigation
- Use `waitForResponse()` for API calls

### 4. Performance Testing
- Set realistic performance budgets
- Measure both client and server performance
- Test on different devices and connections

### 5. Error Handling
- Use try-catch blocks for expected failures
- Provide meaningful error messages
- Log debugging information

## Debugging

### 1. Debug Mode
```bash
pnpm test:e2e:debug
```

### 2. UI Mode
```bash
pnpm test:e2e:ui
```

### 3. Screenshots and Videos
- Screenshots are automatically taken on failure
- Videos are recorded for failed tests
- Artifacts are saved in `test-results/`

### 4. Trace Viewer
```bash
# Open trace file
npx playwright show-trace trace.zip
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Run E2E Tests
  run: |
    pnpm test:e2e --reporter=html,junit,json
  env:
    CI: true
    BASE_URL: ${{ steps.deploy.outputs.url }}

- name: Upload Test Results
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: test-results/
```

### Performance Budgets

The performance tests enforce these budgets:
- Dashboard load: < 3 seconds
- Page navigation: < 1.5 seconds average
- API responses: < 500ms average
- Form submissions: < 2 seconds
- Search operations: < 1 second

## Troubleshooting

### Common Issues

1. **Tests failing on CI but passing locally**
   - Check for timing issues
   - Verify test data setup
   - Review CI environment differences

2. **Flaky tests**
   - Add explicit waits
   - Use more reliable selectors
   - Increase timeouts if needed

3. **Performance test failures**
   - Check network conditions
   - Verify server performance
   - Adjust performance budgets

### Getting Help

1. Check the test report: `pnpm test:e2e:report`
2. Review screenshots and videos in `test-results/`
3. Use debug mode for step-by-step debugging
4. Check Playwright documentation: https://playwright.dev/

## Contributing

When adding new E2E tests:

1. Follow the existing test structure
2. Use the `TestHelpers` class for common operations
3. Add appropriate performance budgets
4. Include both positive and negative test cases
5. Test across multiple browsers
6. Update this README if needed

## Test Data Management

- Tests use the default admin credentials
- Test data is created and cleaned up automatically
- Global setup handles authentication state
- Each test should be independent and idempotent
