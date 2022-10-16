import { CheckCacheDecorator } from '@/presentation/decorators'
import { Controller } from '@/presentation/protocols'
import { makeCustomerRedisRepository } from '@/main/factories/infra'

const repository = makeCustomerRedisRepository()

export const makeCheckCacheDecorator = (controller: Controller): Controller => {
  return new CheckCacheDecorator(repository, controller)
}
