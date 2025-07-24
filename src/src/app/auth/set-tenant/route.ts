import { tenantGetTenantGuid } from '@/client'
import { getSession } from '@/lib/actions'
import { setUpLayoutConfig } from '@/lib/auth'
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
  await setUpLayoutConfig()
  const session = await getSession()
  const host = (await headers()).get('host')

  if (session.tenantId) {
    return
  }

  try {
    const { data } = await tenantGetTenantGuid({ query: { host: host! } })
    console.log('Fetched tenant GUID:', data)
    session.tenantId = data ?? 'default'
  } catch (error) {
    console.error('Failed to fetch tenant GUID:', error)
    session.tenantId = 'default'
  }

  await session.save()
  redirect('/')
}
