---
sidebar_position: 4
---

# Multi-tenancy

## Overview

ABP React implements a comprehensive multi-tenancy system that allows the application to serve multiple tenants while maintaining data isolation and tenant-specific configurations.

## Tenant Resolution

### Host-based Resolution

The application resolves tenants based on the host header:

```typescript
export async function GET() {
  const session = await getSession()
  const host = (await headers()).get('host')

  if (session.tenantId) {
    return
  }

  try {
    const { data } = await tenantGetTenantGuid({ query: { host: host! } })
    session.tenantId = data ?? 'default'
  } catch (error) {
    session.tenantId = 'default'
  }

  await session.save()
  redirect('/')
}
```

## Tenant Management

### Tenant List Component

The application provides a tenant management interface:

```typescript
export const TenantList = () => {
  // ... tenant list implementation
  const defaultColumns: ColumnDef<TenantDto>[] = [
    {
      header: 'Tenant Management',
      columns: [
        {
          accessorKey: 'actions',
          header: 'Actions',
          cell: (info) => {
            return (
              <PermissionActions
                actions={[
                  {
                    icon: 'features',
                    policy: 'AbpTenantManagement.Tenants.ManageFeatures',
                    callback: () => {
                      // ... feature management
                    },
                  },
                  {
                    icon: 'pencil',
                    policy: 'AbpTenantManagement.Tenants.Update',
                    callback: () => {
                      // ... tenant update
                    },
                  },
                ]}
              />
            )
          },
        },
      ],
    },
  ]
}
```

## API Integration

### Tenant Context in Requests

The tenant context is automatically included in API requests:

```typescript
APIClient.interceptors.request.use(async (options) => {
  const session = await getSession()
  options.headers.set('__tenant', session.tenantId ?? '')
  return options
})
```

## Tenant Features

### Feature Management

Tenants can have specific features enabled/disabled:

```typescript
interface TenantExtraProperties {
  features?: {
    [key: string]: boolean
  }
}
```

### Tenant Settings

Each tenant can have its own configuration:

- Custom domain
- Feature flags
- Connection strings
- Custom settings

## Tenant Operations

### Creating Tenants

```typescript
const tenantCreate = async (data: TenantCreateDto) => {
  return await APIClient.post('/api/multi-tenancy/tenants', data)
}
```

### Updating Tenants

```typescript
const tenantUpdate = async (id: string, data: TenantUpdateDto) => {
  return await APIClient.put(`/api/multi-tenancy/tenants/${id}`, data)
}
```

### Deleting Tenants

```typescript
const tenantDelete = async (id: string) => {
  return await APIClient.delete(`/api/multi-tenancy/tenants/${id}`)
}
```

## Best Practices

1. **Tenant Isolation**
   - Maintain strict data separation
   - Validate tenant context
   - Handle cross-tenant operations carefully

2. **Performance**
   - Cache tenant information
   - Optimize tenant resolution
   - Minimize tenant-specific operations

3. **Security**
   - Validate tenant access
   - Implement proper authorization
   - Secure tenant-specific data

## Environment Configuration

Required environment variables:

- `NEXT_PUBLIC_API_URL`: API endpoint for tenant operations
- `NEXT_PUBLIC_APP_URL`: Application base URL

## Related Components

- [Authentication](/docs/fundamentals/authentication)
- [Session Management](/docs/fundamentals/session-management)
- [Middleware](/docs/fundamentals/middleware) 