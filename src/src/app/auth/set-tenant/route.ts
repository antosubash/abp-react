import { OpenAPI, tenantGetTenantGuid } from '@/client'
import { getSession } from '@/lib/actions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL!
export async function GET() {
  const session = await getSession()
  var host = headers().get('host')
  if (session.tenantId) {
    return
  }
  var tenantGuid = await tenantGetTenantGuid({ host: host! })
  session.tenantId = tenantGuid ?? 'default'
  await session.save()
  redirect('/')
}
