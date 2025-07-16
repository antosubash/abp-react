import { test, expect } from '@playwright/test';

test.describe('CMS E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  test('should navigate to CMS pages', async ({ page }) => {
    // Navigate to CMS
    await page.click('text=CMS');
    await page.waitForURL('/admin/cms');
    
    // Verify CMS navigation
    await expect(page.locator('text=Pages')).toBeVisible();
    await expect(page.locator('text=Menus')).toBeVisible();
    await expect(page.locator('text=Comments')).toBeVisible();
  });

  test('should create a new page', async ({ page }) => {
    // Navigate to CMS pages
    await page.click('text=CMS');
    await page.click('text=Pages');
    await page.waitForURL('/admin/cms/pages');
    
    // Click create page button
    await page.click('button:has-text("Create Page")');
    
    // Fill page form
    await page.fill('input[name="title"]', 'Test Page');
    await page.fill('input[name="slug"]', 'test-page');
    await page.fill('[data-testid="content-editor"]', 'This is test content');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Page created successfully')).toBeVisible();
  });

  test('should edit an existing page', async ({ page }) => {
    // Navigate to CMS pages
    await page.click('text=CMS');
    await page.click('text=Pages');
    await page.waitForURL('/admin/cms/pages');
    
    // Click edit button for first page
    await page.click('[data-testid="edit-page"]').first();
    
    // Update page content
    await page.fill('input[name="title"]', 'Updated Page Title');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Page updated successfully')).toBeVisible();
  });

  test('should delete a page', async ({ page }) => {
    // Navigate to CMS pages
    await page.click('text=CMS');
    await page.click('text=Pages');
    await page.waitForURL('/admin/cms/pages');
    
    // Click delete button for first page
    await page.click('[data-testid="delete-page"]').first();
    
    // Confirm deletion
    await page.click('button:has-text("Delete")');
    
    // Verify success message
    await expect(page.locator('text=Page deleted successfully')).toBeVisible();
  });

  test('should view a page', async ({ page }) => {
    // Navigate to CMS pages
    await page.click('text=CMS');
    await page.click('text=Pages');
    await page.waitForURL('/admin/cms/pages');
    
    // Click view button for first page
    await page.click('[data-testid="view-page"]').first();
    
    // Verify page content is displayed
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="page-content"]')).toBeVisible();
  });

  test('should create a new menu', async ({ page }) => {
    // Navigate to CMS menus
    await page.click('text=CMS');
    await page.click('text=Menus');
    await page.waitForURL('/admin/cms/menus');
    
    // Click create menu button
    await page.click('button:has-text("Create Menu")');
    
    // Fill menu form
    await page.fill('input[name="name"]', 'Test Menu');
    await page.fill('input[name="displayName"]', 'Test Menu Display');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Menu created successfully')).toBeVisible();
  });

  test('should edit a menu', async ({ page }) => {
    // Navigate to CMS menus
    await page.click('text=CMS');
    await page.click('text=Menus');
    await page.waitForURL('/admin/cms/menus');
    
    // Click edit button for first menu
    await page.click('[data-testid="edit-menu"]').first();
    
    // Update menu information
    await page.fill('input[name="displayName"]', 'Updated Menu Display');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Menu updated successfully')).toBeVisible();
  });

  test('should manage menu items', async ({ page }) => {
    // Navigate to CMS menus
    await page.click('text=CMS');
    await page.click('text=Menus');
    await page.waitForURL('/admin/cms/menus');
    
    // Click edit button for first menu
    await page.click('[data-testid="edit-menu"]').first();
    
    // Add menu item
    await page.click('button:has-text("Add Menu Item")');
    await page.fill('input[name="displayName"]', 'New Menu Item');
    await page.fill('input[name="url"]', '/new-page');
    await page.click('button[type="submit"]');
    
    // Verify menu item was added
    await expect(page.locator('text=New Menu Item')).toBeVisible();
  });

  test('should manage comments', async ({ page }) => {
    // Navigate to CMS comments
    await page.click('text=CMS');
    await page.click('text=Comments');
    await page.waitForURL('/admin/cms/comments');
    
    // Verify comments page
    await expect(page.locator('text=Comments')).toBeVisible();
    
    // Approve a comment
    await page.click('[data-testid="approve-comment"]').first();
    await expect(page.locator('text=Comment approved successfully')).toBeVisible();
  });

  test('should search and filter pages', async ({ page }) => {
    // Navigate to CMS pages
    await page.click('text=CMS');
    await page.click('text=Pages');
    await page.waitForURL('/admin/cms/pages');
    
    // Use search functionality
    await page.fill('[data-testid="search-input"]', 'test');
    await page.click('button:has-text("Search")');
    
    // Verify search results
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
  });

  test('should use rich text editor', async ({ page }) => {
    // Navigate to CMS pages
    await page.click('text=CMS');
    await page.click('text=Pages');
    await page.waitForURL('/admin/cms/pages');
    
    // Click create page button
    await page.click('button:has-text("Create Page")');
    
    // Test rich text editor
    await page.click('[data-testid="content-editor"]');
    await page.keyboard.type('Bold text');
    await page.click('[data-testid="bold-button"]');
    
    // Verify formatting was applied
    await expect(page.locator('[data-testid="content-editor"] strong')).toBeVisible();
  });
}); 