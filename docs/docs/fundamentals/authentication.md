---
sidebar_position: 2
---

# Authentication System

ABP React implements a comprehensive authentication system using OpenID Connect with PKCE (Proof Key for Code Exchange) flow. This guide explains how the authentication works, from login to session management.

## Overview

The authentication system in ABP React is built around:

- **OpenID Connect (OIDC)** with PKCE flow for secure authentication
- **Iron Session** for server-side session management
- **Redis** for distributed session storage
- **JWT tokens** for API authorization
- **Multi-tenancy** support with tenant-aware authentication

## Authentication Flow

### 1. Login Process

The login process follows the OpenID Connect authorization code flow with PKCE:

#### Step 1: User Initiates Login

When a user clicks the login button, they are redirected to `/auth/login`:

```typescript
// src/components/Login.tsx
const Login = () => {
  const handleLogin = () => {
    window.location.href = '/auth/login'
  }
  // ...
}
```

#### Step 2: Authorization Request

The `/auth/login` route handler generates PKCE parameters and redirects to ABP's authorization endpoint:

```typescript
// src/app/auth/login/route.ts
export async function GET() {
  const session = await getSession()
  
  // Generate PKCE parameters
  let code_verifier = client.randomPKCECodeVerifier()
  let code_challenge = await client.calculatePKCECodeChallenge(code_verifier)
  
  // Get OpenID configuration
  const openIdClientConfig = await getClientConfig()
  let tenantId = session.tenantId

  // Build authorization URL with parameters
  let parameters: Record<string, string> = {
    "redirect_uri": clientConfig.redirect_uri,
    "scope": clientConfig.scope!,
    code_challenge,
    "code_challenge_method": "S256",
    "__tenant": tenantId,
  }

  // Store PKCE verifier in session
  let redirectTo = client.buildAuthorizationUrl(openIdClientConfig, parameters)
  session.code_verifier = code_verifier
  session.state = state
  await session.save()
  
  return Response.redirect(redirectTo.href)
}
```

#### Step 3: User Authentication

The user is redirected to ABP's login page where they enter their credentials. After successful authentication, ABP redirects back to the configured callback URL.

#### Step 4: Authorization Code Exchange

The callback is handled by `/auth/openiddict/route.ts`:

```typescript
// src/app/auth/openiddict/route.ts
export async function GET(request: NextRequest) {
  const session = await getSession()
  const openIdClientConfig = await getClientConfig()
  
  // Exchange authorization code for tokens
  const tokenSet = await client.authorizationCodeGrant(openIdClientConfig, currentUrl, {
    pkceCodeVerifier: session.code_verifier,
    expectedState: session.state
  })
  
  const { access_token, refresh_token } = tokenSet
  
  // Get user information
  const userinfo = await client.fetchUserInfo(openIdClientConfig, access_token, sub)
  
  // Update session
  session.isLoggedIn = true
  session.access_token = access_token
  session.userInfo = {
    sub: userinfo.sub,
    name: userinfo.given_name!,
    email: userinfo.email!,
    email_verified: userinfo.email_verified!,
  }
  
  await session.save()
  
  // Store tokens in Redis for distributed access
  const redisSessionData = {
    access_token: access_token,
    refresh_token: refresh_token,
  } as RedisSession
  
  const redis = createRedisInstance()
  const redisKey = `session:${session.userInfo.sub}`
  await redis.set(redisKey, JSON.stringify(redisSessionData))
  await redis.quit()
  
  return Response.redirect(clientConfig.post_login_route)
}
```

### 2. Session Management

#### Iron Session Configuration

Sessions are managed using Iron Session with secure configuration:

```typescript
// src/sessionOptions.ts
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'abp-react-session-id',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  ttl: 60 * 60 * 24 * 7, // 1 week
}
```

#### Session Data Structure

The session contains comprehensive user and authentication data:

