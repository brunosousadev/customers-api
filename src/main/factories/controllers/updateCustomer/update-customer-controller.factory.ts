import { UpdateCustomerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbUpdateCustomer } from '@/main/factories/usecases'
import { makeUpdateCustomerValidation } from './update-customer-validation-factory'
import { makeCheckCacheDecorator } from '@/main/factories/decorators'

const validate = makeUpdateCustomerValidation()
const dbUpdateCustomer = makeDbUpdateCustomer()
const controller = new UpdateCustomerController(dbUpdateCustomer, validate)

export const makeUpdateCustomerController = (): Controller => makeCheckCacheDecorator(controller)
