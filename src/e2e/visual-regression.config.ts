import { defineConfig } from '@playwright/test';

export const visualRegressionConfig = {
  // Screenshot comparison thresholds
  thresholds: {
    // Overall image similarity threshold (0-1)
    similarity: 0.95,
    
    // Maximum number of different pixels allowed
    maxDiffPixels: 100,
    
    // Maximum ratio of different pixels (0-1)
    maxDiffPixelRatio: 0.1,
    
    // Color difference threshold
    colorThreshold: 0.1
  },

  // Viewport configurations for responsive testing
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
    largeDesktop: { width: 2560, height: 1440 }
  },

  // Theme configurations
  themes: {
    light: 'default',
    dark: 'dark',
    highContrast: 'high-contrast'
  },

  // Components to test
  components: {
    // Layout components
    layout: [
      'dashboard',
      'sidebar',
      'header',
      'footer',
      'breadcrumb'
    ],

    // Form components
    forms: [
      'login-form',
      'add-user-form',
      'edit-user-form',
      'change-password-form',
      'create-page-form'
    ],

    // Data display components
    dataDisplay: [
      'users-table',
      'roles-table',
      'tenants-table',
      'pages-table',
      'comments-table'
    ],

    // Interactive components
    interactive: [
      'dropdown-menu',
      'modal-dialog',
      'tooltip',
      'pagination',
      'search-input'
    ],

    // Navigation components
    navigation: [
      'main-menu',
      'user-menu',
      'mobile-menu',
      'tab-navigation'
    ]
  },

  // Pages to test
  pages: {
    // Authentication pages
    auth: [
      'login',
      'logout'
    ],

    // Admin pages
    admin: [
      'dashboard',
      'users',
      'roles',
      'tenants',
      'settings',
      'profile'
    ],

    // CMS pages
    cms: [
      'pages',
      'menus',
      'comments'
    ]
  },

  // States to capture
  states: {
    // Loading states
    loading: [
      'initial-load',
      'data-loading',
      'form-submitting'
    ],

    // Error states
    error: [
      'network-error',
      'validation-error',
      'not-found',
      'server-error'
    ],

    // Interactive states
    interactive: [
      'hover',
      'focus',
      'active',
      'disabled'
    ],

    // Content states
    content: [
      'empty',
      'with-data',
      'filtered',
      'sorted'
    ]
  },

  // Masking configurations for dynamic content
  masks: {
    // Timestamps and dates
    timestamps: [
      '[data-testid="timestamp"]',
      '[data-testid="date"]',
      '[data-testid="time"]'
    ],

    // User-specific data
    userData: [
      '[data-testid="user-id"]',
      '[data-testid="user-email"]',
      '[data-testid="user-name"]'
    ],

    // Dynamic IDs
    dynamicIds: [
      '[data-testid*="id"]',
      '[data-testid*="uuid"]'
    ],

    // Random content
    randomContent: [
      '[data-testid="random-text"]',
      '[data-testid="generated-content"]'
    ]
  },

  // Screenshot naming conventions
  naming: {
    // Component screenshots
    component: '{component}-{state}-{viewport}-{theme}',
    
    // Page screenshots
    page: '{page}-{state}-{viewport}-{theme}',
    
    // Element screenshots
    element: '{element}-{state}-{theme}'
  },

  // Baseline management
  baseline: {
    // Directory for baseline screenshots
    directory: 'test-results/baseline',
    
    // Directory for current screenshots
    current: 'test-results/current',
    
    // Directory for diff screenshots
    diff: 'test-results/diff',
    
    // Auto-update baselines in development
    autoUpdate: process.env.NODE_ENV === 'development'
  },

  // Reporting configuration
  reporting: {
    // Generate HTML report
    html: true,
    
    // Generate JSON report
    json: true,
    
    // Generate JUnit report
    junit: true,
    
    // Include screenshots in report
    includeScreenshots: true,
    
    // Include diffs in report
    includeDiffs: true
  },

  // CI/CD configuration
  ci: {
    // Fail on visual regression in CI
    failOnRegression: true,
    
    // Upload artifacts
    uploadArtifacts: true,
    
    // Comment on PR with results
    commentOnPR: true
  }
};

export default visualRegressionConfig; 