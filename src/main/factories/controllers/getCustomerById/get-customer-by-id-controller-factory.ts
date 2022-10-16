import { GetCustomerByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbFindCustomerById } from '@/main/factories/usecases'
import { makeGetCustomerByIdValidation } from './get-customer-by-id-validation-factory'
import { makeCheckCacheDecorator } from '@/main/factories/decorators'

const validation = makeGetCustomerByIdValidation()
const dbFindCustomerById = makeDbFindCustomerById()
const controller = new GetCustomerByIdController(dbFindCustomerById, validation)

export const makeGetCustomerByIdController = (): Controller => makeCheckCacheDecorator(controller)
