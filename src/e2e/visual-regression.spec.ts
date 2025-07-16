import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  test('admin dashboard should match baseline', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the entire dashboard
    await expect(page).toHaveScreenshot('admin-dashboard.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('users page should match baseline', async ({ page }) => {
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the users page
    await expect(page).toHaveScreenshot('users-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('add user form should match baseline', async ({ page }) => {
    await page.goto('/admin/users');
    await page.click('button:has-text("Add User")');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the add user form
    await expect(page).toHaveScreenshot('add-user-form.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('CMS pages should match baseline', async ({ page }) => {
    await page.goto('/admin/cms/pages');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the CMS pages
    await expect(page).toHaveScreenshot('cms-pages.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('settings page should match baseline', async ({ page }) => {
    await page.goto('/admin/settings');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the settings page
    await expect(page).toHaveScreenshot('settings-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('login page should match baseline', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the login page
    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('navigation menu should match baseline', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of just the navigation area
    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('navigation-menu.png', {
      animations: 'disabled'
    });
  });

  test('user dropdown should match baseline', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Click user dropdown to open it
    await page.click('[data-testid="user-dropdown"]');
    
    // Take screenshot of the dropdown menu
    const dropdown = page.locator('[data-testid="user-dropdown-menu"]');
    await expect(dropdown).toHaveScreenshot('user-dropdown.png', {
      animations: 'disabled'
    });
  });

  test('table component should match baseline', async ({ page }) => {
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of just the table
    const table = page.locator('table');
    await expect(table).toHaveScreenshot('users-table.png', {
      animations: 'disabled'
    });
  });

  test('form components should match baseline', async ({ page }) => {
    await page.goto('/admin/users');
    await page.click('button:has-text("Add User")');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of form elements
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('user-form.png', {
      animations: 'disabled'
    });
  });

  test('modal dialogs should match baseline', async ({ page }) => {
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    // Click delete button to open confirmation modal
    await page.click('[data-testid="delete-user"]').first();
    
    // Take screenshot of the confirmation modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toHaveScreenshot('delete-confirmation-modal.png', {
      animations: 'disabled'
    });
  });

  test('mobile viewport should match baseline', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of mobile dashboard
    await expect(page).toHaveScreenshot('admin-dashboard-mobile.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('tablet viewport should match baseline', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of tablet dashboard
    await expect(page).toHaveScreenshot('admin-dashboard-tablet.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('dark mode should match baseline', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Toggle dark mode
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500); // Wait for theme transition
    
    // Take screenshot in dark mode
    await expect(page).toHaveScreenshot('admin-dashboard-dark.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('loading states should match baseline', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Take screenshot during loading state
    await expect(page).toHaveScreenshot('users-page-loading.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('error states should match baseline', async ({ page }) => {
    // Navigate to a non-existent page to trigger error state
    await page.goto('/admin/non-existent-page');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of error page
    await expect(page).toHaveScreenshot('error-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('empty states should match baseline', async ({ page }) => {
    // Navigate to a page with no data
    await page.goto('/admin/cms/pages');
    await page.waitForLoadState('networkidle');
    
    // Clear any existing data (if possible)
    // This would depend on your application's ability to show empty states
    
    // Take screenshot of empty state
    await expect(page).toHaveScreenshot('empty-state.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
}); 