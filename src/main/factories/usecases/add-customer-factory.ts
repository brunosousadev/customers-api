import { DbAddCustomer } from '@/data/usecases'
import { AddCustomer } from '@/domain/usecases'
import { makeCustomerRedisRepository } from '../infra'

const repository = makeCustomerRedisRepository()
const dbAddCustomer = new DbAddCustomer(repository)

export const makeDbAddCustomer = (): AddCustomer => dbAddCustomer
