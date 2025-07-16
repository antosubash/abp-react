import { Page, expect } from '@playwright/test';

export interface VisualRegressionOptions {
  fullPage?: boolean;
  animations?: 'disabled' | 'allow';
  mask?: any[];
  threshold?: number;
  maxDiffPixels?: number;
  maxDiffPixelRatio?: number;
}

export class VisualRegressionHelpers {
  constructor(private page: Page) {}

  /**
   * Take a screenshot with consistent settings
   */
  async takeScreenshot(
    name: string,
    options: VisualRegressionOptions = {}
  ) {
    const defaultOptions: VisualRegressionOptions = {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.1,
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.1,
      ...options
    };

    await expect(this.page).toHaveScreenshot(`${name}.png`, defaultOptions);
  }

  /**
   * Take a screenshot of a specific element
   */
  async takeElementScreenshot(
    selector: string,
    name: string,
    options: VisualRegressionOptions = {}
  ) {
    const element = this.page.locator(selector);
    const defaultOptions: VisualRegressionOptions = {
      animations: 'disabled',
      threshold: 0.1,
      maxDiffPixels: 50,
      maxDiffPixelRatio: 0.05,
      ...options
    };

    await expect(element).toHaveScreenshot(`${name}.png`, defaultOptions);
  }

  /**
   * Take responsive screenshots for different viewports
   */
  async takeResponsiveScreenshots(
    name: string,
    viewports: Array<{ width: number; height: number; name: string }>
  ) {
    for (const viewport of viewports) {
      await this.page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      await this.takeScreenshot(`${name}-${viewport.name}`);
    }
  }

  /**
   * Take screenshots with different themes
   */
  async takeThemeScreenshots(name: string) {
    // Light theme (default)
    await this.takeScreenshot(`${name}-light`);

    // Dark theme
    await this.page.click('[data-testid="theme-toggle"]');
    await this.page.waitForTimeout(500);
    await this.takeScreenshot(`${name}-dark`);

    // High contrast mode
    await this.page.addInitScript(() => {
      document.documentElement.style.setProperty('--high-contrast', 'true');
    });
    await this.takeScreenshot(`${name}-high-contrast`);
  }

  /**
   * Take screenshots of interactive states
   */
  async takeInteractiveScreenshots(name: string, selector: string) {
    const element = this.page.locator(selector);

    // Default state
    await this.takeElementScreenshot(selector, `${name}-default`);

    // Hover state
    await element.hover();
    await this.takeElementScreenshot(selector, `${name}-hover`);

    // Focus state
    await element.focus();
    await this.takeElementScreenshot(selector, `${name}-focus`);

    // Active state (if applicable)
    await element.click();
    await this.takeElementScreenshot(selector, `${name}-active`);
  }

  /**
   * Take screenshots with dynamic content masked
   */
  async takeScreenshotWithMask(
    name: string,
    maskSelectors: string[],
    options: VisualRegressionOptions = {}
  ) {
    const maskElements = maskSelectors.map(selector => 
      this.page.locator(selector)
    );

    await this.takeScreenshot(name, {
      ...options,
      mask: maskElements
    });
  }

  /**
   * Compare screenshots with custom thresholds
   */
  async compareScreenshots(
    name: string,
    options: VisualRegressionOptions = {}
  ) {
    const comparisonOptions: VisualRegressionOptions = {
      threshold: 0.05,
      maxDiffPixels: 50,
      maxDiffPixelRatio: 0.02,
      ...options
    };

    await this.takeScreenshot(name, comparisonOptions);
  }

  /**
   * Take screenshots of loading states
   */
  async takeLoadingStateScreenshots(name: string) {
    // Initial loading state
    await this.takeScreenshot(`${name}-loading`);

    // Wait for content to load
    await this.page.waitForLoadState('networkidle');
    await this.takeScreenshot(`${name}-loaded`);
  }

  /**
   * Take screenshots of error states
   */
  async takeErrorStateScreenshots(name: string) {
    // Simulate network error
    await this.page.route('**/api/**', route => route.abort());
    
    await this.page.goto('/admin/users');
    await this.page.waitForLoadState('networkidle');
    
    await this.takeScreenshot(`${name}-network-error`);

    // Navigate to non-existent page
    await this.page.goto('/admin/non-existent-page');
    await this.page.waitForLoadState('networkidle');
    
    await this.takeScreenshot(`${name}-not-found`);
  }

