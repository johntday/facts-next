// https://docs.railway.com/reference/errors/enotfound-redis-railway-internal
// https://github.com/redis/ioredis
import Redis from 'ioredis';
import { ClaimVerificationData } from '@/lib/types'

const redis_url = process.env.REDIS_URL + '?family=0';
const redis = new Redis( redis_url );

redis.on('error', (err) => console.log('Redis Client Error', err))

// await redis.connect()

// export default redisClient;


export async function getRedisData(
   id: string
): Promise<ClaimVerificationData | null> {
  try {
    const valueString = await redis.get(id)
    if (!valueString) {
      console.error(`Error getting data from Redis, id=${id}, value=${valueString}`)
      return null
    }
    return JSON.parse(valueString) as ClaimVerificationData
  } catch (error) {
    console.error('Error getting data from Redis:', error)
    return null
  }
}
