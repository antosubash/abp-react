import Redis, { RedisOptions } from 'ioredis'

/**
 * Represents a Redis session with access and refresh tokens.
 */
export type RedisSession = {
  access_token: string
  refresh_token: string
}

/**
 * Retrieves the Redis configuration from environment variables.
 * @returns An object containing the Redis configuration.
 */
function getRedisConfiguration(): {
  port: number | undefined
  host: string | undefined
  password: string | undefined
} {
  return {
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  }
}

/**
 * Creates a Redis instance with the given configuration.
 * This function initializes a Redis client using the provided configuration or defaults to environment variables.
 * It sets up various options such as lazy connection, error stack visibility, auto-pipelining, and retry strategy.
 * If the connection fails more than 3 times, it throws an error.
 * @param config - The Redis configuration.
 * @returns A Redis instance.
 * @throws Will throw an error if the Redis instance could not be created.
 */
export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`)
        }

        return Math.min(times * 200, 1000)
      },
    }

    if (config.port) {
      options.port = config.port
    }

    if (config.password) {
      options.password = config.password
    }

    const redis = new Redis(options)

    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error)
    })

    return redis
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`)
  }
}
