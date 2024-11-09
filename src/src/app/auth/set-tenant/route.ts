import { OpenAPI, tenantGetTenantGuid } from '@/client'
import { getSession } from '@/lib/actions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL!
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
  const host = (await headers()).get('host');
  if (session.tenantId) {
    return
  }
  const tenantGuid = await tenantGetTenantGuid({host: host!});
  session.tenantId = tenantGuid ?? 'default'
  await session.save()
  redirect('/')
}
