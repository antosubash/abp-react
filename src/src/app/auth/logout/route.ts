import { clientConfig  } from '@/config';
import { defaultSession, getClient, getSession } from '@/lib';
import { RedisSession, createRedisInstance } from '@/utils/redis';
import { generators } from 'openid-client';

export async function GET() {
    const session = await getSession();
    const redis = createRedisInstance();
    const redisKey = `session:${session.userInfo?.sub}`;
    var redisSessionData = await redis.get(redisKey)
    var parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
    const client = await getClient();
    var endSession = client.endSessionUrl({
        post_logout_redirect_uri: clientConfig.post_logout_redirect_uri,
        id_token_hint: parsedSessionData.refresh_token,
        state: generators.state()
    });
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.access_token = defaultSession.access_token;
    session.userInfo = defaultSession.userInfo;
    await redis.del(session?.userInfo?.sub!);
    await session.save();
    return Response.redirect(endSession);
}