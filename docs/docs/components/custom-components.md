---
sidebar_position: 2
---

# Custom Components

Custom components are the building blocks of your ABP React application. This guide covers how to create, use, and maintain custom components that integrate seamlessly with the ABP Framework.

## 🎯 Component Architecture

### Component Types

ABP React supports several types of components:

- **UI Components**: Reusable interface elements
- **Container Components**: Business logic and data management
- **Layout Components**: Page structure and navigation
- **Form Components**: Data input and validation
- **Admin Components**: ABP-specific functionality

### Component Structure

```typescript
// Basic component structure
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props interface
  className?: string;
  children?: React.ReactNode;
}

export const CustomComponent: React.FC<ComponentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('base-styles', className)} {...props}>
      {children}
    </div>
  );
};
```

## 🏗️ Creating Custom Components

### 1. Component Template

```typescript
// src/components/custom/UserCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface UserCardProps {
  user: User;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  className,
}) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{user.role}</span>
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(user.id)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### 2. Component with ABP Integration

```typescript
// src/components/admin/UserManagement.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePermission } from '@/hooks/usePermission';
import { userService } from '@/services/userService';
import { UserCard } from '@/components/custom/UserCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const canCreate = usePermission('UserManagement.Create');
  const canEdit = usePermission('UserManagement.Update');
  const canDelete = usePermission('UserManagement.Delete');

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleEdit = (userId: string) => {
    // Navigate to edit page or open modal
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(userId);
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        {canCreate && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={canEdit ? handleEdit : undefined}
            onDelete={canDelete ? handleDelete : undefined}
          />
        ))}
      </div>
    </div>
  );
};
```

## 🎨 Styling Components

### 1. Tailwind CSS Classes

```typescript
// Using Tailwind CSS for styling
export const StyledComponent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Component Title
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Component content goes here.
      </p>
    </div>
  );
};
```

### 2. CSS Modules

```css
/* Component.module.css */
.container {
  background: var(--background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.container:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--foreground);
}

.content {
  color: var(--muted-foreground);
  line-height: 1.6;
}
```

```typescript
// Using CSS modules
import styles from './Component.module.css';

export const CSSModuleComponent: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Component Title</h2>
      <p className={styles.content}>Component content goes here.</p>
    </div>
  );
};
```

### 3. Styled Components

```typescript
// Using styled-components
import styled from 'styled-components';

const StyledContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StyledTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground};
`;

export const StyledComponent: React.FC = () => {
  return (
    <StyledContainer>
      <StyledTitle>Component Title</StyledTitle>
      <p>Component content goes here.</p>
    </StyledContainer>
  );
};
```

## 🔧 Component Composition

### 1. Compound Components

```typescript
// Compound component pattern
interface DataTableProps {
  children: React.ReactNode;
  className?: string;
}

interface DataTableHeaderProps {
  children: React.ReactNode;
}

interface DataTableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DataTable: React.FC<DataTableProps> & {
  Header: React.FC<DataTableHeaderProps>;
  Row: React.FC<DataTableRowProps>;
} = ({ children, className }) => {
  return (
    <div className={cn('border rounded-lg', className)}>
      {children}
    </div>
  );
};

DataTable.Header = ({ children }) => (
  <div className="bg-gray-50 px-4 py-3 border-b font-medium">
    {children}
  </div>
);

DataTable.Row = ({ children, onClick }) => (
  <div
    className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
    onClick={onClick}
  >
    {children}
  </div>
);

// Usage
export const UserTable: React.FC = () => {
  return (
    <DataTable>
      <DataTable.Header>
        <div className="grid grid-cols-3 gap-4">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>
      </DataTable.Header>
      {users.map(user => (
        <DataTable.Row key={user.id} onClick={() => handleUserClick(user)}>
          <div className="grid grid-cols-3 gap-4">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
          </div>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
```

### 2. Render Props Pattern

