import * as client from 'openid-client'
import {tenantGetTenantGuid} from '@/client'
import {clientConfig} from '@/config'
import {getSession} from './actions'

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

export const defaultSession: SessionData = {
  isLoggedIn: false,
  access_token: undefined,
  code_verifier: undefined,
  state: undefined,
  userInfo: undefined,
  tenantId: undefined,
}

export async function getClientConfig() {
  return await client.discovery(new URL(clientConfig.url!), clientConfig.client_id!);
}

export async function setTenantWithHost(host: string) {
  const session = await getSession()
  if (session.tenantId) {
    return
  }
  session.tenantId = await tenantGetTenantGuid({host: host})
  await session.save()
}