```typescript
// src/lib/session-utils.ts
export interface SessionData {
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

#### Client-Side Session Access

Components use the `useSession` hook to access session data:

```typescript
// src/useSession.ts
export default function useSession(): UseQueryResult<SessionData, Error> {
  return useQuery({
    queryKey: [QueryNames.GetSession],
    queryFn: async () => {
      const response = await fetch('/session')
      return (await response.json()) as SessionData
    },
    refetchOnWindowFocus: true
  })
}
```

### 3. Token Management

#### Automatic Token Refresh

The system automatically refreshes expired tokens:

```typescript
// src/lib/actions.ts
export async function getSession(): Promise<IronSession<SessionData>> {
  let session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  
  try {
    // Check if the access token is expired
    if (session.access_token && isTokenExpired(session.access_token!)) {
      const redisKey = `session:${session?.userInfo?.sub!}`
      const redis = createRedisInstance()
      const clientConfig = await getClientConfig()

      // Retrieve session data from Redis
      let redisSessionData = await redis.get(redisKey)
      const parsedSessionData = JSON.parse(redisSessionData!) as RedisSession

      // Refresh the access token using the refresh token
      const tokenSet = await client.refreshTokenGrant(clientConfig, parsedSessionData.refresh_token!)
      session.access_token = tokenSet.access_token
      await session.save()

      // Update Redis with the new session data
      const newRedisSessionData = {
        access_token: tokenSet.access_token,
        refresh_token: tokenSet.refresh_token,
      } as RedisSession
      await redis.set(redisKey, JSON.stringify(newRedisSessionData))
      await redis.quit()
    }
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    // Return default session on error
    return session
  }
}
```

#### Token Expiration Check

```typescript
// src/lib/auth.ts
export const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token!);
  const expirationTime = decoded?.exp! * 1000;
  const currentTime = new Date().getTime();
  return expirationTime < currentTime
}
```

## Multi-Tenancy Integration

### Tenant Selection

Before authentication, users must select their tenant:

```typescript
// src/app/auth/set-tenant/route.ts
export async function GET() {
  await setUpLayoutConfig()
  const session = await getSession()
  const host = (await headers()).get('host')

  if (session.tenantId) {
    return
  }

  try {
    const { data } = await tenantGetTenantGuid({ query: { host: host! } })
    session.tenantId = data ?? 'default'
  } catch (error) {
    console.error('Failed to fetch tenant GUID:', error)
    session.tenantId = 'default'
  }

  await session.save()
  redirect('/')
}
```

### Middleware Protection

The middleware ensures users have a tenant selected:

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  // Check if tenantId is present in the session
  if (!session.tenantId && request.nextUrl.pathname !== '/auth/set-tenant') {
    let redirectUrl = new URL('/auth/set-tenant', request.nextUrl.origin)
    return NextResponse.redirect(redirectUrl)
  }
}
```

## API Integration

### Automatic Token Injection

API requests automatically include authentication headers:

```typescript
// src/lib/auth.ts
export const setUpLayoutConfig = async () => {
  APIClient.setConfig({
    baseUrl: typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_API_URL!,
  })
  
  APIClient.interceptors.request.use(async (options) => {
    const session = await getSession()
    options.headers.set('Authorization', `Bearer ${session.access_token}`)
    options.headers.set('__tenant', session.tenantId ?? '')
    return options
  })
}
```

### Proxy API Routes

API calls are proxied through Next.js routes to include authentication:

```typescript
// src/app/api/[...slug]/route.ts
export async function handler(request: NextRequest) {
  const session = await getSession()
  
  // Add authentication headers
  headers.set('Authorization', `Bearer ${session.access_token}`)
  headers.set('__tenant', session.tenantId ?? '')
  
  // Forward request to ABP backend
  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
  })
  
  return response
}
```

## Logout Process

The logout process cleans up all session data:

