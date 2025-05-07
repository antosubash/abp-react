---
sidebar_position: 3
---

# Session Management

## Overview

ABP React implements a robust session management system using iron-session for secure client-side session storage and Redis for server-side token management. This guide explains how sessions are handled in the application.

## Session Configuration

The session configuration is defined in `sessionOptions.ts`:

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

## Session Data Structure

The session data includes authentication and tenant information:

```typescript
interface SessionData {
  isLoggedIn: boolean
  access_token?: string
  code_verifier?: string
  state?: string
  userInfo?: {
    sub: string
    name: string
    email: string
    email_verified: boolean
  }
  tenantId?: string
}
```

## Session Operations

### Getting Session Data

```typescript
export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  // ... session validation and refresh logic
  return session
}
```

### Token Refresh

The application automatically handles token refresh:

1. Checks token expiration
2. Uses refresh token to obtain new access token
3. Updates both Redis and session storage
4. Maintains user session

## Redis Integration

Redis is used for server-side token storage:

```typescript
const redisSessionData = {
  access_token: access_token,
  refresh_token: refresh_token,
} as RedisSession

const redis = createRedisInstance()
const redisKey = `session:${session.userInfo.sub}`
await redis.set(redisKey, JSON.stringify(redisSessionData))
```

## Security Features

1. **Secure Cookie Storage**
   - Encrypted session data
   - HTTPS-only in production
   - Configurable session duration

2. **Token Management**
   - Secure token storage
   - Automatic token refresh
   - Token expiration handling

3. **Session Validation**
   - Regular session checks
   - Invalid session cleanup
   - Security header validation

## Best Practices

1. **Configuration**
   - Use strong session passwords
   - Configure appropriate TTL
   - Enable secure cookies in production

2. **Error Handling**
   - Handle session corruption
   - Implement graceful degradation
   - Log session errors

3. **Performance**
   - Minimize session operations
   - Cache session data when possible
   - Optimize Redis operations

## Environment Variables

Required environment variables for session management:

- `SESSION_PASSWORD`: Secret key for session encryption
- `NEXT_PUBLIC_API_URL`: API endpoint for token operations
- `NEXT_PUBLIC_APP_URL`: Application base URL

## Related Components

- [Authentication](/docs/fundamentals/authentication)
- [Middleware](/docs/fundamentals/middleware)
- [Multi-tenancy](/docs/fundamentals/multi-tenancy) 