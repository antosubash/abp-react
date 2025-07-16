import { FullConfig } from '@playwright/test';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

async function globalTeardown(config: FullConfig) {
  try {
    // Clean up authentication state file
    const authStatePath = join(__dirname, 'auth-state.json');
    if (existsSync(authStatePath)) {
      unlinkSync(authStatePath);
    }
    
    // Clean up test artifacts if needed
    console.log('✅ Global teardown completed - test artifacts cleaned up');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw error in teardown to avoid masking test failures
  }
}

export default globalTeardown; 