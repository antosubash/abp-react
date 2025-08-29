import * as client from 'openid-client'
import { clientConfig } from '@/config'
import { getSession } from '@/lib/actions'
import { createRedisInstance, type RedisSession } from '@/lib/redis'
import { defaultSession, getClientConfig } from '@/lib/session-utils'
/**
 * Handles the GET request for logging out a user.
 *
 * This function performs the following steps:
 * 1. Retrieves the current session.
 * 2. Creates a Redis instance and fetches session data from Redis.
 * 3. Parses the session data.
 * 4. Retrieves OpenID client configuration.
 * 5. Constructs the end session URL using the OpenID client configuration.
 * 6. Resets the session to default values.
 * 7. Deletes the session data from Redis.
 * 8. Saves the updated session.
 * 9. Redirects the user to the end session URL.
 *
 * @returns {Promise<Response>} A promise that resolves to a redirect response to the end session URL.
 */
export async function GET() {
  const session = await getSession()
  const redis = createRedisInstance()
  const redisKey = `session:${session.userInfo?.sub}`
  const redisSessionData = await redis.get(redisKey)

  if (!redisSessionData) {
    // If no session data in Redis, just redirect to logout
    session.isLoggedIn = defaultSession.isLoggedIn
    session.access_token = defaultSession.access_token
    session.userInfo = defaultSession.userInfo
    await session.save()
    return Response.redirect(clientConfig.post_logout_redirect_uri)
  }

  const parsedSessionData = JSON.parse(redisSessionData) as RedisSession
  const openIdClientConfig = await getClientConfig()
  const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
    post_logout_redirect_uri: clientConfig.post_logout_redirect_uri,
    id_token_hint: parsedSessionData.access_token,
  })
  session.isLoggedIn = defaultSession.isLoggedIn
  session.access_token = defaultSession.access_token
  session.userInfo = defaultSession.userInfo

  if (session.userInfo?.sub) {
    await redis.del(session.userInfo.sub)
  }

  await session.save()
  return Response.redirect(endSessionUrl.href)
}
