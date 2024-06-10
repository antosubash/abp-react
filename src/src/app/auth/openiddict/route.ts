import { clientConfig } from '@/config';
import { getClient, getSession } from '@/lib';
import { RedisSession, createRedisInstance } from '@/utils/redis';
import { IncomingMessage } from 'http';

export async function GET(request: IncomingMessage) { 
    const session = await getSession();
    const client = await getClient();
    const params = client.callbackParams(request);
    const tokenSet = await client.callback(clientConfig.redirect_uri, params, { code_verifier: session.code_verifier });
    const { access_token, refresh_token } = tokenSet;
    session.isLoggedIn = true;
    session.access_token = access_token;
    // call userinfo endpoint to get user info
    const userinfo = await client.userinfo(tokenSet);
    // store userinfo in session
    session.userInfo = {
        sub: userinfo.sub,
        name: userinfo.given_name!,
        email: userinfo.email!,
        email_verified: userinfo.email_verified!,
    };

    await session.save();

    const redisSessionData = {
        access_token: access_token,
        refresh_token: refresh_token,
    } as RedisSession;

    const redis = createRedisInstance();
    const redisKey = `session:${session.userInfo.sub}`;
    await redis.set(redisKey, JSON.stringify(redisSessionData));
    await redis.quit();
    return Response.redirect(clientConfig.post_login_route);
}