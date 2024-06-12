import { RedisSession, createRedisInstance } from "@/lib/redis";
import { getClient, getSession } from "@/lib/session-utils";

export async function GET() {
    const session = await getSession();
    const redisKey = `session:${session?.userInfo?.sub!}`;
    const redis = createRedisInstance();
    const client = await getClient();
    var redisSessionData = await redis.get(redisKey);
    var parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
    var tokenSet = await client.refresh(parsedSessionData.refresh_token!);
    session.access_token = tokenSet.access_token;
    await session.save();
    var newRedisSessionData = {
        access_token: tokenSet.access_token,
        refresh_token: tokenSet.refresh_token,
    } as RedisSession;
    await redis.set(redisKey, JSON.stringify(newRedisSessionData));
    await redis.quit();
}