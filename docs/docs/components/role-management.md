# Role Management

This guide covers role management in ABP React applications, including role-based access control (RBAC), role management components, and integration with ABP Framework permissions.

## Overview

Role management is a crucial aspect of ABP React applications, providing a structured way to organize permissions and control access to different parts of the application. ABP React integrates seamlessly with ABP Framework's role management system.

## Core Concepts

### Roles vs Permissions

- **Roles**: Collections of permissions that can be assigned to users
- **Permissions**: Granular access rights to specific features or resources
- **Role Hierarchy**: Roles can inherit permissions from other roles
- **Dynamic Permissions**: Permissions can be granted or revoked at runtime

### ABP Framework Integration

ABP React leverages ABP Framework's role management system:

```typescript
interface Role {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  permissions: Permission[];
}
```

## Role Management Components

### Role List Component

```typescript
import React, { useState } from 'react';
import { useRoles } from '@/hooks/useRoles';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RoleList: React.FC = () => {
  const { roles, isLoading, error } = useRoles();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  if (isLoading) return <div>Loading roles...</div>;
  if (error) return <div>Error loading roles: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Roles</h2>
        <Button onClick={() => setSelectedRole({} as Role)}>
          Create New Role
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Display Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.displayName}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>{role.isDefault ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRole(role)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
```

### Role Form Component

```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { usePermissions } from '@/hooks/usePermissions';
import { useCreateRole, useUpdateRole } from '@/hooks/useRoles';

const roleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  description: z.string().optional(),
  isDefault: z.boolean(),
  isPublic: z.boolean(),
  permissions: z.array(z.string()),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormProps {
  role?: Role;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ role, onSuccess, onCancel }) => {
  const { permissions } = usePermissions();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || '',
      displayName: role?.displayName || '',
      description: role?.description || '',
      isDefault: role?.isDefault || false,
      isPublic: role?.isPublic || false,
      permissions: role?.permissions.map(p => p.name) || [],
    },
  });

  const onSubmit = async (data: RoleFormData) => {
    try {
      if (role) {
        await updateRole.mutateAsync({ id: role.id, ...data });
      } else {
        await createRole.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          {...form.register('name')}
          placeholder="Enter role name"
        />
        {form.formState.errors.name && (
          <span className="text-red-500">{form.formState.errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="displayName">Display Name</label>
        <Input
          id="displayName"
          {...form.register('displayName')}
          placeholder="Enter display name"
        />
        {form.formState.errors.displayName && (
          <span className="text-red-500">{form.formState.errors.displayName.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          {...form.register('description')}
          placeholder="Enter role description"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isDefault"
            {...form.register('isDefault')}
          />
          <label htmlFor="isDefault">Default Role</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPublic"
            {...form.register('isPublic')}
          />
          <label htmlFor="isPublic">Public Role</label>
        </div>
      </div>

      <div>
        <label>Permissions</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {permissions.map((permission) => (
            <div key={permission.name} className="flex items-center space-x-2">
              <Checkbox
                id={permission.name}
                checked={form.watch('permissions').includes(permission.name)}
                onCheckedChange={(checked) => {
                  const currentPermissions = form.watch('permissions');
                  if (checked) {
                    form.setValue('permissions', [...currentPermissions, permission.name]);
                  } else {
                    form.setValue('permissions', currentPermissions.filter(p => p !== permission.name));
                  }
                }}
              />
              <label htmlFor={permission.name}>{permission.displayName}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button type="submit" disabled={createRole.isLoading || updateRole.isLoading}>
          {role ? 'Update Role' : 'Create Role'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
```

### Permission Management Component

