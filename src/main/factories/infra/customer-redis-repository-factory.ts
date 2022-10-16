import { CustomerRedisRepository, redisClient } from '@/infra/db'
import env from '@/main/config/env'
import { makeGenerator } from './generator-factory'

const generator = makeGenerator()
const customerRedisRepository = new CustomerRedisRepository(redisClient, generator, env.prefixCustomer)

export const makeCustomerRedisRepository = (): CustomerRedisRepository => customerRedisRepository