  /**
   * Take screenshots of form states
   */
  async takeFormStateScreenshots(name: string, formSelector: string) {
    const form = this.page.locator(formSelector);

    // Empty form
    await this.takeElementScreenshot(formSelector, `${name}-empty`);

    // Filled form
    await this.fillFormWithTestData(formSelector);
    await this.takeElementScreenshot(formSelector, `${name}-filled`);

    // Form with validation errors
    await this.triggerValidationErrors(formSelector);
    await this.takeElementScreenshot(formSelector, `${name}-errors`);
  }

  /**
   * Fill form with test data for visual testing
   */
  private async fillFormWithTestData(formSelector: string) {
    const form = this.page.locator(formSelector);

    // Fill common form fields
    const testData = {
      'input[name="userName"]': 'testuser',
      'input[name="name"]': 'Test User',
      'input[name="emailAddress"]': 'test@example.com',
      'input[name="password"]': 'Test123!',
      'input[name="title"]': 'Test Page',
      'input[name="slug"]': 'test-page'
    };

    for (const [selector, value] of Object.entries(testData)) {
      const field = form.locator(selector);
      if (await field.count() > 0) {
        await field.fill(value);
      }
    }
  }

  /**
   * Trigger validation errors for visual testing
   */
  private async triggerValidationErrors(formSelector: string) {
    const form = this.page.locator(formSelector);

    // Clear required fields to trigger validation
    const requiredFields = [
      'input[name="userName"]',
      'input[name="name"]',
      'input[name="emailAddress"]'
    ];

    for (const selector of requiredFields) {
      const field = form.locator(selector);
      if (await field.count() > 0) {
        await field.clear();
      }
    }

    // Submit form to trigger validation
    await form.locator('button[type="submit"]').click();
  }

  /**
   * Take screenshots of modal dialogs
   */
  async takeModalScreenshots(name: string, triggerSelector: string) {
    // Open modal
    await this.page.click(triggerSelector);
    await this.page.waitForTimeout(300); // Wait for animation

    const modal = this.page.locator('[role="dialog"]');
    await expect(modal).toHaveScreenshot(`${name}-modal.png`, {
      animations: 'disabled'
    });

    // Close modal
    await this.page.keyboard.press('Escape');
  }

  /**
   * Take screenshots of dropdown menus
   */
  async takeDropdownScreenshots(name: string, triggerSelector: string) {
    // Open dropdown
    await this.page.click(triggerSelector);
    await this.page.waitForTimeout(300);

    const dropdown = this.page.locator('[data-testid="dropdown-menu"]');
    await expect(dropdown).toHaveScreenshot(`${name}-dropdown.png`, {
      animations: 'disabled'
    });

    // Close dropdown
    await this.page.keyboard.press('Escape');
  }

  /**
   * Take screenshots of table components
   */
  async takeTableScreenshots(name: string, tableSelector: string) {
    const table = this.page.locator(tableSelector);

    // Empty table
    await this.takeElementScreenshot(tableSelector, `${name}-empty`);

    // Table with data
    await this.page.waitForSelector(`${tableSelector} tbody tr`);
    await this.takeElementScreenshot(tableSelector, `${name}-with-data`);

    // Table with sorting
    await table.locator('th').first().click();
    await this.takeElementScreenshot(tableSelector, `${name}-sorted`);

    // Table with pagination
    const pagination = this.page.locator('[data-testid="pagination"]');
    if (await pagination.count() > 0) {
      await this.takeElementScreenshot('[data-testid="pagination"]', `${name}-pagination`);
    }
  }

  /**
   * Generate baseline screenshots for new components
   */
  async generateBaselineScreenshots(componentName: string) {
    console.log(`Generating baseline screenshots for ${componentName}...`);

    // Take screenshots in different states
    await this.takeScreenshot(`${componentName}-default`);
    await this.takeResponsiveScreenshots(componentName, [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ]);
    await this.takeThemeScreenshots(componentName);

    console.log(`Baseline screenshots generated for ${componentName}`);
  }
} 