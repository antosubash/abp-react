---
sidebar_position: 5
---

# Configuration

## Overview

ABP React provides a flexible configuration system that allows you to customize various aspects of the application. This guide explains the different configuration options and how to use them.

## Environment Variables

### Required Variables

```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_CLIENT_ID=your-client-id
NEXT_PUBLIC_SCOPE=your-scope
NEXT_PUBLIC_APP_URL=your-app-url
SESSION_PASSWORD=your-session-password
```

### Optional Variables

```env
NEXT_PUBLIC_UMAMI_SCRIPT_URL=your-umami-script-url
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-website-id
```

## Client Configuration

The main client configuration is defined in `config.ts`:

```typescript
export const clientConfig = {
  url: process.env.NEXT_PUBLIC_API_URL,
  audience: process.env.NEXT_PUBLIC_API_URL,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  scope: process.env.NEXT_PUBLIC_SCOPE,
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/openiddict`,
  post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}`,
  response_type: 'code',
  grant_type: 'authorization_code',
  post_login_route: `${process.env.NEXT_PUBLIC_APP_URL}`,
  code_challenge_method: 'S256'
}
```

## Session Configuration

Session settings are configured in `sessionOptions.ts`:

```typescript
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'abp-react-session-id',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  ttl: 60 * 60 * 24 * 7, // 1 week
}
```

## API Client Configuration

The API client is configured to handle authentication and tenant context:

```typescript
APIClient.setConfig({
  baseUrl: typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_API_URL!,
})

APIClient.interceptors.request.use(async (options) => {
  const session = await getSession()
  options.headers.set('Authorization', `Bearer ${session.access_token}`)
  options.headers.set('__tenant', session.tenantId ?? '')
  return options
})
```

## Development Configuration

### Next.js Configuration

The application uses Next.js 13+ with the App Router. Key configurations include:

- Server components by default
- API routes in the app directory
- Middleware for request handling
- Environment variable handling

### TypeScript Configuration

TypeScript is configured with strict mode and modern features:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Production Configuration

### Docker Configuration

The application includes Docker configuration for production deployment:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## Best Practices

1. **Environment Variables**
   - Use descriptive names
   - Document all variables
   - Provide default values when appropriate

2. **Security**
   - Keep sensitive data in environment variables
   - Use secure session configuration
   - Implement proper CORS settings

3. **Performance**
   - Optimize build configuration
   - Use proper caching strategies
   - Implement proper error handling

## Related Components

- [Authentication](/docs/fundamentals/authentication)
- [Session Management](/docs/fundamentals/session-management)
- [Multi-tenancy](/docs/fundamentals/multi-tenancy) 