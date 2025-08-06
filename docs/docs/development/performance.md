---
sidebar_position: 4
---

# Performance Optimization

Performance optimization is crucial for delivering fast, responsive applications. ABP React provides various techniques and best practices to optimize your application's performance.

## 🎯 Performance Metrics

### Core Web Vitals

ABP React focuses on optimizing these key performance metrics:

- **Largest Contentful Paint (LCP)**: Time to load the main content
- **First Input Delay (FID)**: Time to respond to user interactions
- **Cumulative Layout Shift (CLS)**: Visual stability during loading
- **Time to Interactive (TTI)**: Time until the page is fully interactive

### Performance Targets

```typescript
// Performance targets for ABP React applications
const performanceTargets = {
  lcp: 2500, // 2.5 seconds
  fid: 100,  // 100 milliseconds
  cls: 0.1,  // 0.1 score
  tti: 3800, // 3.8 seconds
};
```

## 🚀 React Performance Optimization

### 1. Component Memoization

```typescript
// Memoizing expensive components
import React, { memo, useMemo } from 'react';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export const UserList = memo<UserListProps>(({ users, onUserClick }) => {
  // Memoize expensive calculations
  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return (
    <div className="space-y-2">
      {sortedUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => onUserClick(user)}
        />
      ))}
    </div>
  );
});

UserList.displayName = 'UserList';
```

### 2. Hook Optimization

```typescript
// Optimizing custom hooks
import { useCallback, useMemo } from 'react';

export const useUserData = (userId: string) => {
  // Memoize expensive operations
  const userData = useMemo(() => {
    return expensiveUserCalculation(userId);
  }, [userId]);

  // Memoize callbacks to prevent unnecessary re-renders
  const updateUser = useCallback(async (updates: Partial<User>) => {
    const response = await userService.updateUser(userId, updates);
    return response.data;
  }, [userId]);

  return {
    userData,
    updateUser,
  };
};
```

### 3. Context Optimization

```typescript
// Optimizing context providers
import React, { createContext, useContext, useMemo } from 'react';

interface UserContextValue {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    updateUser: (updates: Partial<User>) => {
      setUser(prev => prev ? { ...prev, ...updates } : null);
    },
    logout: () => setUser(null),
  }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
```

## 📦 Bundle Optimization

### 1. Code Splitting

```typescript
// Dynamic imports for code splitting
import { lazy, Suspense } from 'react';

// Lazy load components
const UserManagement = lazy(() => import('./UserManagement'));
const RoleManagement = lazy(() => import('./RoleManagement'));
const Settings = lazy(() => import('./Settings'));

// Route-based code splitting
const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
};
```

### 2. Tree Shaking

```typescript
// Optimizing imports for tree shaking
// Good: Only import what you need
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

// Avoid: Importing entire libraries
import * as React from 'react';
import * as UI from '@/components/ui';
```

### 3. Bundle Analysis

```typescript
// next.config.mjs
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // Enable bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

## 🖼️ Image Optimization

### 1. Next.js Image Component

```typescript
// Optimized image loading
import Image from 'next/image';

export const UserAvatar: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Image
      src={user.avatar || '/default-avatar.png'}
      alt={`${user.name}'s avatar`}
      width={48}
      height={48}
      className="rounded-full"
      priority={false} // Set to true for above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  );
};
```

### 2. Responsive Images

```typescript
// Responsive image component
export const ResponsiveImage: React.FC<{
  src: string;
  alt: string;
  sizes?: string;
}> = ({ src, alt, sizes = "100vw" }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      priority={false}
    />
  );
};
```

## 🔄 Data Fetching Optimization

### 1. React Query Optimization

```typescript
// Optimized data fetching with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### 2. Pagination and Virtualization

