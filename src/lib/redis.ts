import { createClient } from 'redis'
import { ClaimVerificationData } from '@/lib/types'

const redisClient = createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', (err) => console.log('Redis Client Error', err))

await redisClient.connect()

// export default redisClient;


export async function getRedisData(
   id: string
): Promise<ClaimVerificationData | null> {
  try {
    const valueString = await redisClient.get(id)
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
