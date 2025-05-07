---
sidebar_position: 1
---

# Authentication

## Introduction

ABP React implements a secure authentication system using OpenID Connect with PKCE (Proof Key for Code Exchange) flow. This guide explains how authentication works in the application.

## Authentication Flow

The authentication process follows these steps:

1. User clicks the login button
2. System generates a PKCE code verifier and challenge
3. User is redirected to the OpenID Connect authorization endpoint
4. After successful authentication, user is redirected back to the callback URL
5. System exchanges the authorization code for tokens
6. Tokens are stored securely in Redis
7. User session is established with iron-session

## OpenID Connect Configuration

The application uses OpenID Connect with the following configuration:

```typescript
const clientConfig = {
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

### Required Environment Variables

- `NEXT_PUBLIC_API_URL`: Your ABP API URL
- `NEXT_PUBLIC_CLIENT_ID`: OpenID Connect client ID
- `NEXT_PUBLIC_SCOPE`: Required OAuth scopes
- `NEXT_PUBLIC_APP_URL`: Your application URL
- `SESSION_PASSWORD`: Secret key for session encryption

## Session Management

The application uses two layers of session management:

1. **Iron Session**: For secure client-side session storage
2. **Redis**: For server-side token storage

### Session Data Structure

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

## Token Refresh

The application automatically handles token refresh:

1. Checks token expiration before each request
2. Uses refresh token to obtain new access token
3. Updates both Redis and session storage
4. Maintains user session without requiring re-authentication

## Multi-tenancy Support

The application includes built-in multi-tenancy support:

1. Tenant ID is determined from the host header
2. Tenant context is maintained in the session
3. Tenant ID is included in API requests
4. Automatic tenant resolution on application startup

## Security Features

- PKCE flow for enhanced security
- Secure session storage with iron-session
- Redis-based token storage
- Automatic token refresh
- CSRF protection
- Secure cookie configuration

## API Integration

The authentication token is automatically included in API requests:

```typescript
APIClient.interceptors.request.use(async (options) => {
  const session = await getSession()
  options.headers.set('Authorization', `Bearer ${session.access_token}`)
  options.headers.set('__tenant', session.tenantId ?? '')
  return options
})
```

## Logout Process

The logout process:

1. Clears session data
2. Removes tokens from Redis
3. Redirects to OpenID Connect end session endpoint
4. Redirects to post-logout URL

## Best Practices

1. Always use environment variables for sensitive configuration
2. Keep session duration reasonable (default: 1 week)
3. Use HTTPS in production
4. Implement proper error handling
5. Monitor token refresh operations
6. Regular security audits
