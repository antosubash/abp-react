---
sidebar_position: 4
---

# API Integration

Learn how to integrate your ABP React frontend with the ABP Framework backend API. This guide covers client generation, authentication, error handling, and best practices for API communication.

## Overview

ABP React uses a type-safe, auto-generated API client that provides seamless integration with your ABP backend. The client is generated from your backend's OpenAPI specification, ensuring type safety and consistency.

## API Client Generation

### Automatic Generation

The project uses `@hey-api/openapi-ts` to automatically generate TypeScript clients from your ABP backend's OpenAPI specification.

### Configuration

The API client generation is configured in `openapi-ts.config.ts`:

```typescript
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'https://your-api-url.com/swagger/v1/swagger.json',
  output: './src/client',
  types: {
    enums: 'javascript',
  },
});
```

### Generate Client

To generate or update the API client:

```bash
pnpm generate-client
```

This command:
1. Fetches the OpenAPI specification from your backend
2. Generates TypeScript interfaces and client methods
3. Creates type-safe API service functions
4. Updates the client in the `src/client` directory

## Client Structure

The generated client includes:

```
src/client/
├── index.ts              # Main client exports
├── types.gen.ts          # Generated TypeScript types
├── services.gen.ts       # Generated service methods
└── core/                 # Core client functionality
    ├── ApiError.ts       # Error handling
    ├── ApiResult.ts      # Response types
    ├── BaseHttpRequest.ts # Base HTTP client
    └── request.ts        # Request utilities
```

## Authentication Integration

### JWT Token Management

ABP React automatically handles JWT token authentication:

```typescript
// src/lib/api-client.ts
import { ApiClient } from '@/client';
import { getSession } from 'next-auth/react';

const apiClient = new ApiClient({
  BASE: process.env.NEXT_PUBLIC_API_URL,
  WITH_CREDENTIALS: true,
  CREDENTIALS: 'include',
});

// Automatic token injection
apiClient.request.config.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export { apiClient };
```

### Session Management

Integration with NextAuth.js for session handling:

```typescript
// src/sessionOptions.ts
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // ABP authentication logic
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          return await response.json();
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
```

## Making API Calls

### Using Generated Services

The generated client provides type-safe service methods:

```typescript
// Example: User management
import { UserService } from '@/client';

// Get users with pagination
const getUsersPage = async (page: number, pageSize: number) => {
  const response = await UserService.getUserList({
    skipCount: (page - 1) * pageSize,
    maxResultCount: pageSize,
  });
  return response;
};

// Create a new user
const createUser = async (userData: CreateUserDto) => {
  const response = await UserService.createUser({
    requestBody: userData,
  });
  return response;
};

// Update user
const updateUser = async (id: string, userData: UpdateUserDto) => {
  const response = await UserService.updateUser({
    id,
    requestBody: userData,
  });
  return response;
};

// Delete user
const deleteUser = async (id: string) => {
  await UserService.deleteUser({ id });
};
```

### Custom Hooks for API Operations

Create custom hooks for common API operations:

```typescript
// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/client';
import type { CreateUserDto, UpdateUserDto } from '@/client/types.gen';

export const useUsers = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => UserService.getUserList({
      skipCount: (page - 1) * pageSize,
      maxResultCount: pageSize,
    }),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => UserService.getUser({ id }),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: CreateUserDto) => 
      UserService.createUser({ requestBody: userData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUserDto }) =>
      UserService.updateUser({ id, requestBody: userData }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => UserService.deleteUser({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

## Error Handling

### Global Error Handler

Implement global error handling for API calls:

```typescript
// src/lib/error-handler.ts
import { ApiError } from '@/client';
import { toast } from 'sonner';

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    // ABP validation errors
    if (error.status === 400 && error.body?.error?.validationErrors) {
      const validationErrors = error.body.error.validationErrors;
      Object.entries(validationErrors).forEach(([field, messages]) => {
        toast.error(`${field}: ${messages.join(', ')}`);
      });
      return;
    }
    
    // ABP business logic errors
    if (error.body?.error?.message) {
      toast.error(error.body.error.message);
      return;
    }
    
    // HTTP status errors
    switch (error.status) {
      case 401:
        toast.error('Please log in to continue');
        // Redirect to login
        break;
      case 403:
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 500:
        toast.error('An internal server error occurred');
        break;
      default:
        toast.error('An unexpected error occurred');
    }
  } else {
    // Network or other errors
    toast.error('Unable to connect to the server');
  }
};
```

### React Query Error Handling

Integrate error handling with React Query:

```typescript
// src/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';
import { handleApiError } from './error-handler';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error instanceof ApiError && error.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
      onError: handleApiError,
    },
    mutations: {
      onError: handleApiError,
    },
  },
});
```

## Multi-tenancy Support

### Tenant Header Management

Handle multi-tenant scenarios:

```typescript
// src/lib/tenant-client.ts
import { apiClient } from './api-client';
import { useTenant } from '@/hooks/useTenant';

