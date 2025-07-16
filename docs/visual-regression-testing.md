# Visual Regression Testing Guide

This guide covers the comprehensive visual regression testing setup for the ABP React application using Playwright.

## Overview

Visual regression testing ensures that UI changes don't introduce unintended visual regressions by comparing screenshots against baseline images. Our setup includes:

- **Comprehensive Coverage**: All major pages, components, and states
- **Responsive Testing**: Mobile, tablet, and desktop viewports
- **Theme Testing**: Light, dark, and high contrast modes
- **Interactive States**: Hover, focus, active, and disabled states
- **Error States**: Loading, error, and empty states
- **Accessibility**: Focus states and keyboard navigation

## Architecture

### Test Structure

```
e2e/
├── visual-regression.spec.ts              # Basic visual regression tests
├── visual-regression-enhanced.spec.ts     # Enhanced visual regression tests
├── visual-regression-comprehensive.spec.ts # Comprehensive visual regression tests
├── visual-regression.config.ts            # Configuration and thresholds
├── utils/
│   └── visual-regression-helpers.ts      # Helper utilities
└── README.md                             # E2E testing documentation
```

### Configuration

The `visual-regression.config.ts` file contains:

- **Thresholds**: Screenshot comparison settings
- **Viewports**: Responsive design breakpoints
- **Themes**: Color scheme configurations
- **Components**: Testable UI components
- **States**: Interactive and content states
- **Masks**: Dynamic content masking

## Running Visual Regression Tests

### Basic Commands

```bash
# Run all visual regression tests
pnpm test:visual

# Update baseline screenshots
pnpm test:visual:baseline

# Run with HTML report
pnpm test:visual:compare

# Test mobile viewport
pnpm test:visual:mobile

# Test tablet viewport
pnpm test:visual:tablet
```

### Advanced Commands

```bash
# Run specific test file
pnpm test:e2e visual-regression-comprehensive.spec.ts

# Run with specific browser
pnpm test:e2e visual-regression-comprehensive.spec.ts --project=chromium

# Run with debug mode
pnpm test:e2e visual-regression-comprehensive.spec.ts --debug

# Run with UI mode
pnpm test:e2e visual-regression-comprehensive.spec.ts --ui
```

## Test Categories

### 1. Dashboard Layout Tests

Tests the main dashboard layout across different viewports and themes:

```typescript
test('dashboard should match baseline across viewports', async ({ page }) => {
  await page.goto('/admin');
  await page.waitForLoadState('networkidle');

  // Test different viewports
  for (const [name, viewport] of Object.entries(visualRegressionConfig.viewports)) {
    await page.setViewportSize(viewport);
    await visualHelpers.takeScreenshot(`dashboard-${name}`);
  }
});
```

### 2. User Management Tests

Tests user management pages and forms:

```typescript
test('add user form should match baseline', async ({ page }) => {
  await page.goto('/admin/users');
  await page.click('button:has-text("Add User")');
  await page.waitForLoadState('networkidle');

  await visualHelpers.takeFormStateScreenshots('add-user-form', 'form');
});
```

### 3. CMS Tests

Tests content management functionality:

```typescript
test('rich text editor should match baseline', async ({ page }) => {
  await page.goto('/admin/cms/pages');
  await page.click('button:has-text("Create Page")');
  await page.waitForLoadState('networkidle');

  await visualHelpers.takeElementScreenshot('[data-testid="content-editor"]', 'rich-text-editor');
});
```

### 4. Responsive Design Tests

Tests responsive behavior across devices:

```typescript
test('mobile layout should match baseline', async ({ page }) => {
  await page.setViewportSize(visualRegressionConfig.viewports.mobile);
  
  const pages = ['/admin', '/admin/users', '/admin/settings'];
  
  for (const pagePath of pages) {
    await page.goto(pagePath);
    await page.waitForLoadState('networkidle');
    
    const pageName = pagePath.split('/').pop() || 'dashboard';
    await visualHelpers.takeScreenshot(`${pageName}-mobile`);
  }
});
```

### 5. Interactive Elements Tests

Tests interactive components and states:

```typescript
test('dropdown menus should match baseline', async ({ page }) => {
  await page.goto('/admin');
  await page.waitForLoadState('networkidle');

  await visualHelpers.takeDropdownScreenshots('user-dropdown', '[data-testid="user-dropdown"]');
});
```

### 6. Loading and Error States Tests

Tests various application states:

```typescript
test('loading states should match baseline', async ({ page }) => {
  await page.goto('/admin/users');
  
  await visualHelpers.takeLoadingStateScreenshots('users-page');
});
```

### 7. Accessibility Tests

Tests accessibility features:

```typescript
test('focus states should match baseline', async ({ page }) => {
  await page.goto('/admin/users');
  await page.click('button:has-text("Add User")');
  await page.waitForLoadState('networkidle');

  const formElements = [
    'input[name="userName"]',
    'input[name="name"]',
    'input[name="emailAddress"]',
    'input[name="password"]'
  ];

  for (const selector of formElements) {
    await page.focus(selector);
    await visualHelpers.takeScreenshot(`focused-${selector.replace(/[^a-zA-Z]/g, '')}`);
  }
});
```

## Helper Utilities

### VisualRegressionHelpers Class

The `VisualRegressionHelpers` class provides reusable methods:

#### Basic Screenshots

```typescript
// Take full page screenshot
await visualHelpers.takeScreenshot('dashboard');

// Take element screenshot
await visualHelpers.takeElementScreenshot('button', 'submit-button');
```

#### Responsive Screenshots

```typescript
// Take screenshots across viewports
await visualHelpers.takeResponsiveScreenshots('dashboard', [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1920, height: 1080, name: 'desktop' }
]);
```

