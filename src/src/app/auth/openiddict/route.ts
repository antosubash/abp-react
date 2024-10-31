import {clientConfig} from '@/config'
import * as client from 'openid-client'
import {getSession} from '@/lib/actions'
import {createRedisInstance, RedisSession} from '@/lib/redis'
import {getClientConfig} from '@/lib/session-utils'
import {NextRequest} from 'next/server'
import {headers} from "next/headers";

export async function GET(request: NextRequest) {
  const session = await getSession()
  const openIdClientConfig = await getClientConfig()
  const currentUrl = new URL(request.url)
  const headersList = await headers()
  currentUrl.host = headersList.get('host')!
  // remove the port if it exists in the host only in production
  if (process.env.NODE_ENV === 'production') {
    currentUrl.host = currentUrl.host.split(':')[0]
  }
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