```typescript
// Render props pattern
interface DataFetcherProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  children: (data: T | undefined, loading: boolean, error: Error | null) => React.ReactNode;
}

export const DataFetcher = <T,>({
  queryKey,
  queryFn,
  children,
}: DataFetcherProps<T>) => {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });

  return <>{children(data, isLoading, error)}</>;
};

// Usage
export const UserList: React.FC = () => {
  return (
    <DataFetcher
      queryKey={['users']}
      queryFn={userService.getUsers}
    >
      {(users, loading, error) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        if (!users) return <div>No users found</div>;

        return (
          <div className="grid gap-4">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        );
      }}
    </DataFetcher>
  );
};
```

## 🔄 State Management in Components

### 1. Local State

```typescript
// Component with local state
export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={decrement}>-</Button>
      <span className="text-xl font-semibold">{count}</span>
      <Button onClick={increment}>+</Button>
      <Button variant="outline" onClick={reset}>Reset</Button>
    </div>
  );
};
```

### 2. Context State

```typescript
// Using context for shared state
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Usage in component
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
    </Button>
  );
};
```

## 📝 Form Components

### 1. Controlled Form Component

```typescript
// Controlled form component
interface FormData {
  name: string;
  email: string;
  role: string;
}

export const UserForm: React.FC<{
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
}> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || 'User',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          className={cn(
            'w-full px-3 py-2 border rounded-md',
            errors.name ? 'border-red-500' : 'border-gray-300'
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          className={cn(
            'w-full px-3 py-2 border rounded-md',
            errors.email ? 'border-red-500' : 'border-gray-300'
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1">
          Role
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={e => handleChange('role', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};
```

## 🧪 Testing Custom Components

### 1. Component Testing

```typescript
// UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(onEdit).toHaveBeenCalledWith(mockUser.id);
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<UserCard user={mockUser} onDelete={onDelete} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    
    expect(onDelete).toHaveBeenCalledWith(mockUser.id);
  });

  it('does not show edit button when onEdit is not provided', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  });
});
```

### 2. Integration Testing

```typescript
// UserManagement.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { UserManagement } from './UserManagement';
import { userService } from '@/services/userService';

vi.mock('@/services/userService');
vi.mock('@/hooks/usePermission', () => ({
  usePermission: (permission: string) => {
    const permissions = {
      'UserManagement.Create': true,
      'UserManagement.Update': true,
      'UserManagement.Delete': true,
    };
    return permissions[permission] || false;
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('UserManagement', () => {
  it('renders users from API', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ];

    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);

    render(
      <TestWrapper>
        <UserManagement />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
```

## 📚 Best Practices

### 1. Component Organization

```
components/
├── ui/                    # Base UI components
├── forms/                 # Form components
├── layout/                # Layout components
├── admin/                 # Admin-specific components
└── custom/                # Custom business components
```

### 2. Props Interface

```typescript
// Always define clear props interfaces
interface ComponentProps {
  // Required props
  title: string;
  data: DataType[];
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  
  // Event handlers
  onAction?: (id: string) => void;
  
  // Styling
  className?: string;
  
  // Children
  children?: React.ReactNode;
}
```

### 3. Error Boundaries

```typescript
// Error boundary for custom components
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <h3 className="text-red-800 font-medium">Something went wrong</h3>
          <p className="text-red-600 text-sm">
            This component encountered an error and cannot be displayed.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 📚 Related Documentation

- **[UI Components](/docs/components/ui-components)** - Base UI component library
- **[Form Validation](/docs/components/forms)** - Form handling and validation
- **[API Integration](/docs/fundamentals/api-integration)** - Integrating with ABP APIs
- **[Testing Guide](/docs/development/testing)** - Testing custom components

---

Custom components are the foundation of your ABP React application. By following these patterns and best practices, you can create maintainable, reusable, and well-tested components that integrate seamlessly with the ABP Framework. 