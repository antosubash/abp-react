---
sidebar_position: 8
---

# Frequently Asked Questions (FAQ)

Get answers to the most commonly asked questions about ABP React.

## 🚀 Getting Started

### What is ABP React?

ABP React is a modern, high-performance React frontend template for ABP Framework applications. It provides a complete UI solution with authentication, user management, multi-tenancy, and more, built with Next.js, TypeScript, and Tailwind CSS.

### How is ABP React different from the default Angular UI?

ABP React offers several advantages over the default Angular UI:

- **Better Performance**: Built with Next.js for optimal performance and SEO
- **Modern Stack**: Uses the latest React ecosystem tools and practices
- **Better DX**: Superior developer experience with TypeScript and modern tooling
- **Smaller Bundle**: More efficient code splitting and tree shaking
- **SEO Optimized**: Server-side rendering capabilities

### Do I need to know ABP Framework to use ABP React?

While basic ABP Framework knowledge is helpful, ABP React is designed to be accessible to React developers. The template handles most ABP integrations automatically, and our documentation covers the ABP-specific concepts you need to know.

### Is ABP React production-ready?

Yes, ABP React is production-ready and is actively used in production applications. It includes comprehensive testing, CI/CD pipelines, and follows industry best practices.

## 🛠️ Installation & Setup

### What are the system requirements?

- **Node.js**: 18.0 or higher
- **pnpm**: 8.0 or higher (recommended package manager)
- **.NET 8 SDK**: For backend development
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Why use pnpm instead of npm or yarn?

We recommend pnpm because it's:
- **Faster**: More efficient installation and caching
- **Smaller**: Reduces disk space usage with symlinks
- **Stricter**: Better dependency resolution and security
- **Compatible**: Works with all npm packages

### Can I use npm or yarn instead of pnpm?

Yes, you can use npm or yarn, but you may need to:
- Delete `pnpm-lock.yaml`
- Update scripts in `package.json`
- Handle potential dependency resolution differences

### How do I update to the latest version?

For template updates:
```bash
# Check current version
npm list -g Anto.Abp.React.Template

# Update template
dotnet new uninstall Anto.Abp.React.Template
dotnet new install Anto.Abp.React.Template

# Create new project with latest template
dotnet new abp-react -o my-updated-project
```

For project dependencies:
```bash
# Update all dependencies
pnpm update

# Update specific dependency
pnpm update @next/bundle-analyzer
```

## 🔐 Authentication & Security

### How does authentication work?

ABP React uses NextAuth.js for authentication, integrated with ABP Framework's authentication system:

1. **JWT Tokens**: Secure token-based authentication
2. **Session Management**: Automatic session handling and refresh
3. **Multiple Providers**: Support for credentials, OAuth, and more
4. **Role-Based Access**: Integration with ABP's permission system

### Can I use social login providers?

Yes, ABP React supports multiple authentication providers:
- Google OAuth
- GitHub OAuth
- Microsoft OAuth
- Facebook OAuth
- Custom OAuth providers

Configure them in your environment variables and NextAuth configuration.

### How do I handle permissions?

ABP React includes built-in permission handling:

```typescript
// Check permissions in components
const { hasPermission } = usePermissions();

if (!hasPermission('Users.Create')) {
  return <div>Access denied</div>;
}

// Use permission wrapper
<PermissionWrapper permission="Users.Edit">
  <EditUserButton />
</PermissionWrapper>
```

### Is the application secure?

Yes, ABP React follows security best practices:
- **JWT Token Security**: Secure token storage and transmission
- **CSRF Protection**: Built-in CSRF protection
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: React's built-in XSS protection
- **Permission Checks**: Comprehensive authorization system

## 🌐 Multi-tenancy

### What is multi-tenancy?

Multi-tenancy allows a single application instance to serve multiple tenants (organizations) with isolated data and configurations. Each tenant has their own data, users, and settings.

### How do I enable multi-tenancy?

Multi-tenancy is enabled by default in ABP React. You can configure it in your environment:

```env
NEXT_PUBLIC_ENABLE_MULTI_TENANCY=true
```

