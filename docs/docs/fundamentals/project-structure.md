---
sidebar_position: 1
---

# Project Structure

Understanding the project structure is crucial for effective development with ABP React. This guide explains the organization of files and directories in your ABP React application.

## Overview

ABP React follows a clean, scalable architecture that separates concerns and promotes maintainability. The project structure is designed to be intuitive for developers familiar with modern React applications while integrating seamlessly with ABP Framework patterns.

## Root Directory Structure

```
my-awesome-app/
├── .env.sample                 # Environment variables template
├── biome.json                 # Biome configuration
├── .gitignore                 # Git ignore rules
├── components.json            # shadcn/ui configuration
├── Dockerfile                 # Docker configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Node.js dependencies and scripts
├── pnpm-lock.yaml             # Package lock file
├── postcss.config.mjs         # PostCSS configuration

├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration
├── public/                    # Static assets
├── src/                       # Source code
└── .template.config/          # Template configuration
```

## Source Code Structure (`src/`)

The `src` directory contains all the application source code, organized by feature and responsibility:

```
src/
├── app/                       # Next.js App Router
│   ├── api/                   # API routes
│   ├── auth/                  # Authentication pages
│   ├── admin/                 # Admin panel pages
│   ├── session/               # Session management
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout component
│   └── page.tsx               # Home page
├── components/                # Reusable UI components
│   ├── ui/                    # shadcn/ui components
│   ├── sections/              # Page sections
│   ├── navbar/                # Navigation components
│   ├── menu/                  # Menu components
│   ├── user/                  # User-related components
│   ├── role/                  # Role management components
│   ├── tenant/                # Tenant components
│   ├── permission/            # Permission components
│   ├── profile/               # Profile components
│   ├── settings/              # Settings components
│   └── analytics/             # Analytics components
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions and configurations
├── client/                    # API client and services
├── layout/                    # Layout components
├── config.ts                  # Application configuration
├── middleware.ts              # Next.js middleware
├── sessionOptions.ts          # Session configuration
└── useSession.ts              # Session hook
```

## Key Directories Explained

### `app/` - Next.js App Router

This directory contains the Next.js 13+ App Router structure:

- **`api/`**: Server-side API routes for handling backend communication
- **`auth/`**: Authentication-related pages (login, register, forgot password)
- **`admin/`**: Administrative interface pages
- **`session/`**: Session management pages
- **`layout.tsx`**: Root layout component that wraps all pages
- **`page.tsx`**: The main homepage component

### `components/` - UI Components

Organized by feature and responsibility:

- **`ui/`**: Base UI components from shadcn/ui (Button, Input, Dialog, etc.)
- **`sections/`**: Larger page sections and layouts
- **`navbar/`**: Navigation bar components
- **`menu/`**: Menu and navigation components
- **`user/`**: User management components (UserList, UserForm, etc.)
- **`role/`**: Role management components
- **`tenant/`**: Multi-tenancy components
- **`permission/`**: Permission management components
- **`profile/`**: User profile components
- **`settings/`**: Application settings components
- **`analytics/`**: Analytics and reporting components

### `hooks/` - Custom React Hooks

Contains custom hooks for:
- Data fetching and caching
- Form handling
- Authentication state
- Permission checking
- Multi-tenancy operations

### `lib/` - Utilities and Configurations

Contains utility functions and configurations:
- API client configuration
- Validation schemas
- Helper functions
- Constants and enums
- Type definitions

### `client/` - API Client

Contains the generated API client and services:
- OpenAPI generated clients
- Custom service wrappers
- Request/response interceptors
- Error handling utilities

## Configuration Files

### `next.config.mjs`

Next.js configuration including:
- Build optimization settings
- Environment variables
- Webpack customizations
- Routing configuration

### `tsconfig.json`

TypeScript configuration with:
- Path mappings for clean imports
- Strict type checking rules
- Module resolution settings
- Compilation targets

### `components.json`

shadcn/ui configuration specifying:
- Component library settings
- Theme configuration
- CSS variables
- Utility classes

### `package.json`

Node.js project configuration with:
- Dependencies and dev dependencies
- Build and development scripts
- Project metadata

## File Naming Conventions

### Components
- **PascalCase**: `UserProfile.tsx`, `NavigationMenu.tsx`
- **Directory-based**: Components with multiple files go in directories
- **Index files**: Use `index.tsx` for main component exports

### Hooks
- **camelCase with 'use' prefix**: `useAuth.ts`, `usePermissions.ts`

### Utilities
- **camelCase**: `apiClient.ts`, `validation.ts`

### Pages (App Router)
- **kebab-case**: `user-profile/page.tsx`, `admin/users/page.tsx`
- **Special files**: `layout.tsx`, `loading.tsx`, `error.tsx`

## Import Organization

Imports should be organized in the following order:

1. **React and Next.js imports**
2. **Third-party libraries**
3. **Internal utilities and configurations**
4. **Components (UI, then feature-specific)**
5. **Types and interfaces**
6. **Relative imports**

Example:
```typescript
// React and Next.js
import React from 'react';
import { useRouter } from 'next/navigation';

// Third-party libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Internal utilities
import { apiClient } from '@/lib/api-client';
import { userSchema } from '@/lib/schemas';

// Components
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/user/user-form';

// Types
import type { User } from '@/types/user';

// Relative imports
import './user-profile.css';
```

## Environment Configuration

### `.env.sample`

Template for environment variables:
```env
# Application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-url.com

# Authentication
NEXT_PUBLIC_AUTH_PROVIDERS=credentials,google,github

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MULTI_TENANCY=true
```

### `.env.local`

Local development environment variables (not committed to git):
```env
NEXTAUTH_SECRET=your-development-secret
NEXT_PUBLIC_API_URL=http://localhost:44300
```

## Build and Deployment Structure

### Production Build

```
.next/                         # Next.js build output
├── static/                    # Static assets
├── server/                    # Server-side code
└── cache/                     # Build cache
```

### Docker

The project includes Docker configuration for containerized deployment:

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder
# ... build steps

FROM node:18-alpine AS runner
# ... runtime configuration
```

## Best Practices

### Directory Organization
- **Feature-based**: Group related components, hooks, and utilities together
- **Consistent naming**: Use consistent naming conventions across the project
- **Clear separation**: Separate concerns between UI, business logic, and data access

### Component Structure
- **Single responsibility**: Each component should have a single, well-defined purpose
- **Reusability**: Design components to be reusable across different parts of the application
- **Composition**: Use composition over inheritance for complex components

### Import Management
- **Absolute imports**: Use path mappings for cleaner imports
- **Barrel exports**: Use index files to simplify imports
- **Lazy loading**: Implement code splitting for large components

## Next Steps

Now that you understand the project structure, explore these related topics:

- **[Configuration Guide](/docs/fundamentals/configuration)** - Learn about configuration options
- **[Authentication Setup](/docs/fundamentals/authentication)** - Set up authentication
- **[Component Development](/docs/components/ui-components)** - Build custom components
- **[API Integration](/docs/fundamentals/api-integration)** - Connect to your ABP backend

---

Understanding the project structure is the foundation for successful development with ABP React. This organization promotes maintainability, scalability, and developer productivity.