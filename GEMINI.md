# Gemini Guidelines for AbpReact

This document provides comprehensive guidelines for Gemini to follow when working with the AbpReact project, ensuring consistent and high-quality development practices.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Development Environment](#development-environment)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Code Quality Standards](#code-quality-standards)
- [Component Development](#component-development)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

AbpReact is a modern, full-stack web application template that combines the power of ASP.NET Core with the flexibility of React. It serves as a drop-in replacement for the default Angular UI in ABP Framework projects, offering:

- **Enhanced Performance**: Optimized with Next.js 15 and modern React patterns
- **Better SEO**: Server-side rendering and static generation capabilities
- **Visual Page Building**: Integrated Puck editor for drag-and-drop page creation
- **Component Documentation**: Comprehensive Storybook integration
- **Modern Development Experience**: TypeScript, Tailwind CSS, and advanced tooling

### Key Features

- 🎨 **Visual Editor**: Puck-based page builder with drag-and-drop functionality
- 📚 **Component Library**: Extensive UI component library with Storybook documentation
- 🔐 **Authentication**: Integrated ABP authentication with OpenID Connect
- 👥 **Multi-tenancy**: Full support for ABP's multi-tenant architecture
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🧪 **Testing**: Comprehensive testing with Vitest and Storybook testing
- 🚀 **Performance**: Optimized bundle size and loading performance

## 🏗️ Architecture

### Frontend Architecture

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin interface pages
│   ├── auth/              # Authentication routes
│   └── pages/             # Public pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── puck/             # Puck editor components
│   └── [feature]/        # Feature-specific components
├── client/               # API client and types
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── stories/              # Storybook stories
```

### Backend Integration

- **ABP Framework**: .NET 8 backend with full ABP features
- **OpenAPI**: Auto-generated TypeScript client from OpenAPI spec
- **Authentication**: ABP's OpenID Connect implementation
- **Multi-tenancy**: Tenant-aware API calls and UI

## 🛠️ Development Environment

### Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher (recommended package manager)
- **.NET 8 SDK**: For backend development
- **Git**: Version control

### Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend Framework** | Next.js | 15.x | React framework with SSR/SSG |
| **UI Library** | React | 18.x | Component library |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **UI Primitives** | Radix UI | Latest | Accessible component primitives |
| **State Management** | TanStack Query | Latest | Server state management |
| **Forms** | React Hook Form + Zod | Latest | Form handling and validation |
| **Type Safety** | TypeScript | 5.x | Static type checking |
| **Testing** | Vitest | Latest | Unit and integration testing |
| **Documentation** | Storybook | Latest | Component documentation |
| **Code Quality** | Biome | Latest | Linting and formatting |

## 🚀 Getting Started

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd AbpReact

# Navigate to frontend directory
cd src

# Install dependencies
pnpm install
```

### 2. Environment Configuration

Create a `.env.local` file in the `src` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:44300
NEXT_PUBLIC_APP_NAME=AbpReact

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_UMAMI_ID=your-umami-id
```

### 3. Start Development

```bash
# Start development server
pnpm dev

# The application will be available at http://localhost:3000
```

## 📁 Project Structure

### Key Directories

```
src/
├── app/                    # Next.js app router
│   ├── admin/             # Admin interface
│   │   ├── cms/          # Content management
│   │   ├── permissions/  # Permission management
│   │   ├── profile/      # User profile
│   │   ├── settings/     # Application settings
│   │   ├── tenants/      # Tenant management
│   │   └── users/        # User management
│   ├── auth/             # Authentication routes
│   └── pages/            # Public pages
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── puck/             # Puck editor blocks
│   └── [feature]/        # Feature-specific components
├── client/               # API client
├── hooks/                # Custom hooks
├── lib/                  # Utilities and config
└── stories/              # Storybook stories
```

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Run tests and linting
pnpm test
pnpm lint
pnpm format

# Commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

### 2. Component Development

When creating new components:

1. **Create the component** in `src/components/[feature]/`
2. **Add TypeScript types** for props and data
3. **Write Storybook stories** in `src/stories/`
4. **Add tests** using Vitest
5. **Document usage** in Storybook

### 3. API Integration

```typescript
// Use the generated API client
import { client } from '@/client';

// Example: Fetch users
const users = await client.users.getList({
  skipCount: 0,
  maxResultCount: 10
});
```

## 🧪 Testing Strategy

### Unit Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Component Testing

```bash
# Run Storybook
pnpm storybook

# Run Storybook tests
pnpm test-storybook

# Build Storybook
pnpm build-storybook
```

### Testing Best Practices

- Write tests for all new components
- Use React Testing Library for component tests
- Mock API calls in tests
- Test both success and error scenarios
- Maintain good test coverage (>80%)

## 📏 Code Quality Standards

### Code Style

- **TypeScript**: Strict mode enabled, no `any` types
- **Biome**: Linting, formatting, and code quality rules
- **Conventional Commits**: Follow commit message standards

### Linting and Formatting

```bash
# Check for linting issues
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Format code
pnpm format

# Type checking
pnpm type-check
```

### Pre-commit Hooks

The project uses Husky for pre-commit hooks that automatically:
- Run Biome linting and formatting
- Run TypeScript checks
- Run tests

## 🧩 Component Development

### Component Structure

```typescript
// Example component structure
interface ComponentProps {
  // Define props with TypeScript
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}

// Export for use
export { Component };
```

### UI Component Guidelines

- Use Radix UI primitives for accessibility
- Follow Tailwind CSS utility-first approach
- Implement responsive design
- Add proper ARIA labels and roles
- Test with keyboard navigation

### Puck Component Development

When creating Puck blocks:

1. **Create the component** in `src/components/puck/components/`
2. **Define configuration** with proper field types
3. **Add Storybook stories** for documentation
4. **Test drag-and-drop functionality**

## 🔌 API Integration

### Generated Client

The project uses OpenAPI to generate TypeScript client:

```bash
# Generate API client
pnpm gen-api
```

### API Usage Patterns

```typescript
// Query data
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => client.users.getList()
});

