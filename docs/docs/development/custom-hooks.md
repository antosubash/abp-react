---
sidebar_position: 2
---

# Custom Hooks

Custom hooks are a powerful feature in React that allows you to extract and reuse stateful logic between components. In ABP React, custom hooks are extensively used to encapsulate API calls, authentication logic, and other common functionality.

## 🎯 What are Custom Hooks?

Custom hooks are JavaScript functions that:
- Start with the word "use" (React convention)
- Can use other React hooks internally
- Return values, functions, or both
- Can accept parameters
- Follow the same rules as React hooks

## 🏗️ Hook Structure

### Basic Hook Template

```typescript
import { useState, useEffect } from 'react';

export const useCustomHook = (initialValue: any) => {
  // State declarations
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Helper functions
  const updateState = (newValue: any) => {
    setState(newValue);
  };
  
  // Return values and functions
  return {
    state,
    updateState,
  };
};
```

## 🔧 API Hooks

### useApi Hook

A generic hook for making API calls:

```typescript
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface UseApiOptions<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  dependencies?: any[];
  enabled?: boolean;
}

export const useApi = <T>({
  url,
  method = 'GET',
  body,
  dependencies = [],
  enabled = true,
}: UseApiOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.request({
        url,
        method,
        data: body,
      });
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};
```

### useMutation Hook

For handling API mutations (POST, PUT, DELETE):

```typescript
import { useState } from 'react';
import { api } from '@/lib/api';

interface UseMutationOptions<T, R> {
  url: string;
  method?: 'POST' | 'PUT' | 'DELETE';
  onSuccess?: (data: R) => void;
  onError?: (error: Error) => void;
}

export const useMutation = <T, R>({
  url,
  method = 'POST',
  onSuccess,
  onError,
}: UseMutationOptions<T, R>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);

  const mutate = async (body: T) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.request({
        url,
        method,
        data: body,
      });
      
      setData(response.data);
      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error,
    data,
  };
};
```

## 🔐 Authentication Hooks

### useAuth Hook

Manage authentication state:

```typescript
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useAuth = () => {
  const { user, login, logout, refreshToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        await refreshToken();
      } catch (error) {
        // User is not authenticated
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshToken,
  };
};
```

### usePermission Hook

Check user permissions:

```typescript
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const usePermission = (permission: string) => {
  const { user } = useContext(AuthContext);

  return useMemo(() => {
    if (!user || !user.permissions) {
      return false;
    }

    return user.permissions.includes(permission);
  }, [user, permission]);
};
```

### usePermissions Hook

Check multiple permissions at once:

```typescript
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const usePermissions = (permissions: string[]) => {
  const { user } = useContext(AuthContext);

  return useMemo(() => {
    if (!user || !user.permissions) {
      return permissions.reduce((acc, permission) => {
        acc[permission] = false;
        return acc;
      }, {} as Record<string, boolean>);
    }

    return permissions.reduce((acc, permission) => {
      acc[permission] = user.permissions.includes(permission);
      return acc;
    }, {} as Record<string, boolean>);
  }, [user, permissions]);
};
```

## 📊 Data Management Hooks

### useLocalStorage Hook

Persist data in localStorage:

```typescript
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
```

### useDebounce Hook

Debounce values for search inputs:

```typescript
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

### usePrevious Hook

Track previous values:

```typescript
import { useRef, useEffect } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};
```

## 🎨 UI Hooks

### useMediaQuery Hook

Respond to media queries:

```typescript
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
```

### useClickOutside Hook

Detect clicks outside an element:

```typescript
import { useEffect, RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
```

### useScrollPosition Hook

Track scroll position:

```typescript
import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};
```

## 🔄 State Management Hooks

### useReducer Hook

Complex state management:

```typescript
import { useReducer, useCallback } from 'react';

interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

type FormAction =
  | { type: 'SET_VALUE'; field: string; value: any }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SET_TOUCHED'; field: string }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.isSubmitting };
    case 'RESET':
      return {
        values: {},
        errors: {},
        touched: {},
        isSubmitting: false,
      };
    default:
      return state;
  }
};

export const useForm = (initialValues: Record<string, any> = {}) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const setValue = useCallback((field: string, value: any) => {
    dispatch({ type: 'SET_VALUE', field, value });
  }, []);

  const setError = useCallback((field: string, error: string) => {
    dispatch({ type: 'SET_ERROR', field, error });
  }, []);

  const setTouched = useCallback((field: string) => {
    dispatch({ type: 'SET_TOUCHED', field });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    ...state,
    setValue,
    setError,
    setTouched,
    setSubmitting,
    reset,
  };
};
```

## 🧪 Testing Hooks

### Testing Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(1));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });
});
```

## 📝 Best Practices

### 1. Naming Conventions

- Always start with "use"
- Use descriptive names
- Follow camelCase

```typescript
// Good
export const useUserProfile = () => { /* ... */ };
export const useApiCall = () => { /* ... */ };

// Avoid
export const getUserProfile = () => { /* ... */ };
export const apiCall = () => { /* ... */ };
```

### 2. Return Values

- Return objects for multiple values
- Use consistent return types
- Document return values

```typescript
// Good
export const useUser = (id: string) => {
  // ... implementation
  return {
    user,
    loading,
    error,
    refetch,
  };
};

// Avoid
export const useUser = (id: string) => {
  // ... implementation
  return [user, loading, error, refetch]; // Array is less clear
};
```

### 3. Error Handling

```typescript
export const useApiWithError = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchData };
};
```

### 4. Dependencies

- Include all dependencies in useEffect
- Use useCallback for functions passed as props
- Use useMemo for expensive calculations

```typescript
export const useExpensiveCalculation = (data: any[]) => {
  const result = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);

  const handleClick = useCallback(() => {
    console.log('Result:', result);
  }, [result]);

  return { result, handleClick };
};
```

## 📚 Related Documentation

- **[API Integration](/docs/fundamentals/api-integration)** - Using hooks with API calls
- **[Authentication](/docs/fundamentals/authentication)** - Authentication hooks
- **[Testing Guide](/docs/development/testing)** - Testing custom hooks
- **[Performance Optimization](/docs/development/performance)** - Optimizing hook performance

---

Custom hooks are a fundamental part of ABP React's architecture, providing reusable logic across components. By following these patterns and best practices, you can create maintainable and efficient custom hooks that enhance your application's functionality. 