import { DbFindCustomerById } from '@/data/usecases'
import { FindCustomerById } from '@/domain/usecases'
import { makeCustomerRedisRepository } from '../infra'

const repository = makeCustomerRedisRepository()
const dbFindCustomerById = new DbFindCustomerById(repository)

export const makeDbFindCustomerById = (): FindCustomerById => dbFindCustomerById
