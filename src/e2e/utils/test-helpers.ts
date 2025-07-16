import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Login with default admin credentials
   */
  async login(username = 'admin', password = '1q2w3E*') {
    await this.page.goto('/auth/login');
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
    await this.page.waitForURL('/admin');
  }

  /**
   * Navigate to a specific admin page
   */
  async navigateToAdminPage(pagePath: string) {
    await this.page.goto(`/admin${pagePath}`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for and verify success message
   */
  async expectSuccessMessage(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }

  /**
   * Wait for and verify error message
   */
  async expectErrorMessage(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }

  /**
   * Fill a form with provided data
   */
  async fillForm(formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      await this.page.fill(`input[name="${field}"]`, value);
    }
  }

  /**
   * Submit a form and wait for response
   */
  async submitForm() {
    await this.page.click('button[type="submit"]');
    await this.page.waitForResponse(response => 
      response.url().includes('/api/') && response.status() === 200
    );
  }

  /**
   * Click a button and wait for navigation
   */
  async clickAndWaitForNavigation(selector: string, expectedUrl?: string) {
    await this.page.click(selector);
    if (expectedUrl) {
      await this.page.waitForURL(expectedUrl);
    }
  }

  /**
   * Measure performance of an action
   */
  async measurePerformance(action: () => Promise<void>): Promise<number> {
    const startTime = Date.now();
    await action();
    return Date.now() - startTime;
  }

  /**
   * Wait for table to load and return row count
   */
  async waitForTableLoad(): Promise<number> {
    await this.page.waitForSelector('table');
    await this.page.waitForSelector('table tbody tr');
    return await this.page.locator('table tbody tr').count();
  }

  /**
   * Search for content and wait for results
   */
  async searchContent(searchTerm: string) {
    await this.page.fill('[data-testid="search-input"]', searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForResponse(response => 
      response.url().includes('/api/') && response.status() === 200
    );
  }

  /**
   * Delete an item and confirm deletion
   */
  async deleteItem(deleteSelector: string) {
    await this.page.click(deleteSelector);
    await this.page.click('button:has-text("Delete")');
  }

  /**
   * Edit an item and update with new data
   */
  async editItem(editSelector: string, updates: Record<string, string>) {
    await this.page.click(editSelector);
    await this.fillForm(updates);
    await this.submitForm();
  }

  /**
   * Create a new item with provided data
   */
  async createItem(createButtonText: string, formData: Record<string, string>) {
    await this.page.click(`button:has-text("${createButtonText}")`);
    await this.fillForm(formData);
    await this.submitForm();
  }

  /**
   * Verify page elements are visible
   */
  async expectPageElements(elements: string[]) {
    for (const element of elements) {
      await expect(this.page.locator(element)).toBeVisible();
    }
  }

  /**
   * Get API response times for performance testing
   */
  async getApiResponseTimes(): Promise<number[]> {
    const responseTimes: number[] = [];
    
    this.page.on('response', (response) => {
      if (response.url().includes('/api/')) {
        const timing = response.request().timing();
        if (timing.responseEnd && timing.requestStart) {
          responseTimes.push(timing.responseEnd - timing.requestStart);
        }
      }
    });
    
    return responseTimes;
  }
} 