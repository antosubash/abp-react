# Enhanced Permission Dialog

This directory contains the enhanced permission management components with improved UX, better visual design, and advanced functionality.

## Components

### EnhancedPermissionDialog

The main enhanced permission dialog component that replaces the old `RolePermission` and `UserPermission` components.

**Features:**

- **Modern UI Design**: Clean, card-based layout with better visual hierarchy
- **Search Functionality**: Search permissions by name or display name
- **Tabbed Navigation**: Organized permission groups with tabbed interface
- **Visual Feedback**: Icons, badges, and color-coded status indicators
- **Change Tracking**: Track all permission changes with undo functionality
- **Loading States**: Proper loading indicators and error handling
- **Responsive Design**: Works well on desktop and mobile devices
- **Accessibility**: Better ARIA labels and keyboard navigation

**Usage:**

```tsx
import { EnhancedPermissionDialog } from '@/components/permission'

// For roles
<EnhancedPermissionDialog
  entity={roleDto}
  entityType="role"
  onDismiss={() => setShowDialog(false)}
/>

// For users
<EnhancedPermissionDialog
  entity={userDto}
  entityType="user"
  onDismiss={() => setShowDialog(false)}
/>
```

### PermissionToggle

Enhanced permission toggle component with multiple variants.

**Variants:**

- `default`: Standard toggle with icon
- `compact`: Minimal toggle for dense layouts
- `detailed`: Full-featured toggle with description and badge

**Usage:**

```tsx
import { Permission } from '@/components/permission'

;<Permission
  name="Create Users"
  id="users.create"
  isGranted={true}
  onUpdate={() => handlePermissionChange()}
  variant="detailed"
  description="Allow creating new user accounts"
  showIcon={true}
/>
```

### PermissionChangeHistory

Component to display permission change history and statistics.

**Features:**

- Change statistics (granted, revoked, total)
- Recent changes list with timestamps
- Undo and reset functionality
- Visual indicators for change types

**Usage:**

```tsx
import { PermissionChangeHistory } from '@/components/permission'

;<PermissionChangeHistory
  changes={changes}
  onUndo={handleUndo}
  onReset={handleReset}
  canUndo={changes.length > 0}
  canReset={hasChanges}
/>
```

## Hooks

### useEnhancedPermissionChanges

Enhanced hook for managing permission changes with advanced features.

**Features:**

- Change tracking with timestamps
- Undo functionality
- Change statistics
- Unsaved changes detection
- Reset to original state

**Usage:**

```tsx
import { useEnhancedPermissionChanges } from '@/components/permission'

const {
  hasAllSelected,
  data,
  changes,
  hasUnsavedChanges,
  onCurrentPermissionChanges,
  onHasAllSelectedUpdate,
  resetToOriginal,
  undoLastChange,
  getChangeStats,
} = useEnhancedPermissionChanges({
  permissions: permissionList,
  type: 'identity',
})
```

## Key Improvements

### 1. Visual Design

- **Modern Card Layout**: Clean, organized interface with proper spacing
- **Color-Coded Status**: Green for granted, red for revoked, gray for neutral
- **Icons**: Contextual icons for different permission types
- **Badges**: Visual indicators for permission counts and status

### 2. User Experience

- **Search**: Find permissions quickly with real-time search
- **Tabs**: Organized navigation between permission groups
- **Visual Feedback**: Immediate feedback for all actions
- **Loading States**: Clear loading indicators and error messages

### 3. Functionality

- **Change Tracking**: Complete history of all permission changes
- **Undo/Reset**: Ability to undo changes or reset to original state
- **Bulk Operations**: Grant/revoke all permissions at once
- **Validation**: Proper validation and error handling

### 4. Accessibility

- **ARIA Labels**: Proper accessibility labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Screen Reader Support**: Descriptive text and status announcements

### 5. Performance

- **Optimized Rendering**: Efficient re-rendering with proper memoization
- **Lazy Loading**: Load permission data on demand
- **Debounced Search**: Efficient search with debouncing
- **Virtual Scrolling**: Handle large permission lists efficiently

## Migration Guide

### From Old Components

**Before:**

```tsx
import { RolePermission } from '@/components/role/RolePermission'

;<RolePermission roleDto={role} onDismiss={onClose} />
```

**After:**

```tsx
import { EnhancedPermissionDialog } from '@/components/permission'

;<EnhancedPermissionDialog entity={role} entityType="role" onDismiss={onClose} />
```

### Breaking Changes

1. **Props Interface**: The component now uses a unified interface for both roles and users
2. **Event Handling**: Improved event handling with better error management
3. **State Management**: More robust state management with change tracking

## Styling

The components use Tailwind CSS classes and follow the design system. Custom styling can be applied through:

- CSS classes via `className` prop
- Tailwind utility classes
- CSS custom properties for theming

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ with polyfills
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Large permission lists are handled efficiently with virtualization
- Search is debounced to prevent excessive API calls
- Components are memoized to prevent unnecessary re-renders
- Change tracking is optimized for memory usage
