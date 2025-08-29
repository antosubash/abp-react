import * as client from 'openid-client'
import { clientConfig } from '@/config'
import { getSession } from '@/lib/actions'
import { getClientConfig } from '@/lib/session-utils'
/**
 * Handles the GET request for the login route.
 *
 * This function initiates the PKCE (Proof Key for Code Exchange) flow for OAuth2 authentication.
 * It generates a code verifier and code challenge, constructs the authorization URL with the necessary parameters,
 * and redirects the user to the authorization endpoint.
 *
 * @returns {Promise<Response>} A promise that resolves to a Response object that redirects the user to the authorization URL.
 */
export async function GET() {
  const session = await getSession()
  const code_verifier = client.randomPKCECodeVerifier()
  const code_challenge = await client.calculatePKCECodeChallenge(code_verifier)
  const openIdClientConfig = await getClientConfig()
  let tenantId = session.tenantId

  // Ensure tenantId is always a string and handle edge cases
  if (
    !tenantId ||
    tenantId === 'default' ||
    (typeof tenantId === 'object' && Object.keys(tenantId).length === 0) ||
    typeof tenantId !== 'string'
  ) {
    tenantId = ''
  } else {
    tenantId = String(tenantId)
  }

  const parameters: Record<string, string> = {
    redirect_uri: clientConfig.redirect_uri,
    scope: clientConfig.scope || 'openid profile email',
    code_challenge,
    code_challenge_method: clientConfig.code_challenge_method,
    __tenant: tenantId,
  }
  let state!: string
  if (!openIdClientConfig.serverMetadata().supportsPKCE()) {
    state = client.randomState()
    parameters.state = state
  }
  const redirectTo = client.buildAuthorizationUrl(openIdClientConfig, parameters)
  session.code_verifier = code_verifier
  session.state = state
  await session.save()
  return Response.redirect(redirectTo.href)
}