#### Theme Screenshots

```typescript
// Take screenshots with different themes
await visualHelpers.takeThemeScreenshots('dashboard');
```

#### Interactive States

```typescript
// Take screenshots of interactive states
await visualHelpers.takeInteractiveScreenshots('button', 'button[type="submit"]');
```

#### Form States

```typescript
// Take screenshots of form states
await visualHelpers.takeFormStateScreenshots('add-user-form', 'form');
```

#### Modal Dialogs

```typescript
// Take screenshots of modal dialogs
await visualHelpers.takeModalScreenshots('delete-modal', '[data-testid="delete-button"]');
```

## Configuration

### Thresholds

```typescript
thresholds: {
  similarity: 0.95,           // Overall image similarity (0-1)
  maxDiffPixels: 100,         // Maximum different pixels
  maxDiffPixelRatio: 0.1,     // Maximum pixel difference ratio
  colorThreshold: 0.1         // Color difference threshold
}
```

### Viewports

```typescript
viewports: {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
  largeDesktop: { width: 2560, height: 1440 }
}
```

### Components

```typescript
components: {
  layout: ['dashboard', 'sidebar', 'header', 'footer', 'breadcrumb'],
  forms: ['login-form', 'add-user-form', 'edit-user-form'],
  dataDisplay: ['users-table', 'roles-table', 'tenants-table'],
  interactive: ['dropdown-menu', 'modal-dialog', 'tooltip', 'pagination']
}
```

## Best Practices

### 1. Screenshot Naming

Use descriptive, consistent names:

```typescript
// Good naming
await visualHelpers.takeScreenshot('dashboard-mobile-dark');
await visualHelpers.takeScreenshot('add-user-form-filled');
await visualHelpers.takeScreenshot('users-table-sorted');

// Avoid generic names
await visualHelpers.takeScreenshot('test1');
await visualHelpers.takeScreenshot('screenshot');
```

### 2. Dynamic Content Masking

Mask dynamic content to avoid false positives:

```typescript
await visualHelpers.takeScreenshotWithMask('dashboard', [
  '[data-testid="timestamp"]',
  '[data-testid="user-id"]',
  '[data-testid="user-email"]'
]);
```

### 3. Waiting Strategies

Ensure content is fully loaded before taking screenshots:

```typescript
// Wait for network idle
await page.waitForLoadState('networkidle');

// Wait for specific element
await page.waitForSelector('[data-testid="content"]');

// Wait for animations
await page.waitForTimeout(500);
```

### 4. Theme Testing

Test across different themes:

```typescript
// Test light theme (default)
await visualHelpers.takeScreenshot('dashboard-light');

// Test dark theme
await page.click('[data-testid="theme-toggle"]');
await page.waitForTimeout(500);
await visualHelpers.takeScreenshot('dashboard-dark');
```

### 5. Responsive Testing

Test across different viewports:

```typescript
// Test mobile
await page.setViewportSize({ width: 375, height: 667 });
await visualHelpers.takeScreenshot('dashboard-mobile');

// Test tablet
await page.setViewportSize({ width: 768, height: 1024 });
await visualHelpers.takeScreenshot('dashboard-tablet');
```

## Baseline Management

### Updating Baselines

```bash
# Update all baseline screenshots
pnpm test:visual:baseline

# Update specific test
pnpm test:e2e visual-regression-comprehensive.spec.ts --update-snapshots
```

### Baseline Directory Structure

```
test-results/
├── baseline/           # Baseline screenshots
├── current/            # Current test screenshots
└── diff/              # Difference screenshots
```

## CI/CD Integration

### GitHub Actions

Visual regression tests are integrated into the CI/CD pipeline:

```yaml
e2e-visual-regression:
  runs-on: ubuntu-latest
  needs: e2e-tests
  
  steps:
  - name: Run visual regression tests
    run: pnpm test:visual --reporter=html,junit,json
    
  - name: Upload visual regression results
    uses: actions/upload-artifact@v4
    with:
      name: visual-regression-results
      path: test-results/
```

### Artifact Management

- **Baseline Screenshots**: Stored in version control
- **Current Screenshots**: Generated during test runs
- **Diff Screenshots**: Highlight differences
- **HTML Reports**: Interactive test reports

## Troubleshooting

### Common Issues

1. **Flaky Screenshots**
   - Add explicit waits
   - Mask dynamic content
   - Increase timeouts

2. **False Positives**
   - Review masking configuration
   - Adjust thresholds
   - Check for intentional changes

3. **Performance Issues**
   - Reduce screenshot frequency
   - Use element screenshots instead of full page
   - Optimize test data

### Debugging

```bash
# Run with debug mode
pnpm test:visual --debug

# Run with UI mode
pnpm test:visual --ui

# Show test report
pnpm test:e2e:report
```

## Reporting

### HTML Reports

Generate interactive HTML reports:

```bash
pnpm test:visual:compare
```

### Artifact Upload

Upload test artifacts to CI/CD:

```yaml
- name: Upload screenshots
  uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: visual-regression-screenshots
    path: test-results/
```

## Future Enhancements

### Planned Improvements

1. **Automated Baseline Updates**: Smart baseline management
2. **Visual Diff Tools**: Enhanced difference visualization
3. **Performance Optimization**: Faster screenshot comparison
4. **Accessibility Integration**: Automated a11y checks
5. **Cross-Browser Testing**: Multi-browser visual testing

### Continuous Improvement

- Regular baseline maintenance
- Performance optimization
- Enhanced reporting
- Integration with design systems

This comprehensive visual regression testing setup ensures UI consistency and prevents visual regressions across all application changes. 