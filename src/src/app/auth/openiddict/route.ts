import {clientConfig} from '@/config'
import * as client from 'openid-client'
import {getSession} from '@/lib/actions'
import {createRedisInstance, RedisSession} from '@/lib/redis'
import {getClientConfig} from '@/lib/session-utils'
import {NextRequest} from 'next/server'
import {headers} from "next/headers";

/**
 * Handles the GET request for OpenID Connect authentication.
 * 
 * This function performs the following steps:
 * 1. Retrieves the current session.
 * 2. Fetches the OpenID client configuration.
 * 3. Constructs the current URL from the request headers.
 * 4. Performs the authorization code grant flow to obtain tokens.
 * 5. Updates the session with the access token and user information.
 * 6. Saves the session.
 * 7. Stores the access and refresh tokens in Redis.
 * 8. Redirects the user to the post-login route.
 * 
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a redirect response.
 */
export async function GET(request: NextRequest) {
  const session = await getSession()
  const openIdClientConfig = await getClientConfig()
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') || headerList.get('host') || 'localhost'
  const protocol = headerList.get('x-forwarded-proto') || 'https'
  const currentUrl = new URL(`${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`)
  const tokenSet = await client.authorizationCodeGrant(openIdClientConfig, currentUrl, {
    pkceCodeVerifier: session.code_verifier,
    expectedState: session.state
  })
  const { access_token, refresh_token } = tokenSet
  session.isLoggedIn = true
  session.access_token = access_token
  let claims = tokenSet.claims()!
  const {sub} = claims
  // call userinfo endpoint to get user info
  const userinfo = await client.fetchUserInfo(openIdClientConfig, access_token, sub)
  // store userinfo in session
  session.userInfo = {
    sub: userinfo.sub,
    name: userinfo.given_name!,
    email: userinfo.email!,
    email_verified: userinfo.email_verified!,
  }

  await session.save()

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