```typescript
// src/app/auth/logout/route.ts
export async function GET() {
  const session = await getSession()
  const redis = createRedisInstance()
  const redisKey = `session:${session.userInfo?.sub}`
  
  // Get session data from Redis
  const redisSessionData = await redis.get(redisKey);
  const parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
  
  // Build end session URL
  const openIdClientConfig = await getClientConfig()
  const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
    post_logout_redirect_uri: clientConfig.post_logout_redirect_uri,
    id_token_hint: parsedSessionData.access_token,
  })
  
  // Clear session data
  session.isLoggedIn = defaultSession.isLoggedIn
  session.access_token = defaultSession.access_token
  session.userInfo = defaultSession.userInfo
  
  // Remove from Redis
  await redis.del(session?.userInfo?.sub!)
  await session.save()
  
  return Response.redirect(endSessionUrl.href)
}
```

## Configuration

### Environment Variables

Configure authentication settings in your environment:

```env
# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:44300

# OpenID Connect Configuration
NEXT_PUBLIC_CLIENT_ID=your-client-id
NEXT_PUBLIC_SCOPE=openid profile email phone roles

# Session Security
SESSION_PASSWORD=your-secure-session-password-at-least-32-characters

# Redis Configuration (for distributed sessions)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

### Client Configuration

The OpenID client is configured in `src/config.ts`:

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

## Security Features

### PKCE (Proof Key for Code Exchange)

- Prevents authorization code interception attacks
- Uses SHA256 code challenge method
- Generates secure random code verifiers

### Secure Session Storage

- Iron Session with strong encryption
- HttpOnly cookies in production
- Configurable session TTL

### Token Security

- JWT tokens stored securely server-side
- Automatic token refresh before expiration
- Secure token transmission via HTTPS

### Multi-Tenant Security

- Tenant isolation at the authentication level
- Tenant-specific token scoping
- Secure tenant selection process

## Troubleshooting

### Common Issues

#### 1. Authentication Redirect Loop

**Cause**: Session configuration issues or tenant selection problems.

**Solution**: 
- Check that `SESSION_PASSWORD` is set correctly
- Verify tenant configuration
- Clear browser cookies and try again

#### 2. Token Refresh Failures

**Cause**: Redis connection issues or expired refresh tokens.

**Solution**:
- Check Redis connection configuration
- Verify refresh token is being stored correctly
- Check OpenID Connect configuration

#### 3. API Authorization Errors

**Cause**: Token not being included in requests or expired tokens.

**Solution**:
- Verify `setUpLayoutConfig()` is called in layout
- Check API proxy configuration
- Ensure proper error handling for token refresh

### Debug Mode

Enable debug logging for authentication:

```typescript
// Add to your layout or middleware
if (process.env.NODE_ENV === 'development') {
  console.log('Session:', session)
  console.log('Token expired:', isTokenExpired(session.access_token))
}
```

## Best Practices

### 1. Secure Configuration

```typescript
// Use strong session passwords
SESSION_PASSWORD=your-very-secure-password-with-at-least-32-characters

// Enable secure cookies in production
cookieOptions: {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict'
}
```

### 2. Error Handling

```typescript
const { data: session, error } = useSession()

if (error) {
  // Handle authentication errors
  window.location.href = '/auth/login'
}

if (!session?.isLoggedIn) {
  // Show login prompt
  return <LoginPrompt />
}
```

### 3. Route Protection

```typescript
// Protect admin routes
export default function ProtectedPage() {
  const { data: session, isLoading } = useSession()
  
  if (isLoading) return <Loader />
  if (!session?.isLoggedIn) {
    redirect('/auth/login')
  }
  
  return <AdminContent />
}
```

## Next Steps

- **[API Integration](/docs/fundamentals/api-integration)** - Learn how to make authenticated API calls
- **[Multi-tenancy](/docs/fundamentals/multi-tenancy)** - Understand multi-tenant authentication
- **[Admin Interface](/docs/fundamentals/admin-interface)** - Explore the admin dashboard features
- **[Permissions](/docs/fundamentals/permissions)** - Set up role-based access control

---

The authentication system provides a robust, secure foundation for your ABP React application with enterprise-grade features like multi-tenancy, automatic token refresh, and comprehensive session management.
