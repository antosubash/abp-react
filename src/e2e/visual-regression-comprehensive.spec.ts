import { test, expect } from '@playwright/test';
import { VisualRegressionHelpers } from './utils/visual-regression-helpers';
import { visualRegressionConfig } from './visual-regression.config';

test.describe('Comprehensive Visual Regression Tests', () => {
  let visualHelpers: VisualRegressionHelpers;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
    
    visualHelpers = new VisualRegressionHelpers(page);
  });

  // Dashboard Layout Tests
  test.describe('Dashboard Layout', () => {
    test('dashboard should match baseline across viewports', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      // Test different viewports
      for (const [name, viewport] of Object.entries(visualRegressionConfig.viewports)) {
        await page.setViewportSize(viewport);
        await visualHelpers.takeScreenshot(`dashboard-${name}`);
      }
    });

    test('dashboard should match baseline across themes', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeThemeScreenshots('dashboard');
    });

    test('dashboard components should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      // Test individual components
      for (const component of visualRegressionConfig.components.layout) {
        const selector = `[data-testid="${component}"]`;
        if (await page.locator(selector).count() > 0) {
          await visualHelpers.takeElementScreenshot(selector, component);
        }
      }
    });
  });

  // User Management Tests
  test.describe('User Management', () => {
    test('users page should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('users-page');
    });

    test('add user form should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.click('button:has-text("Add User")');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeFormStateScreenshots('add-user-form', 'form');
    });

    test('user table should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeTableScreenshots('users-table', 'table');
    });

    test('user modals should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      // Test edit modal
      await visualHelpers.takeModalScreenshots('edit-user-modal', '[data-testid="edit-user"]');

      // Test delete modal
      await visualHelpers.takeModalScreenshots('delete-user-modal', '[data-testid="delete-user"]');
    });
  });

  // CMS Tests
  test.describe('Content Management System', () => {
    test('CMS pages should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('cms-pages');
    });

    test('create page form should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.click('button:has-text("Create Page")');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeFormStateScreenshots('create-page-form', 'form');
    });

    test('rich text editor should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.click('button:has-text("Create Page")');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeElementScreenshot('[data-testid="content-editor"]', 'rich-text-editor');
    });

    test('menu management should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/menus');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('menu-management');
    });
  });

  // Settings Tests
  test.describe('Settings and Configuration', () => {
    test('settings page should match baseline', async ({ page }) => {
      await page.goto('/admin/settings');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('settings-page');
    });

    test('feature management should match baseline', async ({ page }) => {
      await page.goto('/admin/settings/feature-management');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('feature-management');
    });

    test('profile settings should match baseline', async ({ page }) => {
      await page.goto('/admin/profile');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('profile-settings');
    });
  });

  // Responsive Design Tests
  test.describe('Responsive Design', () => {
    test('mobile layout should match baseline', async ({ page }) => {
      await page.setViewportSize(visualRegressionConfig.viewports.mobile);
      
      // Test key pages on mobile
      const pages = ['/admin', '/admin/users', '/admin/settings'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        const pageName = pagePath.split('/').pop() || 'dashboard';
        await visualHelpers.takeScreenshot(`${pageName}-mobile`);
      }
    });

    test('tablet layout should match baseline', async ({ page }) => {
      await page.setViewportSize(visualRegressionConfig.viewports.tablet);
      
      // Test key pages on tablet
      const pages = ['/admin', '/admin/users', '/admin/settings'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        const pageName = pagePath.split('/').pop() || 'dashboard';
        await visualHelpers.takeScreenshot(`${pageName}-tablet`);
      }
    });

    test('mobile navigation should match baseline', async ({ page }) => {
      await page.setViewportSize(visualRegressionConfig.viewports.mobile);
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      // Open mobile menu
      await page.click('[data-testid="mobile-menu-toggle"]');
      await page.waitForTimeout(300);

      await visualHelpers.takeElementScreenshot('[data-testid="mobile-menu"]', 'mobile-navigation');
    });
  });

  // Interactive Elements Tests
  test.describe('Interactive Elements', () => {
    test('dropdown menus should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      // Test user dropdown
      await visualHelpers.takeDropdownScreenshots('user-dropdown', '[data-testid="user-dropdown"]');
    });

    test('tooltips should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      // Test help tooltips
      const tooltipElements = page.locator('[data-testid*="tooltip"]');
      const count = await tooltipElements.count();
      
      if (count > 0) {
        await tooltipElements.first().hover();
        await visualHelpers.takeElementScreenshot('[role="tooltip"]', 'help-tooltip');
      }
    });

    test('pagination should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      const pagination = page.locator('[data-testid="pagination"]');
      if (await pagination.count() > 0) {
        await visualHelpers.takeElementScreenshot('[data-testid="pagination"]', 'pagination');
      }
    });

    test('search functionality should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      // Test search input
      await visualHelpers.takeElementScreenshot('[data-testid="search-input"]', 'search-input');

      // Test search results
      await page.fill('[data-testid="search-input"]', 'admin');
      await page.keyboard.press('Enter');
      await page.waitForResponse(response => 
        response.url().includes('/api/') && response.status() === 200
      );

      await visualHelpers.takeScreenshot('search-results');
    });
  });

  // Loading and Error States Tests
  test.describe('Loading and Error States', () => {
    test('loading states should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      
      await visualHelpers.takeLoadingStateScreenshots('users-page');
    });

    test('error states should match baseline', async ({ page }) => {
      await visualHelpers.takeErrorStateScreenshots('error-states');
    });

    test('empty states should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('empty-state');
    });
  });

  // Accessibility Tests
  test.describe('Accessibility and Focus States', () => {
    test('focus states should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.click('button:has-text("Add User")');
      await page.waitForLoadState('networkidle');

      // Focus on form elements
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

    test('keyboard navigation should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      // Navigate with keyboard
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await visualHelpers.takeScreenshot('keyboard-navigation');
    });
  });

  // Theme Tests
  test.describe('Theme and Appearance', () => {
    test('dark mode should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      // Toggle to dark mode
      await page.click('[data-testid="theme-toggle"]');
      await page.waitForTimeout(500);

      await visualHelpers.takeScreenshot('dark-mode-dashboard');
    });

    test('high contrast mode should match baseline', async ({ page }) => {
      // Simulate high contrast mode
      await page.addInitScript(() => {
        document.documentElement.style.setProperty('--high-contrast', 'true');
      });

      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeScreenshot('high-contrast-dashboard');
    });
  });

  // Component-Specific Tests
  test.describe('Component-Specific Visual Tests', () => {
    test('button components should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      const buttons = page.locator('button');
      const buttonCount = await buttons.count();

      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const buttonText = await button.textContent() || `button-${i}`;
        
        await visualHelpers.takeInteractiveScreenshots(
          `button-${buttonText.replace(/\s+/g, '-').toLowerCase()}`,
          `button:nth-child(${i + 1})`
        );
      }
    });

    test('form inputs should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.click('button:has-text("Add User")');
      await page.waitForLoadState('networkidle');

      const inputs = page.locator('input');
      const inputCount = await inputs.count();

      for (let i = 0; i < Math.min(inputCount, 5); i++) {
        const input = inputs.nth(i);
        const inputName = await input.getAttribute('name') || `input-${i}`;
        
        await visualHelpers.takeInteractiveScreenshots(
          `input-${inputName}`,
          `input:nth-child(${i + 1})`
        );
      }
    });

    test('table components should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');

      await visualHelpers.takeTableScreenshots('users-table', 'table');
    });
  });

  // Cross-Browser Consistency Tests
  test.describe('Cross-Browser Consistency', () => {
    test('should maintain visual consistency across browsers', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');

      // Take screenshots with different settings to test consistency
      await visualHelpers.takeScreenshot('cross-browser-dashboard');
      
      // Test with different color schemes
      await page.emulateMedia({ colorScheme: 'dark' });
      await visualHelpers.takeScreenshot('cross-browser-dark');
      
      await page.emulateMedia({ colorScheme: 'light' });
      await visualHelpers.takeScreenshot('cross-browser-light');
    });
  });
}); 