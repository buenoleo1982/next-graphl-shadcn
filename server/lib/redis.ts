import Redis from 'ioredis'

let redisClient: Redis | null

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  console.warn(
    'no REDIS_HOST or REDIS_PORT env vars defined! (ignore if typegen)'
  )
}

const redisHost = process.env.REDIS_HOST || '127.0.0.1'
const redisPort = process.env.REDIS_PORT || 5002

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    redisClient = new Redis({
      host: redisHost,
      port: Number(redisPort)
    })
  }
  return redisClient
}
