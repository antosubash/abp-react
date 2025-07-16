// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder (required by MSW)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill for Response (required by MSW v2)
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      this.status = (init && init.status) || 200;
      this.statusText = (init && init.statusText) || '';
      this.headers = new Map(Object.entries((init && init.headers) || {}));
    }
    
    static json(data, init) {
      return new Response(JSON.stringify(data), {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...(init && init.headers),
        },
      });
    }
  };
}

// Polyfill for BroadcastChannel (required by MSW v2)
if (typeof global.BroadcastChannel === 'undefined') {
  global.BroadcastChannel = class BroadcastChannel {
    constructor(name) {
      this.name = name;
    }
    
    name;
    
    postMessage = jest.fn();
    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    close = jest.fn();
  };
}

// Polyfill for TransformStream (required by MSW v2)
if (typeof global.TransformStream === 'undefined') {
  const { TransformStream } = require('web-streams-polyfill');
  global.TransformStream = TransformStream;
}

// Polyfill for Request (required by MSW v2)
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init = {}) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = init.method || 'GET';
      this.headers = new Map(Object.entries(init.headers || {}));
      this.body = init.body;
    }
  };
}

// Import test environment setup
import { initTestEnvironment } from './__tests__/utils/test-environment';

// Mock Next.js router
jest.mock('next/navigation', () => require('./__tests__/__mocks__/next-router'));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Set up global test environment
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/i.test(args[0]) ||
    /Warning.*ReactDOM.render is no longer supported/i.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Set up global fetch mock
global.fetch = jest.fn();

// Initialize test environment with default settings
initTestEnvironment();

// Set up MSW for API mocking
// This is imported from a separate file to keep this file clean
require('./__tests__/setup/msw-setup');

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});