```typescript
import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { useUpdateRolePermissions } from '@/hooks/useRoles';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface PermissionManagementProps {
  roleId: string;
  currentPermissions: string[];
  onPermissionsUpdated?: () => void;
}

const PermissionManagement: React.FC<PermissionManagementProps> = ({
  roleId,
  currentPermissions,
  onPermissionsUpdated,
}) => {
  const { permissions } = usePermissions();
  const updatePermissions = useUpdateRolePermissions();

  const handlePermissionToggle = async (permissionName: string, checked: boolean) => {
    try {
      const newPermissions = checked
        ? [...currentPermissions, permissionName]
        : currentPermissions.filter(p => p !== permissionName);

      await updatePermissions.mutateAsync({
        roleId,
        permissions: newPermissions,
      });

      onPermissionsUpdated?.();
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Manage Permissions</h3>
      <div className="grid grid-cols-2 gap-4">
        {permissions.map((permission) => (
          <div key={permission.name} className="flex items-center space-x-2">
            <Checkbox
              id={permission.name}
              checked={currentPermissions.includes(permission.name)}
              onCheckedChange={(checked) => handlePermissionToggle(permission.name, checked)}
            />
            <label htmlFor={permission.name} className="text-sm">
              {permission.displayName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Role Management Hooks

### useRoles Hook

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@/hooks/useApi';

export const useRoles = () => {
  const { get, post, put, delete: del } = useApi();

  const {
    data: roles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: () => get('/api/identity/roles'),
  });

  return { roles, isLoading, error };
};

export const useCreateRole = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleData: CreateRoleDto) => post('/api/identity/roles', roleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRole = () => {
  const { put } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...roleData }: UpdateRoleDto) => 
      put(`/api/identity/roles/${id}`, roleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useDeleteRole = () => {
  const { delete: del } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => del(`/api/identity/roles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
```

### useRolePermissions Hook

```typescript
export const useRolePermissions = (roleId: string) => {
  const { get, put } = useApi();
  const queryClient = useQueryClient();

  const {
    data: permissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['role-permissions', roleId],
    queryFn: () => get(`/api/identity/roles/${roleId}/permissions`),
    enabled: !!roleId,
  });

  const updatePermissions = useMutation({
    mutationFn: ({ roleId, permissions }: { roleId: string; permissions: string[] }) =>
      put(`/api/identity/roles/${roleId}/permissions`, { permissions }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role-permissions', roleId] });
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });

  return { permissions, isLoading, error, updatePermissions };
};
```

## Role-Based UI Components

### Conditional Rendering

```typescript
import { usePermission } from '@/hooks/usePermission';

