/**
 * Test environment configuration
 * This file sets up the test environment and global mocks
 */

// Define test environment constants
export const TEST_ENV = {
  // API configuration
  API_URL: 'https://api.test.local',
  
  // Authentication configuration
  AUTH_COOKIE_NAME: 'test_auth_token',
  
  // Test timeouts
  DEFAULT_TIMEOUT: 5000,
  EXTENDED_TIMEOUT: 10000,
  
  // Test user roles
  ROLES: {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
  },
};

/**
 * Initialize the test environment
 * Call this function in your test setup if needed
 */
export function initTestEnvironment(): void {
  // Set up global mocks or configurations here
  
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
  // Mock window.scrollTo
  window.scrollTo = jest.fn();
  
  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    
    callback: IntersectionObserverCallback;
    root: Element | null = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [];
    
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn();
  };
}

/**
 * Clean up the test environment
 * Call this function after your tests if needed
 */
export function cleanupTestEnvironment(): void {
  // Clean up global mocks or configurations here
  jest.restoreAllMocks();
}