// Mutate data
const mutation = useMutation({
  mutationFn: (user: CreateUserDto) => client.users.create(user),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
});
```

### Error Handling

```typescript
// Global error handling
import { useErrorHandler } from '@/lib/error-handling';

const { handleError } = useErrorHandler();

try {
  // API call
} catch (error) {
  handleError(error);
}
```

## 🚀 Deployment

### Build Process

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Ensure all required environment variables are set in production:

- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- Database connection strings
- Redis connection (if using)

### Docker Deployment

```bash
# Build Docker image
docker build -t abpreact .

# Run container
docker run -p 3000:3000 abpreact
```

## 🔧 Troubleshooting

### Common Issues

#### 1. API Client Generation

```bash
# If API client is outdated
pnpm gen-api
```

#### 2. TypeScript Errors

```bash
# Check for type errors
pnpm type-check

# Regenerate types if needed
pnpm gen-api
```

#### 3. Storybook Issues

```bash
# Clear Storybook cache
rm -rf node_modules/.cache/storybook
pnpm storybook
```

#### 4. Build Issues

```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

### Performance Optimization

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images with Next.js Image component
- Use dynamic imports for code splitting
- Monitor bundle size with `pnpm analyze`

## 📚 Additional Resources

- [ABP Framework Documentation](https://docs.abp.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [TanStack Query Documentation](https://tanstack.com/query)

## 🤝 Contributing

When contributing to the project:

1. Follow the established coding standards
2. Write comprehensive tests
3. Update documentation as needed
4. Use conventional commits
5. Create descriptive pull requests

---

**Note**: This document should be updated as the project evolves. Always refer to the latest project documentation and codebase for the most current information.
