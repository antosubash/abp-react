import { clientConfig } from '@/config'
import { getSession } from '@/lib/actions'
import {getClientConfig} from '@/lib/session-utils'
import * as client from 'openid-client'
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
  let code_verifier = client.randomPKCECodeVerifier()
  let code_challenge = await client.calculatePKCECodeChallenge(code_verifier)
  const openIdClientConfig = await getClientConfig()
  let parameters: Record<string, string> = {
    "redirect_uri": clientConfig.redirect_uri,
    "scope": clientConfig.scope!,
    code_challenge,
    "code_challenge_method": clientConfig.code_challenge_method,
    "__tenant": session.tenantId === 'default' ? "" : session.tenantId!,
  }
  let state!: string
  if (!openIdClientConfig.serverMetadata().supportsPKCE()) {
    state = client.randomState()
    parameters.state = state
  }
  let redirectTo = client.buildAuthorizationUrl(openIdClientConfig, parameters)
  session.code_verifier = code_verifier
  session.state = state
  await session.save()
  return Response.redirect(redirectTo.href)
}
