---
sidebar_position: 1
---

# Development Setup

This guide helps you set up your development environment for contributing to ABP React or extending the template for your own projects.

## Prerequisites

Before starting development, ensure you have the following tools installed:

### Required Tools

- **Node.js** (18.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`

- **pnpm** (8.0 or higher)
  - Install: `npm install -g pnpm`
  - Verify: `pnpm --version`

- **.NET 8 SDK**
  - Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/8.0)
  - Verify: `dotnet --version`

- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

### Recommended Tools

- **Visual Studio Code** with extensions:
  - Biome
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - GitLens
  - Thunder Client (for API testing)

- **Docker Desktop** (for containerized development)
  - Download from [docker.com](https://www.docker.com/products/docker-desktop/)

## Project Setup

### 1. Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/antosubash/abp-react.git
cd abp-react

# Or clone your fork
git clone https://github.com/YOUR_USERNAME/abp-react.git
cd abp-react
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm --version
```

### 3. Environment Configuration

Create your development environment file:

```bash
# Copy the sample environment file
cp .env.sample .env.local

# Edit the environment file
nano .env.local
```

Configure your environment variables:

```env
# Application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-for-development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:44300

# Database (if running locally)
DATABASE_URL=postgresql://username:password@localhost:5432/abp_react_dev

# Authentication Providers
NEXT_PUBLIC_AUTH_PROVIDERS=credentials,google,github

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MULTI_TENANCY=true
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### 4. Generate API Client

If you have an ABP backend running:

```bash
# Generate/update the API client
pnpm generate-client

# Or if you need to specify a different API URL
pnpm generate-client --input https://your-api-url.com/swagger/v1/swagger.json
```

### 5. Start Development Server

```bash
# Start the development server
pnpm dev

# Or start with debug mode
pnpm dev:debug
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## Development Workflow

### Git Workflow

We follow the Git Flow branching model:

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... code changes ...

# Stage and commit your changes
git add .
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Feature
git commit -m "feat: add user management component"

# Bug fix
git commit -m "fix: resolve authentication redirect issue"

# Documentation
git commit -m "docs: update API integration guide"

# Style changes
git commit -m "style: improve button component design"

# Refactoring
git commit -m "refactor: simplify user service implementation"

# Performance improvement
git commit -m "perf: optimize image loading"

# Tests
git commit -m "test: add unit tests for user hooks"

# Build/CI
git commit -m "build: update dependencies"

# Breaking change
git commit -m "feat!: redesign authentication flow"
```

## Code Standards

### TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Biome Rules

Biome is configured with all rules set to warning level for better developer experience:

```json
// biome.json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": { "level": "warn" },
      "correctness": { "level": "warn" },
      "suspicious": { "level": "warn" },
      "complexity": { "level": "warn" },
      "style": { "level": "warn" },
      "nursery": { "level": "warn" },
      "a11y": { "level": "warn" },
      "performance": { "level": "warn" },
      "security": { "level": "warn" }
    }
  }
}
```

### Biome Formatting

Code formatting rules are handled by Biome:

```json
// biome.json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5",
      "semicolons": "asNeeded"
    }
  }
}
```

## Component Development

### Component Structure

Follow this structure for new components:

```typescript
// src/components/user/UserProfile.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import type { User } from '@/client/types.gen';

interface UserProfileProps {
  userId: string;
  onEdit?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onEdit }) => {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error loading user profile</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
        {onEdit && (
          <Button onClick={onEdit} variant="outline">
            Edit Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
```

### Custom Hooks

Create reusable custom hooks:

```typescript
// src/hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/client';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => UserService.getUser({ id }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## Testing

### Testing Setup

The project uses Jest and React Testing Library:

```bash
# Install testing dependencies
pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

#### Component Tests

```typescript
// src/components/user/__tests__/UserProfile.test.tsx
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from '../UserProfile';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('UserProfile', () => {
  it('renders user information', async () => {
    render(<UserProfile userId="1" />, { wrapper: createWrapper() });

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('shows edit button when onEdit is provided', () => {
    const mockOnEdit = jest.fn();
    render(<UserProfile userId="1" onEdit={mockOnEdit} />, { wrapper: createWrapper() });

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });
});
```

#### Hook Tests

```typescript
// src/hooks/__tests__/useUser.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useUser } from '../useUser';

describe('useUser', () => {
  it('fetches user data successfully', async () => {
    const { result } = renderHook(() => useUser('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUser);
  });
});
```

## Debugging

### Development Tools

#### Browser DevTools

- **React DevTools**: Install the browser extension for React debugging
- **Redux DevTools**: For state management debugging (if using Redux)

#### VS Code Debugging

Create a launch configuration:

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### Common Issues and Solutions

#### 1. Module Resolution Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

#### 2. TypeScript Errors

```bash
# Regenerate TypeScript types
pnpm generate-client

# Check TypeScript configuration
npx tsc --noEmit
```

#### 3. API Client Issues

```bash
# Verify API URL is accessible
curl https://your-api-url.com/swagger/v1/swagger.json

# Regenerate client with verbose output
pnpm generate-client --verbose
```

## Performance Optimization

### Bundle Analysis

Analyze your bundle size:

```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Run bundle analysis
pnpm analyze
```

### Code Splitting

Implement code splitting for large components:

```typescript
// Lazy load components
const UserManagement = lazy(() => import('@/components/user/UserManagement'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <UserManagement />
</Suspense>
```

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/profile-picture.jpg"
  alt="Profile"
  width={200}
  height={200}
  priority
/>
```

## Continuous Integration

### GitHub Actions

The project includes GitHub Actions for CI/CD:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

### Pre-commit Hooks

Set up pre-commit hooks with Husky:

```bash
# Install Husky
pnpm add -D husky

# Add pre-commit hook
npx husky add .husky/pre-commit "pnpm lint-staged"
```

## Deployment

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t abp-react .

# Run Docker container
docker run -p 3000:3000 abp-react
```

### Environment Variables

Set production environment variables:

```env
NEXTAUTH_URL=https://your-production-domain.com
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_API_URL=https://your-production-api.com
```

## Contributing Guidelines

### Before Contributing

1. Check existing issues and pull requests
2. Follow the code style and conventions
3. Add tests for new features
4. Update documentation as needed
5. Ensure all tests pass

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request
6. Address review feedback

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact is considered
- [ ] Security implications are addressed

## Getting Help

### Resources

- **Documentation**: [ABP React Docs](https://antosubash.github.io/abp-react/)
- **GitHub Issues**: [Report bugs and request features](https://github.com/antosubash/abp-react/issues)
- **Discussions**: [Community discussions](https://github.com/antosubash/abp-react/discussions)

### Community

- **Discord**: [Join our Discord server](https://discord.gg/your-server)
- **Twitter**: [@antosubash](https://twitter.com/antosubash)
- **Email**: [antosubash@outlook.com](mailto:antosubash@outlook.com)

---

Follow these development guidelines to ensure a consistent and high-quality codebase. Happy coding! 🚀