---
sidebar_position: 5
---

# Admin Interface

ABP React includes a comprehensive admin interface for managing users, tenants, content, and system settings. This guide covers all admin features and their functionality.

## Overview

The admin interface provides a complete management dashboard with:

- **User Management**: Create, edit, and manage user accounts
- **Role Management**: Define and assign user roles and permissions
- **Tenant Management**: Multi-tenant administration and features
- **Content Management (CMS)**: Manage pages, comments, and menus
- **System Settings**: Email configuration and feature management
- **Dashboard**: System overview and quick actions

## Admin Layout

### Layout Structure

The admin interface uses a dedicated layout with sidebar navigation:

```typescript
// src/app/admin/layout.tsx
export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  await setUpLayoutConfig()
  return <AdminLayout>{children}</AdminLayout>
}
```

### Navigation Menu

The admin navigation is configured in `src/config.ts`:

```typescript
export const AdminMenus: Array<{ 
  name: string; 
  link: string; 
  icon: React.ComponentType; 
  submenus?: Array<{ name: string; link: string; icon: React.ComponentType; }>;
}> = [
  {
    name: 'Home',
    link: '/admin',
    icon: Home,
  },
  {
    name: 'Users',
    link: '/admin/users',
    icon: UserRound,
  },
  {
    name: 'Roles',
    link: '/admin/users/roles',
    icon: Users,
  },
  {
    name: 'CMS',
    link: '/admin/cms',
    icon: FileText,
    submenus: [
      {
        name: 'Pages',
        link: '/admin/cms/pages',
        icon: FileText,
      },
      {
        name: 'Menu Items',
        link: '/admin/cms/menus',
        icon: Menu,
      },
      {
        name: 'Comments',
        link: '/admin/cms/comments',
        icon: MessageSquare,
      },
    ],
  },
  {
    name: 'Tenants',
    link: '/admin/tenants',
    icon: Database,
  },
  {
    name: 'Settings',
    link: '/admin/settings',
    icon: Cog,
  },
]
```

## Dashboard

### Main Dashboard Features

The admin dashboard (`/admin`) provides a comprehensive overview:

#### User Profile Section

Displays current user information with authentication status:

```typescript
// Key features displayed:
- User avatar with initials
- Full name and email
- Authentication status badge
- Email and phone verification status
- User roles and permissions
```

#### System Information Cards

- **Multi-tenancy Status**: Shows if multi-tenancy is enabled
- **Current Tenant**: Displays active tenant information
- **Session Information**: Shows active session details

#### Quick Actions

Direct access to common administrative tasks:

- Manage Users
- Manage Roles
- Manage Tenants
- System Settings

#### System Configuration

Detailed system information including:

- Localization settings
- Timing configuration
- Enabled features
- Global configuration details

## User Management

### User List (`/admin/users`)

The user management interface provides comprehensive user administration:

#### Features

- **Search Functionality**: Find users by username, email, or other criteria
- **Pagination**: Handle large user lists efficiently
- **Action Buttons**: Edit, permissions, and delete actions
- **Role Display**: Show user roles and permissions

#### User Actions

```typescript
// Available actions for each user:
{
  icon: 'permission',
  policy: Permissions.USERS_MANAGE_PERMISSIONS,
  callback: () => actions.onPermission(user),
},
{
  icon: 'pencil',
  policy: Permissions.USERS_UPDATE,
  callback: () => actions.onEdit(user),
},
{
  icon: 'trash',
  policy: Permissions.USERS_DELETE,
  visible: !user.userName?.includes('admin'),
  callback: () => actions.onDelete(user),
}
```

#### User Creation

The AddUser component allows creating new users with:

- Basic information (username, email, name)
- Password configuration
- Role assignment
- Account lockout settings
- Email verification requirements

#### User Editing

Edit existing users with:

- Profile information updates
- Password changes
- Role modifications
- Account status changes

#### Permission Management

Assign granular permissions to users:

- View current user permissions
- Modify permission assignments
- Role-based permission inheritance
- Custom permission grants

## Role Management

### Role Administration (`/admin/users/roles`)

Manage user roles and their associated permissions:

#### Role Features

- Create custom roles
- Define role permissions
- Assign roles to users
- Role hierarchy management

#### Permission System

The application uses a comprehensive permission system:

```typescript
// Example permissions structure
export const Permissions = {
  USERS_CREATE: 'Users.Create',
  USERS_UPDATE: 'Users.Update',
  USERS_DELETE: 'Users.Delete',
  USERS_MANAGE_PERMISSIONS: 'Users.ManagePermissions',
  TENANTS_CREATE: 'Tenants.Create',
  TENANTS_UPDATE: 'Tenants.Update',
  TENANTS_DELETE: 'Tenants.Delete',
  TENANTS_MANAGE_FEATURES: 'Tenants.ManageFeatures',
  CMSKIT_PAGES_CREATE: 'CmsKit.Pages.Create',
  CMSKIT_PAGES_UPDATE: 'CmsKit.Pages.Update',
  CMSKIT_PAGES_DELETE: 'CmsKit.Pages.Delete',
}
```

