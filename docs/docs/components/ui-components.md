---
sidebar_position: 1
---

# UI Components

## Overview

ABP React provides a comprehensive set of UI components built on top of Radix UI and styled with Tailwind CSS. These components are designed to be accessible, customizable, and consistent with the ABP design system.

## Core Components

### Custom Table

A flexible table component with sorting, filtering, and pagination:

```typescript
import { CustomTable } from '@/components/ui/CustomTable'

// Usage
<CustomTable
  columns={columns}
  data={data}
  pagination={pagination}
  onPaginationChange={handlePaginationChange}
/>
```

### Search Component

A search input with debouncing and clear functionality:

```typescript
import { Search } from '@/components/ui/Search'

// Usage
<Search
  placeholder="Search..."
  onSearch={handleSearch}
  debounceTime={300}
/>
```

### Error Component

A standardized error display component:

```typescript
import Error from '@/components/ui/Error'

// Usage
<Error
  message="An error occurred"
  retry={handleRetry}
/>
```

### Loader Component

A loading indicator component:

```typescript
import Loader from '@/components/ui/Loader'

// Usage
<Loader />
```

## Form Components

### Input Components

- Text inputs
- Number inputs
- Date pickers
- Select dropdowns
- Checkboxes
- Radio buttons

### Form Validation

Components integrate with React Hook Form and Zod for validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

## Layout Components

### Admin Layout

A layout component for admin pages:

```typescript
import AdminLayout from '@/layout/admin-layout'

// Usage
export default function AdminPage() {
  return (
    <AdminLayout>
      {/* Page content */}
    </AdminLayout>
  )
}
```

### Navigation Components

- Navbar
- Sidebar
- Breadcrumbs
- Tabs

## Theme Support

Components support both light and dark themes:

```typescript
import { ThemeProvider } from 'next-themes'

// Usage
<ThemeProvider attribute="class" defaultTheme="system">
  {/* App content */}
</ThemeProvider>
```

## Accessibility

All components are built with accessibility in mind:

- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## Customization

Components can be customized using Tailwind CSS:

```typescript
const customStyles = {
  button: 'bg-primary hover:bg-primary-dark text-white',
  input: 'border-gray-300 focus:border-primary',
}
```

## Best Practices

1. **Component Usage**
   - Use semantic HTML
   - Maintain consistent spacing
   - Follow accessibility guidelines

2. **Performance**
   - Lazy load components when possible
   - Optimize re-renders
   - Use proper memoization

3. **Styling**
   - Use Tailwind utility classes
   - Maintain consistent theming
   - Follow design system guidelines

## Related Components

- [Authentication](/docs/fundamentals/authentication)
- [Session Management](/docs/fundamentals/session-management)
- [Multi-tenancy](/docs/fundamentals/multi-tenancy)