### How does tenant switching work?

ABP React provides automatic tenant switching:
- **Subdomain-based**: `tenant1.myapp.com`
- **Header-based**: `__tenant` header
- **Manual switching**: Tenant switcher component

### Can I disable multi-tenancy?

Yes, you can disable multi-tenancy:

```env
NEXT_PUBLIC_ENABLE_MULTI_TENANCY=false
```

This will hide tenant-related UI and functionality.

## 📱 UI & Components

### What UI library does ABP React use?

ABP React uses **shadcn/ui** components built on top of:
- **Radix UI**: For accessible, unstyled components
- **Tailwind CSS**: For utility-first styling
- **Lucide React**: For icons

### Can I customize the theme?

Yes, ABP React supports comprehensive theming:

```typescript
// Configure theme in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
};
```

### Are the components responsive?

Yes, all components are built with responsive design:
- **Mobile-first**: Designed for mobile devices first
- **Breakpoint System**: Tailwind's responsive breakpoints
- **Touch-friendly**: Optimized for touch interactions

### Can I use other UI libraries?

Yes, you can integrate other UI libraries:
- **Material-UI**: For Material Design components
- **Ant Design**: For enterprise-class UI
- **Chakra UI**: For modular component library
- **Custom Components**: Build your own component library

## 🔧 Development

### How do I add new pages?

With Next.js App Router, creating pages is simple:

```typescript
// app/users/page.tsx
export default function UsersPage() {
  return <div>Users Page</div>;
}

// app/users/[id]/page.tsx
export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <div>User ID: {params.id}</div>;
}
```

### How do I add new API endpoints?

Create API routes in the `app/api` directory:

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle GET request
  return NextResponse.json({ users: [] });
}

export async function POST(request: NextRequest) {
  // Handle POST request
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### How do I customize the build process?

Customize the build in `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
```

### How do I add custom middleware?

Add middleware in `middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom logic
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## 📊 Performance

### How do I optimize performance?

ABP React includes several performance optimizations:

1. **Code Splitting**: Automatic code splitting with Next.js
2. **Image Optimization**: Next.js Image component
3. **Bundle Analysis**: Built-in bundle analyzer
4. **Caching**: React Query for data caching
5. **Lazy Loading**: Component lazy loading

### How do I analyze bundle size?

Use the built-in bundle analyzer:

```bash
# Analyze bundle size
pnpm analyze

# This will open a visual representation of your bundle
```

### Why is my application slow?

Common performance issues and solutions:

1. **Large Bundle**: Use code splitting and lazy loading
2. **Unnecessary Re-renders**: Use React.memo and useMemo
3. **Heavy API Calls**: Implement proper caching
4. **Large Images**: Use Next.js Image optimization
5. **Memory Leaks**: Check for uncleaned event listeners

## 🔄 API Integration

### How do I generate the API client?

The API client is automatically generated from your ABP backend:

```bash
# Generate client
pnpm generate-client

# Specify custom API URL
pnpm generate-client --input https://your-api.com/swagger/v1/swagger.json
```

### What if my API changes?

Regenerate the client whenever your API changes:

```bash
# Regenerate client
pnpm generate-client

# This will update types and service methods
```

### How do I handle API errors?

ABP React includes comprehensive error handling:

```typescript
// Global error handler
export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    // Handle ABP-specific errors
    if (error.body?.error?.message) {
      toast.error(error.body.error.message);
    }
  }
};

// Component-level error handling
const { data, error, isLoading } = useUsers();

if (error) {
  return <div>Error: {error.message}</div>;
}
```

### Can I use REST APIs from other frameworks?

Yes, ABP React can work with any REST API:

```typescript
// Custom API client
const customApi = axios.create({
  baseURL: 'https://api.external.com',
  timeout: 5000,
});

