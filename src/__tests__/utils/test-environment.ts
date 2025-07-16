/**
 * Test environment configuration and utilities
 * This file provides utilities for setting up and tearing down test environments
 */

/**
 * Test environment configuration
 */
export const TEST_ENV = {
  /**
   * API URL for tests
   */
  apiUrl: process.env.TEST_API_URL || 'https://api.example.com',
  
  /**
   * Whether to mock API calls (true) or use real API (false)
   */
  mockApi: process.env.MOCK_API !== 'false',
  
  /**
   * Default timeout for async operations in tests (ms)
   */
  timeout: parseInt(process.env.TEST_TIMEOUT || '5000', 10),
  
  /**
   * Default viewport size for component tests
   */
  viewport: {
    width: parseInt(process.env.TEST_VIEWPORT_WIDTH || '1280', 10),
    height: parseInt(process.env.TEST_VIEWPORT_HEIGHT || '720', 10),
  },
};

/**
 * Initialize the test environment
 * @param options - Environment options to override defaults
 */
export function initTestEnvironment(options: Partial<typeof TEST_ENV> = {}) {
  // Override default environment settings
  Object.assign(TEST_ENV, options);
  
  // Set up global mocks
  if (TEST_ENV.mockApi) {
    // Mock fetch API
    global.fetch = jest.fn().mockImplementation((url) => {
      console.warn(`Unmocked fetch call to ${url}`);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
    
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  }
  
  // Set default timeout
  jest.setTimeout(TEST_ENV.timeout);
}

/**
 * Clean up the test environment
 */
export function cleanupTestEnvironment() {
  // Reset all mocks
  jest.resetAllMocks();
  
  // Clear any local/session storage mocks
  if (window.localStorage) {
    window.localStorage.clear();
  }
  if (window.sessionStorage) {
    window.sessionStorage.clear();
  }
}

/**
 * Wait for a specified amount of time
 * @param ms - Time to wait in milliseconds
 * @returns Promise that resolves after the specified time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for a condition to be true
 * @param condition - Function that returns a boolean
 * @param timeout - Maximum time to wait in milliseconds
 * @param interval - Interval between checks in milliseconds
 * @returns Promise that resolves when condition is true
 */
export async function waitFor(
  condition: () => boolean | Promise<boolean>,
  timeout = TEST_ENV.timeout,
  interval = 100
): Promise<void> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await wait(interval);
  }
  
  throw new Error(`Condition not met within ${timeout}ms timeout`);
}

/**
 * Create a mock response object
 * @param data - Response data
 * @param status - HTTP status code
 * @returns Mock response object
 */
export function mockResponse<T>(data: T, status = 200) {
  return {
    data,
    status,
    ok: status >= 200 && status < 300,
    headers: new Headers(),
  };
}

/**
 * Create a mock error response
 * @param message - Error message
 * @param status - HTTP status code
 * @returns Mock error response
 */
export function mockErrorResponse(message: string, status = 400) {
  return {
    data: { error: { message } },
    status,
    ok: false,
    headers: new Headers(),
  };
}