import { test, expect } from '@playwright/test';

test.describe('Performance E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  test('should load admin dashboard within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate to admin dashboard
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance assertion - dashboard should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Verify page is fully loaded
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should load users page within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate to users page
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance assertion - users page should load within 2 seconds
    expect(loadTime).toBeLessThan(2000);
    
    // Verify page is fully loaded
    await expect(page.locator('text=Users')).toBeVisible();
  });

  test('should load CMS pages within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate to CMS pages
    await page.goto('/admin/cms/pages');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance assertion - CMS pages should load within 2.5 seconds
    expect(loadTime).toBeLessThan(2500);
    
    // Verify page is fully loaded
    await expect(page.locator('text=Pages')).toBeVisible();
  });

  test('should measure API response times', async ({ page }) => {
    // Listen for API requests
    const apiRequests: number[] = [];
    
    page.on('response', (response) => {
      if (response.url().includes('/api/')) {
        apiRequests.push(response.request().timing().responseEnd - response.request().timing().requestStart);
      }
    });
    
    // Navigate to users page to trigger API calls
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    // Calculate average API response time
    if (apiRequests.length > 0) {
      const avgResponseTime = apiRequests.reduce((a, b) => a + b, 0) / apiRequests.length;
      
      // Performance assertion - API responses should be under 500ms on average
      expect(avgResponseTime).toBeLessThan(500);
    }
  });

  test('should measure form submission performance', async ({ page }) => {
    // Navigate to add user page
    await page.goto('/admin/users');
    await page.click('button:has-text("Add User")');
    
    // Fill form
    await page.fill('input[name="userName"]', 'perftest');
    await page.fill('input[name="name"]', 'Performance Test');
    await page.fill('input[name="surname"]', 'User');
    await page.fill('input[name="emailAddress"]', 'perf@test.com');
    await page.fill('input[name="password"]', 'Test123!');
    
    const startTime = Date.now();
    
    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForResponse(response => response.url().includes('/api/') && response.status() === 200);
    
    const submissionTime = Date.now() - startTime;
    
    // Performance assertion - form submission should complete within 2 seconds
    expect(submissionTime).toBeLessThan(2000);
  });

  test('should measure search performance', async ({ page }) => {
    // Navigate to users page
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    const startTime = Date.now();
    
    // Perform search
    await page.fill('[data-testid="search-input"]', 'admin');
    await page.keyboard.press('Enter');
    await page.waitForResponse(response => response.url().includes('/api/') && response.status() === 200);
    
    const searchTime = Date.now() - startTime;
    
    // Performance assertion - search should complete within 1 second
    expect(searchTime).toBeLessThan(1000);
  });

  test('should measure navigation performance', async ({ page }) => {
    const navigationTimes: number[] = [];
    
    // Measure navigation to different pages
    const pages = ['/admin/users', '/admin/tenants', '/admin/settings', '/admin/cms/pages'];
    
    for (const pageUrl of pages) {
      const startTime = Date.now();
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');
      navigationTimes.push(Date.now() - startTime);
    }
    
    // Calculate average navigation time
    const avgNavigationTime = navigationTimes.reduce((a, b) => a + b, 0) / navigationTimes.length;
    
    // Performance assertion - average navigation should be under 1.5 seconds
    expect(avgNavigationTime).toBeLessThan(1500);
  });

  test('should measure memory usage', async ({ page }) => {
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => performance.memory?.usedJSHeapSize || 0);
    
    // Perform memory-intensive operations
    for (let i = 0; i < 10; i++) {
      await page.goto('/admin/users');
      await page.waitForLoadState('networkidle');
    }
    
    // Get final memory usage
    const finalMemory = await page.evaluate(() => performance.memory?.usedJSHeapSize || 0);
    const memoryIncrease = finalMemory - initialMemory;
    
    // Performance assertion - memory increase should be reasonable (under 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });

  test('should measure scroll performance', async ({ page }) => {
    // Navigate to users page with many items
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    
    const startTime = Date.now();
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const scrollTime = Date.now() - startTime;
    
    // Performance assertion - scroll should be smooth (under 100ms)
    expect(scrollTime).toBeLessThan(100);
  });

  test('should measure table rendering performance', async ({ page }) => {
    // Navigate to users page
    await page.goto('/admin/users');
    
    const startTime = Date.now();
    
    // Wait for table to be rendered
    await page.waitForSelector('table');
    await page.waitForSelector('table tbody tr');
    
    const renderTime = Date.now() - startTime;
    
    // Performance assertion - table should render within 1 second
    expect(renderTime).toBeLessThan(1000);
    
    // Count rendered rows
    const rowCount = await page.locator('table tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });
}); 