// Custom hook
export const useCustomData = () => {
  return useQuery({
    queryKey: ['custom-data'],
    queryFn: () => customApi.get('/data').then(res => res.data),
  });
};
```

## 🚀 Deployment

### How do I deploy to production?

ABP React supports multiple deployment options:

1. **Vercel**: Recommended for Next.js apps
2. **Netlify**: Static site deployment
3. **AWS**: S3 + CloudFront or EC2
4. **Docker**: Containerized deployment
5. **Traditional Hosting**: Any Node.js hosting

### How do I configure environment variables?

Set environment variables for different environments:

```env
# .env.production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_API_URL=https://your-api.com
```

### How do I enable HTTPS?

For production deployments:

1. **Vercel/Netlify**: HTTPS is automatic
2. **Custom Server**: Configure SSL certificates
3. **Load Balancer**: Handle SSL termination at load balancer
4. **CDN**: Use CloudFront or similar CDN

### How do I optimize for SEO?

ABP React includes SEO optimizations:

```typescript
// app/layout.tsx
export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
  openGraph: {
    title: 'Your App Title',
    description: 'Your app description',
    url: 'https://your-domain.com',
    siteName: 'Your App',
  },
};

// Page-specific metadata
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

## 🧪 Testing

### How do I run tests?

ABP React includes comprehensive testing setup:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test UserProfile.test.tsx
```

### How do I test components?

Use React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

test('renders user profile', () => {
  render(<UserProfile user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### How do I test API calls?

Use Mock Service Worker (MSW):

```typescript
// Setup MSW handlers
export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json({ users: mockUsers }));
  }),
];

// Test hook
test('fetches users', async () => {
  const { result } = renderHook(() => useUsers(), {
    wrapper: QueryWrapper,
  });
  
  await waitFor(() => {
    expect(result.current.data).toEqual(mockUsers);
  });
});
```

## 🔧 Troubleshooting

### Common Issues

#### "Module not found" errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

#### TypeScript errors after API changes

```bash
# Regenerate API client
pnpm generate-client

# Check TypeScript
npx tsc --noEmit
```

#### Authentication not working

1. Check environment variables
2. Verify API URL accessibility
3. Check browser network tab for errors
4. Verify ABP backend configuration

#### Styles not applying

1. Check Tailwind CSS configuration
2. Verify CSS imports
3. Check for CSS conflicts
4. Ensure PostCSS configuration is correct

### Getting Help

If you can't find the answer to your question:

1. **Search Documentation**: Use the search function
2. **GitHub Issues**: Check existing issues
3. **GitHub Discussions**: Ask the community
4. **Discord**: Join our Discord server
5. **Email**: Contact the maintainers

## 📚 Learning Resources

### React Resources

- **React Documentation**: [react.dev](https://react.dev/)
- **Next.js Documentation**: [nextjs.org](https://nextjs.org/docs)
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs/)

### ABP Framework Resources

- **ABP Documentation**: [docs.abp.io](https://docs.abp.io/)
- **ABP Community**: [community.abp.io](https://community.abp.io/)
- **ABP Blog**: [blog.abp.io](https://blog.abp.io/)

### UI/UX Resources

- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com/)
- **Radix UI**: [radix-ui.com](https://radix-ui.com/)

## 🤝 Contributing

### How can I contribute?

There are many ways to contribute:

- **Report bugs**: Help us identify and fix issues
- **Request features**: Suggest new functionality
- **Submit PRs**: Fix bugs or add features
- **Improve docs**: Help make documentation better
- **Help others**: Answer questions in discussions

### What skills do I need?

- **React/TypeScript**: For frontend development
- **Next.js**: For framework-specific features
- **ABP Framework**: For backend integration
- **Testing**: For writing tests
- **Documentation**: For improving docs

See our [Contributing Guide](/docs/contributing) for detailed information.

---

## 💡 Still have questions?

If you don't find the answer you're looking for:

- **Search**: Use the search function in the documentation
- **GitHub Issues**: [Report bugs or ask questions](https://github.com/antosubash/abp-react/issues)
- **GitHub Discussions**: [Join community discussions](https://github.com/antosubash/abp-react/discussions)
- **Discord**: [Join our Discord server](https://discord.gg/your-server)
- **Email**: [antosubash@outlook.com](mailto:antosubash@outlook.com)

We're here to help you succeed with ABP React! 🚀