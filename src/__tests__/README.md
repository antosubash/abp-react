# Testing Framework

This directory contains the testing framework for the ABP React project. The framework is designed to support unit testing, integration testing, and end-to-end testing.

## Directory Structure

- `__mocks__`: Mock implementations for external dependencies
- `fixtures`: Test data and fixtures
- `utils`: Testing utilities and helper functions
- `setup`: Test environment setup and configuration

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## Testing Guidelines

### File Organization

- Place unit tests next to the file they test with a `.test.ts` or `.test.tsx` extension
- Place integration tests in the `__tests__` directory with a `.test.ts` or `.test.tsx` extension
- Place end-to-end tests in the `tests/e2e` directory with a `.spec.ts` extension

### Naming Conventions

- Use descriptive test names that explain what is being tested
- Use the pattern `describe('Component/Function Name', () => { ... })` for test suites
- Use the pattern `it('should do something', () => { ... })` for individual tests

### Best Practices

- Test behavior, not implementation details
- Use the `render` function from `@testing-library/react` for component tests
- Use the `userEvent` object for simulating user interactions
- Mock external dependencies and API calls
- Test edge cases and error conditions
- Keep tests simple and focused on a single behavior

## Available Utilities

- `render`: Custom render function that wraps components with necessary providers
- `userEvent`: Simulates user interactions
- `TEST_ENV`: Test environment configuration
- `initTestEnvironment`: Initializes the test environment
- `cleanupTestEnvironment`: Cleans up the test environment

## Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  it('should render with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```