import { chromium, FullConfig } from '@playwright/test';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  
  // Start browser and create authentication state
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to login page
    await page.goto(`${baseURL}/auth/login`);
    
    // Wait for login form to be ready
    await page.waitForSelector('form', { timeout: 10000 });
    
    // Login with test credentials
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', '1q2w3E*');
    await page.click('button[type="submit"]');
    
    // Wait for successful login (redirect to admin dashboard)
    await page.waitForURL(`${baseURL}/admin`, { timeout: 15000 });
    
    // Save authentication state
    const authState = await page.context().storageState();
    writeFileSync(join(__dirname, 'auth-state.json'), JSON.stringify(authState));
    
    console.log('✅ Global setup completed - authentication state saved');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup; 