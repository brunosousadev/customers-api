import { DbUpdateCustomer } from '@/data/usecases'
import { UpdateCustomer } from '@/domain/usecases'
import { makeCustomerRedisRepository } from '../infra'

const repository = makeCustomerRedisRepository()
const dbUpdateCustomer = new DbUpdateCustomer(repository, repository)

export const makeDbUpdateCustomer = (): UpdateCustomer => dbUpdateCustomer
