import { test, expect } from '@playwright/test';

test.describe('Enhanced Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  // Dashboard and Layout Tests
  test.describe('Dashboard and Layout', () => {
    test('admin dashboard layout should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('dashboard-layout.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [
          page.locator('[data-testid="timestamp"]'),
          page.locator('[data-testid="user-id"]')
        ]
      });
    });

    test('sidebar navigation should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      const sidebar = page.locator('[data-testid="sidebar"]');
      await expect(sidebar).toHaveScreenshot('sidebar-navigation.png', {
        animations: 'disabled'
      });
    });

    test('header component should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      const header = page.locator('[data-testid="header"]');
      await expect(header).toHaveScreenshot('header-component.png', {
        animations: 'disabled'
      });
    });

    test('breadcrumb navigation should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      const breadcrumb = page.locator('[data-testid="breadcrumb"]');
      await expect(breadcrumb).toHaveScreenshot('breadcrumb-navigation.png', {
        animations: 'disabled'
      });
    });
  });

  // User Management Tests
  test.describe('User Management', () => {
    test('users list page should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('users-list-page.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [
          page.locator('[data-testid="user-email"]'),
          page.locator('[data-testid="user-id"]')
        ]
      });
    });

    test('add user form should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.click('button:has-text("Add User")');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('add-user-form.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('edit user form should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      await page.click('[data-testid="edit-user"]').first();
      
      await expect(page).toHaveScreenshot('edit-user-form.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('user details modal should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      await page.click('[data-testid="view-user"]').first();
      
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toHaveScreenshot('user-details-modal.png', {
        animations: 'disabled'
      });
    });

    test('delete confirmation modal should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      await page.click('[data-testid="delete-user"]').first();
      
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toHaveScreenshot('delete-confirmation-modal.png', {
        animations: 'disabled'
      });
    });
  });

  // CMS Tests
  test.describe('Content Management System', () => {
    test('CMS pages list should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('cms-pages-list.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('create page form should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.click('button:has-text("Create Page")');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('create-page-form.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('rich text editor should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.click('button:has-text("Create Page")');
      await page.waitForLoadState('networkidle');
      
      const editor = page.locator('[data-testid="content-editor"]');
      await expect(editor).toHaveScreenshot('rich-text-editor.png', {
        animations: 'disabled'
      });
    });

    test('menu management should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/menus');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('menu-management.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('comments management should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/comments');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('comments-management.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  // Settings and Configuration Tests
  test.describe('Settings and Configuration', () => {
    test('settings page should match baseline', async ({ page }) => {
      await page.goto('/admin/settings');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('settings-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('feature management should match baseline', async ({ page }) => {
      await page.goto('/admin/settings/feature-management');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('feature-management.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('profile settings should match baseline', async ({ page }) => {
      await page.goto('/admin/profile');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('profile-settings.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('change password form should match baseline', async ({ page }) => {
      await page.goto('/admin/profile/change-password');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('change-password-form.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  // Responsive Design Tests
  test.describe('Responsive Design', () => {
    test('mobile dashboard should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('mobile-dashboard.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('tablet dashboard should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('tablet-dashboard.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('mobile navigation menu should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      await page.click('[data-testid="mobile-menu-toggle"]');
      
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toHaveScreenshot('mobile-navigation-menu.png', {
        animations: 'disabled'
      });
    });

    test('mobile user form should match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/admin/users');
      await page.click('button:has-text("Add User")');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('mobile-add-user-form.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  // Theme and Appearance Tests
  test.describe('Theme and Appearance', () => {
    test('dark mode dashboard should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Toggle to dark mode
      await page.click('[data-testid="theme-toggle"]');
      await page.waitForTimeout(500); // Wait for theme transition
      
      await expect(page).toHaveScreenshot('dark-mode-dashboard.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('dark mode users page should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      // Toggle to dark mode
      await page.click('[data-testid="theme-toggle"]');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('dark-mode-users-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('high contrast mode should match baseline', async ({ page }) => {
      // Simulate high contrast mode
      await page.addInitScript(() => {
        document.documentElement.style.setProperty('--high-contrast', 'true');
      });
      
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('high-contrast-dashboard.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  // Loading and Error States
  test.describe('Loading and Error States', () => {
    test('loading state should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      
      // Take screenshot during loading
      await expect(page).toHaveScreenshot('loading-state.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('error state should match baseline', async ({ page }) => {
      // Navigate to non-existent page
      await page.goto('/admin/non-existent-page');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('error-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('empty state should match baseline', async ({ page }) => {
      await page.goto('/admin/cms/pages');
      await page.waitForLoadState('networkidle');
      
      // Clear any existing data if possible
      await expect(page).toHaveScreenshot('empty-state.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('network error state should match baseline', async ({ page }) => {
      // Simulate network error
      await page.route('**/api/**', route => route.abort());
      
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('network-error-state.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  // Interactive Elements
  test.describe('Interactive Elements', () => {
    test('dropdown menu should match baseline', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      await page.click('[data-testid="user-dropdown"]');
      
      const dropdown = page.locator('[data-testid="user-dropdown-menu"]');
      await expect(dropdown).toHaveScreenshot('user-dropdown-menu.png', {
        animations: 'disabled'
      });
    });

    test('tooltip should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      await page.hover('[data-testid="help-tooltip"]');
      
      const tooltip = page.locator('[role="tooltip"]');
      await expect(tooltip).toHaveScreenshot('help-tooltip.png', {
        animations: 'disabled'
      });
    });

    test('search results should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      await page.fill('[data-testid="search-input"]', 'admin');
      await page.keyboard.press('Enter');
      await page.waitForResponse(response => 
        response.url().includes('/api/') && response.status() === 200
      );
      
      await expect(page).toHaveScreenshot('search-results.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('pagination should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      const pagination = page.locator('[data-testid="pagination"]');
      await expect(pagination).toHaveScreenshot('pagination-controls.png', {
        animations: 'disabled'
      });
    });
  });

  // Accessibility and Focus States
  test.describe('Accessibility and Focus States', () => {
    test('focused form elements should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.click('button:has-text("Add User")');
      await page.waitForLoadState('networkidle');
      
      // Focus on username field
      await page.focus('input[name="userName"]');
      
      await expect(page).toHaveScreenshot('focused-form-elements.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('keyboard navigation should match baseline', async ({ page }) => {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
      
      // Navigate with keyboard
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      await expect(page).toHaveScreenshot('keyboard-navigation.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });
}); 