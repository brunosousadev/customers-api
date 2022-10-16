import { AddCustomerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddCustomer } from '@/main/factories/usecases'
import { makeAddCustomerValidation } from './add-customer-validation-factory'
import { makeCheckCacheDecorator } from '@/main/factories/decorators'

const validation = makeAddCustomerValidation()
const dbAddCustomer = makeDbAddCustomer()
const controller = new AddCustomerController(dbAddCustomer, validation)

export const makeAddCustomerController = (): Controller => makeCheckCacheDecorator(controller)
