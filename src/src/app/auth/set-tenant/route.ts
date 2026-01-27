import { tenantGetTenantGuid } from '@/client'
import { getSession } from '@/shared/lib/actions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Handles the GET request to set the tenant for the current session.
 *
 * This function retrieves the current session and the host from the request headers.
 * If the session already has a tenantId, it returns immediately.
 * Otherwise, it fetches the tenant GUID based on the host and sets it as the tenantId in the session.
 * If no tenant GUID is found, it defaults to 'default'.
 * Finally, it saves the session and redirects to the root path.
 *
 * @returns {Promise<void>} A promise that resolves when the session is saved and the redirect is initiated.
 */
export async function GET() {
  const session = await getSession()
  const host = (await headers()).get('host')

  // If session already has a valid tenantId, redirect to home to prevent loops
  if (
    session.tenantId &&
    session.tenantId !== '' &&
    session.tenantId !== 'null' &&
    session.tenantId !== 'undefined'
  ) {
    console.log('Session already has tenantId:', session.tenantId)
    redirect('/')
  }

  try {
    const { data } = await tenantGetTenantGuid({ query: { host: host! } })
    console.log('Fetched tenant GUID:', data)

    // Ensure tenantId is always a string and handle edge cases
    // Check for empty objects, null, undefined, empty strings, and invalid values
    if (
      data &&
      data !== 'null' &&
      data !== 'undefined' &&
      data !== '' &&
      typeof data === 'object' &&
      Object.keys(data).length > 0
    ) {
      // Valid data object with properties
      session.tenantId = String(data)
    } else if (data && typeof data === 'string' && data.trim() !== '') {
      // Valid string data
      session.tenantId = data.trim()
    } else {
      // Empty object, null, undefined, or empty string - set as default tenant
      session.tenantId = 'default'
      console.log('Empty object or invalid tenant data received, setting default tenant')
    }
  } catch (error) {
    console.error('Failed to fetch tenant GUID:', error)
    // Set a default tenant on error to prevent infinite loops
    session.tenantId = 'default'
    console.log('Error occurred, setting default tenant')
  }

  // Ensure the session is saved before redirecting
  try {
    await session.save()
    console.log('Session saved with tenantId:', session.tenantId)
  } catch (saveError) {
    console.error('Failed to save session:', saveError)
    // Even if save fails, redirect to prevent infinite loops
  }

  // Redirect to home page
  redirect('/')
}
