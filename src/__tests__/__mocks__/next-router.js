/**
 * Mock implementation for Next.js router
 * This provides mock implementations for all Next.js navigation functions
 */

// Mock router state
const routerState = {
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

// Mock navigation hooks
const useRouter = jest.fn().mockReturnValue(routerState);
const usePathname = jest.fn().mockReturnValue('/');
const useSearchParams = jest.fn().mockReturnValue(new URLSearchParams());
const useParams = jest.fn().mockReturnValue({});

// Mock navigation functions
const push = jest.fn();
const replace = jest.fn();
const back = jest.fn();
const forward = jest.fn();
const refresh = jest.fn();
const prefetch = jest.fn();

// Reset all mocks between tests
afterEach(() => {
  routerState.push.mockReset();
  routerState.replace.mockReset();
  routerState.reload.mockReset();
  routerState.back.mockReset();
  routerState.forward.mockReset();
  routerState.prefetch.mockReset();
  routerState.beforePopState.mockReset();
  routerState.events.on.mockReset();
  routerState.events.off.mockReset();
  routerState.events.emit.mockReset();
  push.mockReset();
  replace.mockReset();
  back.mockReset();
  forward.mockReset();
  refresh.mockReset();
  prefetch.mockReset();
});

// Export all mock functions and hooks
module.exports = {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  push,
  replace,
  back,
  forward,
  refresh,
  prefetch,
};

