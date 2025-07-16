import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  test('should display admin dashboard correctly', async ({ page }) => {
    // Check dashboard elements
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="user-dropdown"]')).toBeVisible();
  });

  test('should navigate to users page', async ({ page }) => {
    // Click on users navigation
    await page.click('text=Users');
    await page.waitForURL('/admin/users');
    
    // Verify users page content
    await expect(page.locator('text=Users')).toBeVisible();
    await expect(page.locator('button:has-text("Add User")')).toBeVisible();
  });

  test('should navigate to roles page', async ({ page }) => {
    // Click on roles navigation
    await page.click('text=Roles');
    await page.waitForURL('/admin/users/roles');
    
    // Verify roles page content
    await expect(page.locator('text=Roles')).toBeVisible();
    await expect(page.locator('button:has-text("Add Role")')).toBeVisible();
  });

  test('should navigate to tenants page', async ({ page }) => {
    // Click on tenants navigation
    await page.click('text=Tenants');
    await page.waitForURL('/admin/tenants');
    
    // Verify tenants page content
    await expect(page.locator('text=Tenants')).toBeVisible();
    await expect(page.locator('button:has-text("Add Tenant")')).toBeVisible();
  });

  test('should navigate to settings page', async ({ page }) => {
    // Click on settings navigation
    await page.click('text=Settings');
    await page.waitForURL('/admin/settings');
    
    // Verify settings page content
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('should add a new user successfully', async ({ page }) => {
    // Navigate to users page
    await page.click('text=Users');
    await page.waitForURL('/admin/users');
    
    // Click add user button
    await page.click('button:has-text("Add User")');
    
    // Fill user form
    await page.fill('input[name="userName"]', 'testuser');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="surname"]', 'Test');
    await page.fill('input[name="emailAddress"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=User created successfully')).toBeVisible();
  });

  test('should edit an existing user', async ({ page }) => {
    // Navigate to users page
    await page.click('text=Users');
    await page.waitForURL('/admin/users');
    
    // Click edit button for first user
    await page.locator('[data-testid="edit-user"]').first().click();
    
    // Update user information
    await page.fill('input[name="name"]', 'Updated Name');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=User updated successfully')).toBeVisible();
  });

  test('should delete a user', async ({ page }) => {
    // Navigate to users page
    await page.click('text=Users');
    await page.waitForURL('/admin/users');
    
    // Click delete button for first user
    await page.locator('[data-testid="delete-user"]').first().click();
    
    // Confirm deletion
    await page.click('button:has-text("Delete")');
    
    // Verify success message
    await expect(page.locator('text=User deleted successfully')).toBeVisible();
  });

  test('should manage user roles', async ({ page }) => {
    // Navigate to users page
    await page.click('text=Users');
    await page.waitForURL('/admin/users');
    
    // Click on roles for first user
    await page.locator('[data-testid="user-roles"]').first().click();
    
    // Toggle a role
    await page.locator('[data-testid="role-toggle"]').first().click();
    
    // Save changes
    await page.click('button:has-text("Save")');
    
    // Verify success message
    await expect(page.locator('text=Roles updated successfully')).toBeVisible();
  });

  test('should access profile settings', async ({ page }) => {
    // Click user dropdown
    await page.click('[data-testid="user-dropdown"]');
    await page.click('text=Profile');
    
    // Verify profile page
    await expect(page.locator('text=Profile Settings')).toBeVisible();
  });

  test('should change password', async ({ page }) => {
    // Navigate to profile
    await page.click('[data-testid="user-dropdown"]');
    await page.click('text=Profile');
    
    // Click change password
    await page.click('text=Change Password');
    
    // Fill password form
    await page.fill('input[name="currentPassword"]', '1q2w3E*');
    await page.fill('input[name="newPassword"]', 'NewPass123!');
    await page.fill('input[name="confirmPassword"]', 'NewPass123!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Password changed successfully')).toBeVisible();
  });
}); 