const ConditionalComponent: React.FC = () => {
  const canEditUsers = usePermission('AbpIdentity.Users');
  const canDeleteUsers = usePermission('AbpIdentity.Users.Delete');

  return (
    <div>
      {canEditUsers && (
        <Button>Edit User</Button>
      )}
      {canDeleteUsers && (
        <Button variant="destructive">Delete User</Button>
      )}
    </div>
  );
};
```

### Protected Routes

```typescript
import { usePermission } from '@/hooks/usePermission';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  fallback,
}) => {
  const hasPermission = usePermission(permission);

  if (!hasPermission) {
    return fallback || <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

### Role-Based Navigation

```typescript
import { usePermissions } from '@/hooks/usePermissions';

const Navigation: React.FC = () => {
  const { permissions } = usePermissions();

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      permission: null, // No permission required
    },
    {
      label: 'Users',
      path: '/users',
      permission: 'AbpIdentity.Users',
    },
    {
      label: 'Roles',
      path: '/roles',
      permission: 'AbpIdentity.Roles',
    },
    {
      label: 'Settings',
      path: '/settings',
      permission: 'AbpSettingManagement.Settings',
    },
  ];

  const visibleItems = menuItems.filter(item => 
    !item.permission || permissions.some(p => p.name === item.permission)
  );

  return (
    <nav>
      {visibleItems.map((item) => (
        <Link key={item.path} to={item.path}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
```

## Advanced Role Management

### Role Hierarchy

```typescript
interface RoleHierarchy {
  parentRole: string;
  childRoles: string[];
}

const RoleHierarchyComponent: React.FC = () => {
  const { roles } = useRoles();
  const [hierarchy, setHierarchy] = useState<RoleHierarchy[]>([]);

  const addChildRole = (parentRole: string, childRole: string) => {
    setHierarchy(prev => {
      const existing = prev.find(h => h.parentRole === parentRole);
      if (existing) {
        return prev.map(h => 
          h.parentRole === parentRole 
            ? { ...h, childRoles: [...h.childRoles, childRole] }
            : h
        );
      }
      return [...prev, { parentRole, childRoles: [childRole] }];
    });
  };

  return (
    <div>
      <h3>Role Hierarchy</h3>
      {hierarchy.map((h) => (
        <div key={h.parentRole}>
          <strong>{h.parentRole}</strong>
          <ul>
            {h.childRoles.map((child) => (
              <li key={child}>{child}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
```

### Dynamic Role Assignment

```typescript
const DynamicRoleAssignment: React.FC = () => {
  const { roles } = useRoles();
  const { users } = useUsers();
  const assignRole = useAssignRole();

  const handleRoleAssignment = async (userId: string, roleId: string, assign: boolean) => {
    try {
      if (assign) {
        await assignRole.mutateAsync({ userId, roleId });
      } else {
        await unassignRole.mutateAsync({ userId, roleId });
      }
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  return (
    <div>
      <h3>Dynamic Role Assignment</h3>
      {users.map((user) => (
        <div key={user.id}>
          <h4>{user.userName}</h4>
          {roles.map((role) => (
            <div key={role.id}>
              <Checkbox
                checked={user.roles?.some(r => r.id === role.id)}
                onCheckedChange={(checked) => 
                  handleRoleAssignment(user.id, role.id, checked)
                }
              />
              <label>{role.displayName}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
```

## Testing Role Management

### Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoleList } from './RoleList';

describe('RoleList', () => {
  it('should display roles', () => {
    const mockRoles = [
      { id: '1', name: 'admin', displayName: 'Administrator' },
      { id: '2', name: 'user', displayName: 'User' },
    ];

    render(<RoleList roles={mockRoles} />);

    expect(screen.getByText('Administrator')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('should handle role creation', () => {
    const onCreateRole = vi.fn();
    render(<RoleList onCreateRole={onCreateRole} />);

    fireEvent.click(screen.getByText('Create New Role'));
    expect(onCreateRole).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RoleForm } from './RoleForm';

describe('RoleForm Integration', () => {
  it('should create a new role', async () => {
    const onSuccess = vi.fn();
    render(<RoleForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'test-role' },
    });
    fireEvent.change(screen.getByLabelText('Display Name'), {
      target: { value: 'Test Role' },
    });

    fireEvent.click(screen.getByText('Create Role'));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
```

## Best Practices

### 1. Role Design

- Use descriptive role names
- Keep roles focused and specific
- Avoid role proliferation
- Document role purposes

### 2. Permission Management

- Grant minimum required permissions
- Regular permission audits
- Use permission groups
- Implement permission inheritance

### 3. Security

- Validate permissions server-side
- Use ABP Framework's built-in security
- Implement proper error handling
- Log permission changes

### 4. Performance

- Cache role and permission data
- Optimize permission checks
- Use lazy loading for large role lists
- Implement efficient permission queries

### 5. User Experience

- Provide clear permission feedback
- Show permission requirements
- Implement progressive disclosure
- Use intuitive permission names

## Conclusion

Role management is essential for building secure and scalable ABP React applications. By leveraging ABP Framework's role management system and implementing proper UI components, you can create a robust role-based access control system.

Key takeaways:
- Use ABP Framework's role management APIs
- Implement proper permission checking
- Create reusable role management components
- Follow security best practices
- Test role management thoroughly

For more information on permissions and access control, see the [Permissions](/abp-react/docs/fundamentals/permissions) documentation. 