## Tenant Management

### Tenant Administration (`/admin/tenants`)

Multi-tenant management with comprehensive features:

#### Tenant List Features

- **Search and Filter**: Find tenants by name or criteria
- **Tenant Actions**: Edit, manage features, delete
- **Pagination**: Handle large tenant lists
- **Status Monitoring**: Check tenant availability

#### Tenant Management Actions

```typescript
// Available tenant actions:
{
  icon: 'features',
  policy: Permissions.TENANTS_MANAGE_FEATURES,
  callback: () => openFeatureManagement(tenant),
},
{
  icon: 'pencil',
  policy: Permissions.TENANTS_UPDATE,
  callback: () => editTenant(tenant),
},
{
  icon: 'trash',
  policy: Permissions.TENANTS_DELETE,
  callback: () => deleteTenant(tenant),
}
```

#### Tenant Creation

Create new tenants with:

- Tenant name and identifier
- Admin user configuration
- Feature assignments
- Extra properties

#### Feature Management

Configure tenant-specific features:

- Enable/disable features per tenant
- Feature inheritance from host
- Custom feature values
- Feature dependency management

## Content Management System (CMS)

### CMS Dashboard (`/admin/cms`)

The CMS section provides content management capabilities:

#### Available Modules

- **Pages**: Website page management
- **Comments**: User comment moderation
- **Menu Items**: Navigation menu administration

### Page Management (`/admin/cms/pages`)

Manage website pages with:

#### Page Features

- **Page Creation**: Create new website pages
- **Content Editing**: Rich text editing capabilities
- **URL Management**: SEO-friendly URL configuration
- **Meta Data**: Page titles, descriptions, keywords
- **Publishing**: Draft and published states

#### Page Structure

```typescript
// Page data structure
interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaDescription?: string
  isPublished: boolean
  creationTime: Date
  lastModificationTime?: Date
}
```

### Comment Management (`/admin/cms/comments`)

Moderate and manage user comments:

#### Comment Features

- **Comment List**: View all comments across the site
- **Moderation**: Approve, reject, or delete comments
- **Reply Management**: Handle comment threads
- **Author Information**: View comment author details
- **Content Filtering**: Search and filter comments

#### Comment Actions

- Approve/reject comments
- Edit comment content
- Delete inappropriate comments
- Reply to user comments
- Ban/unban users

## System Settings

### Settings Dashboard (`/admin/settings`)

Configure system-wide settings:

#### Email Configuration (`/admin/settings`)

Configure email settings for the application:

```typescript
// Email configuration options:
- SMTP server settings
- Email templates
- Sender information
- Authentication configuration
- Email validation settings
```

#### Feature Management (`/admin/settings/feature-management`)

System-wide feature management:

- **Global Features**: Enable/disable system features
- **Default Values**: Set default feature states
- **Feature Dependencies**: Manage feature relationships
- **Feature Inheritance**: Configure tenant feature inheritance

## Permission System

### Permission-Based Access Control

The admin interface uses comprehensive permission checking:

#### Permission Hooks

```typescript
// Use permission checking in components
const { can } = useGrantedPolicies()

// Check specific permissions
if (can(Permissions.USERS_CREATE)) {
  // Show create user button
}

// Conditional rendering based on permissions
<PermissionWrapper permission="Users.Edit">
  <EditUserButton />
</PermissionWrapper>
```

#### Permission Actions Component

Reusable component for action buttons with permission checking:

```typescript
<PermissionActions
  actions={[
    {
      icon: 'permission',
      policy: Permissions.USERS_MANAGE_PERMISSIONS,
      callback: () => handlePermissionManagement(),
    },
    {
      icon: 'pencil',
      policy: Permissions.USERS_UPDATE,
      callback: () => handleEdit(),
    },
    {
      icon: 'trash',
      policy: Permissions.USERS_DELETE,
      visible: !isSystemUser,
      callback: () => handleDelete(),
    },
  ]}
/>
```

## Data Tables and UI Components

### Custom Table Component

The admin interface uses a custom table component for data display:

#### Table Features

- **Pagination**: Server-side pagination support
- **Sorting**: Column-based sorting
- **Search**: Integrated search functionality
- **Actions**: Row-level action buttons
- **Loading States**: Loading indicators
- **Error Handling**: Error state display

#### Usage Example

```typescript
<CustomTable<UserDto>
  table={table}
  totalCount={data?.totalCount ?? 0}
  pageSize={pagination.pageSize}
/>
```

