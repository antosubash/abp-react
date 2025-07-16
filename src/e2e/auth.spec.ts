import { test, expect } from '@playwright/test';

test.describe('Authentication E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/auth/login');
  });

  test('should display login form correctly', async ({ page }) => {
    // Check if login form elements are present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages
    await expect(page.locator('text=Username is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill form with invalid credentials
    await page.fill('input[name="username"]', 'invalid-user');
    await page.fill('input[name="password"]', 'wrong-password');
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Fill form with valid credentials
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 15000 });
    
    // Verify we're on the admin dashboard
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should maintain session after page refresh', async ({ page }) => {
    // Login first
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
    
    // Refresh the page
    await page.reload();
    
    // Should still be logged in
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
    
    // Click logout button
    await page.click('[data-testid="user-dropdown"]');
    await page.click('text=Logout');
    
    // Should redirect to login page
    await page.waitForURL('/auth/login');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    // Try to access admin dashboard without login
    await page.goto('/admin');
    
    // Should redirect to login page
    await page.waitForURL('/auth/login');
    await expect(page.locator('form')).toBeVisible();
  });
}); 