import { tenantGetTenantGuid } from '@/client'
import { clientConfig } from '@/config'
import * as client from 'openid-client'
import { getSession } from './actions'

/**
 * Interface representing session data.
 * This interface defines the structure of the session data object,
 * including login status, tokens, user information, and tenant ID.
 */
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

/**
 * Default session data.
 * This object provides the default values for a new session, indicating the user is not logged in.
 * It initializes all optional fields to undefined.
 */
export const defaultSession: SessionData = {
  isLoggedIn: false,
  access_token: undefined,
  code_verifier: undefined,
  state: undefined,
  userInfo: undefined,
  tenantId: undefined,
}

/**
 * Retrieves the client configuration.
 * This function fetches the client configuration needed for authentication.
 * It uses the OpenID client library to discover the configuration based on the provided URL and client ID.
 *
 * @returns {Promise<any>} The client configuration.
 */
export async function getClientConfig() {
  return await client.discovery(new URL(clientConfig.url!), clientConfig.client_id!)
}

/**
 * Validates whether a string is a GUID (UUID v1-5).
 */
export function isGuid(value: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    value
  )
}

/**
 * Sets the tenant ID in the session based on the provided host.
 * This function updates the session with the tenant ID associated with the given host.
 * If the session already has a tenant ID, it does nothing. Otherwise, it fetches the tenant ID and saves it in the session.
 *
 * @param {string} host - The host to get the tenant ID for.
 * @returns {Promise<void>}
 */
export async function setTenantWithHost(host: string) {
  const session = await getSession()
  if (session.tenantId) {
    return
  }
  const { data } = await tenantGetTenantGuid({
    query: { host: host },
  })
  
  console.log('Tenant data received:', {
    data,
    type: typeof data,
    isString: typeof data === 'string',
    isObject: typeof data === 'object'
  })
  
  // Ensure we store a GUID or empty string
  const raw = data ? (typeof data === 'string' ? data : String(data)) : ''
  const candidate = raw.trim()
  session.tenantId = candidate && candidate !== 'default' && isGuid(candidate) ? candidate : ''
  await session.save()
}