### Search Component

Reusable search functionality:

```typescript
<Search 
  onUpdate={setSearchStr} 
  value={searchStr}
  placeholder="Search users..."
/>
```

### Dialog Components

Modal dialogs for various operations:

- **User Edit Dialog**: Edit user information
- **Permission Dialog**: Manage user permissions
- **Delete Confirmation**: Confirm delete operations
- **Feature Management**: Configure features

## Security and Access Control

### Route Protection

Admin routes are protected by authentication middleware:

```typescript
// Automatic session validation
export default async function AdminRootLayout({ children }) {
  await setUpLayoutConfig() // Ensures authentication
  return <AdminLayout>{children}</AdminLayout>
}
```

### Permission-Based UI

UI elements are conditionally rendered based on permissions:

```typescript
// Show/hide based on permissions
{can(Permissions.USERS_CREATE) && (
  <Button onClick={handleCreateUser}>
    Create User
  </Button>
)}

// Disable actions based on permissions
<Button 
  disabled={!can(Permissions.USERS_UPDATE)}
  onClick={handleEdit}
>
  Edit
</Button>
```

## API Integration

### Data Fetching

Admin components use React Query for data management:

```typescript
// User management hooks
const { data, isLoading, error } = useUsers(
  pagination.pageIndex,
  pagination.pageSize,
  searchStr
)

// Tenant management hooks
const { data: tenants } = useTenants(pageIndex, pageSize, searchStr)
```

### Mutation Handling

CRUD operations with optimistic updates:

```typescript
const createUserMutation = useMutation({
  mutationFn: (userData) => UserService.createUser(userData),
  onSuccess: () => {
    queryClient.invalidateQueries(['users'])
    toast.success('User created successfully')
  },
  onError: (error) => {
    toast.error('Failed to create user')
  }
})
```

## Customization

### Adding New Admin Pages

Create new admin pages following the established patterns:

```typescript
// 1. Create the page component
export default function NewAdminPage() {
  return (
    <div className="w-full">
      <PageHeader title="New Feature" />
      <NewFeatureList />
    </div>
  )
}

// 2. Add to admin menu configuration
{
  name: 'New Feature',
  link: '/admin/new-feature',
  icon: NewIcon,
}

// 3. Implement permission checking
const { can } = useGrantedPolicies()
if (!can('NewFeature.Manage')) {
  return <AccessDenied />
}
```

### Custom Components

Follow the existing component patterns:

- Use shadcn/ui components for consistency
- Implement permission checking
- Add loading and error states
- Include search and pagination
- Provide user feedback with toasts

## Best Practices

### 1. Permission Checking

Always check permissions before displaying or enabling actions:

```typescript
// Good: Check permissions
{can(Permissions.USERS_DELETE) && (
  <DeleteButton onClick={handleDelete} />
)}

// Bad: No permission check
<DeleteButton onClick={handleDelete} />
```

### 2. Error Handling

Implement comprehensive error handling:

```typescript
const { data, isLoading, error } = useUsers()

if (isLoading) return <Loader />
if (error) return <Error message="Failed to load users" />
if (!data) return <NoData message="No users found" />
```

### 3. User Feedback

Provide clear feedback for user actions:

```typescript
const handleDelete = async () => {
  try {
    await deleteUser(userId)
    toast.success('User deleted successfully')
    queryClient.invalidateQueries(['users'])
  } catch (error) {
    toast.error('Failed to delete user')
  }
}
```

### 4. Data Validation

Validate data before submission:

```typescript
const userSchema = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
})

const form = useForm({
  resolver: zodResolver(userSchema),
})
```

## Troubleshooting

### Common Issues

#### 1. Permission Denied Errors

**Cause**: User lacks required permissions for actions.

**Solution**: 
- Check user roles and permissions
- Verify permission policies are correctly configured
- Ensure ABP backend permissions are properly set up

#### 2. Data Loading Issues

**Cause**: API connection problems or authentication issues.

**Solution**:
- Check network connectivity
- Verify authentication tokens
- Check API endpoint configuration

#### 3. UI Component Errors

**Cause**: Missing props or invalid data structures.

**Solution**:
- Verify component prop requirements
- Check data types and structures
- Add proper error boundaries

## Next Steps

- **[Permissions](/docs/fundamentals/permissions)** - Set up detailed permission management
- **[Multi-tenancy](/docs/fundamentals/multi-tenancy)** - Configure multi-tenant features
- **[API Integration](/docs/fundamentals/api-integration)** - Connect to ABP backend services
- **[Custom Components](/docs/components/custom-components)** - Build custom admin components

---

The admin interface provides a powerful, feature-rich management dashboard that scales with your application needs while maintaining security and usability.