// Tenant header interceptor
apiClient.request.config.interceptors.request.use((config) => {
  const { currentTenant } = useTenant();
  
  if (currentTenant) {
    config.headers['__tenant'] = currentTenant.id;
  }
  
  return config;
});
```

### Tenant-specific API Calls

```typescript
// src/hooks/useTenantUsers.ts
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/client';
import { useTenant } from './useTenant';

export const useTenantUsers = (page: number, pageSize: number) => {
  const { currentTenant } = useTenant();
  
  return useQuery({
    queryKey: ['users', currentTenant?.id, page, pageSize],
    queryFn: () => UserService.getUserList({
      skipCount: (page - 1) * pageSize,
      maxResultCount: pageSize,
    }),
    enabled: !!currentTenant,
  });
};
```

## Performance Optimization

### Request Deduplication

React Query automatically deduplicates requests:

```typescript
// Multiple components calling the same API will share the result
const UserProfile = ({ userId }: { userId: string }) => {
  const { data: user } = useUser(userId); // Shared across components
  return <div>{user?.name}</div>;
};
```

### Caching Strategy

Configure caching for different data types:

```typescript
// src/hooks/useUsers.ts
export const useUsers = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => UserService.getUserList({
      skipCount: (page - 1) * pageSize,
      maxResultCount: pageSize,
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### Background Updates

Keep data fresh with background updates:

```typescript
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUser({ id: userId }),
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });
};
```

## Testing API Integration

### Mocking API Calls

Use Mock Service Worker (MSW) for testing:

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        ],
        totalCount: 2,
      })
    );
  }),
  
  rest.post('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '3',
        name: 'New User',
        email: 'new@example.com',
      })
    );
  }),
];
```

### Testing Custom Hooks

```typescript
// src/hooks/__tests__/useUsers.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from '../useUsers';

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

describe('useUsers', () => {
  it('should fetch users successfully', async () => {
    const { result } = renderHook(() => useUsers(1, 10), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.items).toHaveLength(2);
  });
});
```

## Best Practices

### 1. Type Safety
Always use the generated types for API calls:

```typescript
// Good: Using generated types
const createUser = async (userData: CreateUserDto) => {
  return UserService.createUser({ requestBody: userData });
};

// Bad: Using any type
const createUser = async (userData: any) => {
  return UserService.createUser({ requestBody: userData });
};
```

### 2. Error Boundaries
Implement error boundaries for API error handling:

```typescript
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ApiErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('API Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the API call.</div>;
    }

    return this.props.children;
  }
}
```

### 3. Loading States
Always handle loading states in your UI:

```typescript
const UserList = () => {
  const { data, isLoading, error } = useUsers(1, 10);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      {data?.items.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### 4. Optimistic Updates
Implement optimistic updates for better UX:

```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUserDto }) =>
      UserService.updateUser({ id, requestBody: userData }),
    onMutate: async ({ id, userData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', id] });
      
      // Snapshot previous value
      const previousUser = queryClient.getQueryData(['user', id]);
      
      // Optimistically update
      queryClient.setQueryData(['user', id], (old: any) => ({
        ...old,
        ...userData,
      }));
      
      return { previousUser };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      queryClient.setQueryData(['user', id], context?.previousUser);
    },
    onSettled: (_, __, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your ABP backend is configured to allow requests from your frontend domain
2. **Authentication Failures**: Check that JWT tokens are being properly included in requests
3. **Type Mismatches**: Regenerate the client after backend changes
4. **Network Timeouts**: Configure appropriate timeout values for your API calls

### Debug Mode

Enable debug mode for detailed API logging:

```typescript
// src/lib/api-client.ts
if (process.env.NODE_ENV === 'development') {
  apiClient.request.config.interceptors.request.use((config) => {
    console.log('API Request:', config);
    return config;
  });
  
  apiClient.request.config.interceptors.response.use(
    (response) => {
      console.log('API Response:', response);
      return response;
    },
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
}
```

## Next Steps

- **[Authentication](/docs/fundamentals/authentication)** - Set up authentication with ABP
- **[Multi-tenancy](/docs/fundamentals/multi-tenancy)** - Configure multi-tenant support
- **[Custom Hooks](/docs/development/custom-hooks)** - Create reusable API hooks
- **[Testing](/docs/development/testing)** - Test your API integration

---

Proper API integration is crucial for a successful ABP React application. Follow these patterns and best practices to ensure reliable, performant, and maintainable API communication.