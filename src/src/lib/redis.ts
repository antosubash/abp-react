import Redis, { RedisOptions } from 'ioredis';

export type RedisSession = {
    access_token: string;
    refresh_token: string;
};

function getRedisConfiguration(): {
    port: number | undefined;
    host: string | undefined;
    password: string | undefined;
} {
    return {
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    };
}

export function createRedisInstance(
    config = getRedisConfiguration()
) {
    try {
        const options: RedisOptions = {
            host: config.host,
            lazyConnect: true,
            showFriendlyErrorStack: true,
            enableAutoPipelining: true,
            maxRetriesPerRequest: 0,
            retryStrategy: (times: number) => {
                if (times > 3) {
                    throw new Error(`[Redis] Could not connect after ${times} attempts`);
                }

                return Math.min(times * 200, 1000);
            },
        };

        if (config.port) {
            options.port = config.port;
        }

        if (config.password) {
            options.password = config.password;
        }

        const redis = new Redis(options);

        redis.on('error', (error: unknown) => {
            console.warn('[Redis] Error connecting', error);
        });

        return redis;
    } catch (e) {
        throw new Error(`[Redis] Could not create a Redis instance`);
    }
}