```typescript
// Virtualized list for large datasets
import { FixedSizeList as List } from 'react-window';

interface VirtualizedUserListProps {
  users: User[];
  height: number;
  itemHeight: number;
}

export const VirtualizedUserList: React.FC<VirtualizedUserListProps> = ({
  users,
  height,
  itemHeight,
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <UserCard user={users[index]} />
    </div>
  );

  return (
    <List
      height={height}
      itemCount={users.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### 3. Infinite Scrolling

```typescript
// Infinite scrolling with React Query
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteUsers = (pageSize = 20) => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam = 0 }) => 
      userService.getUsers({ skip: pageParam * pageSize, take: pageSize }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.items.length === pageSize ? pages.length : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const InfiniteUserList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers();

  const allUsers = data?.pages.flatMap(page => page.items) ?? [];

  return (
    <div>
      {allUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
      
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </div>
  );
};
```

## 🎨 CSS and Styling Optimization

### 1. CSS-in-JS Optimization

```typescript
// Optimized styled-components
import styled from 'styled-components';

// Use CSS variables for better performance
const StyledButton = styled.button`
  background: var(--button-bg, #007bff);
  color: var(--button-color, white);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: var(--button-hover-bg, #0056b3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Use CSS modules for better tree shaking
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
```

### 2. Tailwind CSS Optimization

```typescript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Purge unused styles in production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
    ],
  },
};
```

## 🔧 Build Optimization

### 1. Webpack Configuration

```typescript
// next.config.mjs
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/icons-material', 'lodash', 'react-icons'],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
      
      // Minimize CSS
      config.optimization.minimize = true;
    }
    
    return config;
  },
};
```

### 2. Environment Optimization

```typescript
// Environment-specific optimizations
const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  // Disable React DevTools in production
  reactStrictMode: true,
  
  // Optimize for production
  swcMinify: isProduction,
  
  // Enable source maps only in development
  productionBrowserSourceMaps: false,
  
  // Optimize images
  images: {
    unoptimized: !isProduction,
  },
};
```

## 📊 Performance Monitoring

### 1. Core Web Vitals Monitoring

```typescript
// Performance monitoring with web-vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send metrics to your analytics service
  console.log(metric);
}

// Monitor Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 2. Custom Performance Monitoring

```typescript
// Custom performance monitoring
export const usePerformanceMonitor = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}ms`);
      }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
    
    return () => observer.disconnect();
  }, []);
};

// Performance measurement utility
export const measurePerformance = (name: string, fn: () => void) => {
  performance.mark(`${name}-start`);
  fn();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
};
```

## 🧪 Performance Testing

### 1. Lighthouse Testing

```typescript
// Lighthouse CI configuration
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### 2. Bundle Size Monitoring

```typescript
// Bundle size monitoring
// package.json scripts
{
  "scripts": {
    "analyze": "ANALYZE=true next build",
    "build:analyze": "cross-env ANALYZE=true next build"
  }
}

// next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your existing config
});
```

## 📚 Best Practices

### 1. Component Optimization

```typescript
// Best practices for component optimization
export const OptimizedComponent: React.FC<Props> = memo(({ data, onAction }) => {
  // Use useMemo for expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item));
  }, [data]);

  // Use useCallback for event handlers
  const handleClick = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  // Avoid inline objects and functions
  const styles = useMemo(() => ({
    container: 'p-4 bg-white rounded-lg',
    title: 'text-lg font-semibold',
  }), []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Optimized Component</h2>
      {processedData.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
});
```

### 2. State Management Optimization

```typescript
// Optimized state management
export const useOptimizedState = <T>(initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);
  
  // Memoize state updates
  const updateState = useCallback((updates: Partial<T>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Memoize state selectors
  const selectValue = useCallback((selector: (state: T) => any) => {
    return selector(state);
  }, [state]);
  
  return {
    state,
    updateState,
    selectValue,
  };
};
```

### 3. Network Optimization

```typescript
// Network optimization strategies
export const useOptimizedAPI = () => {
  const queryClient = useQueryClient();
  
  // Prefetch data
  const prefetchData = useCallback((queryKey: string[]) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => api.get(queryKey.join('/')),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);
  
  // Optimistic updates
  const optimisticUpdate = useCallback((queryKey: string[], updater: any) => {
    queryClient.setQueryData(queryKey, updater);
  }, [queryClient]);
  
  return {
    prefetchData,
    optimisticUpdate,
  };
};
```

## 📚 Related Documentation

- **[Custom Hooks](/docs/development/custom-hooks)** - Optimizing custom hooks
- **[Testing Guide](/docs/development/testing)** - Performance testing
- **[API Integration](/docs/fundamentals/api-integration)** - Optimizing API calls
- **[Component Development](/docs/components/custom-components)** - Component optimization

---

Performance optimization is an ongoing process that requires monitoring, testing, and continuous improvement. By following these patterns and best practices, you can create fast, responsive ABP React applications that provide excellent user experiences. 