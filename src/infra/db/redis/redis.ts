import Redis from 'ioredis'
import env from '@/main/config/env'

export const redisClient = new Redis(env.redisUrl)
