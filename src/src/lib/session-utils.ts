import * as client from 'openid-client'
import { clientConfig } from '@/config'

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
 * Utility function to validate tenant ID format.
 * This function checks if a tenant ID is in a valid format.
 *
 * @param {any} tenantId - The tenant ID to validate.
 * @returns {boolean} - True if the tenant ID is valid, false otherwise.
 */
export function isValidTenantId(tenantId: any): boolean {
  if (!tenantId) return false
  if (typeof tenantId === 'object') return false
  if (typeof tenantId === 'string') {
    const trimmed = tenantId.trim()
    return (
      trimmed !== '' &&
      trimmed !== 'null' &&
      trimmed !== 'undefined' &&
      trimmed !== '[object Object]'
    )
  }
  return true
}
