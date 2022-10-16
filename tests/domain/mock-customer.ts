import Chance from 'chance'
import { AddCustomer, UpdateCustomer } from '@/domain/usecases'

const chance = new Chance()

export const mockAddCustomerParams = (): AddCustomer.Params => ({
  name: chance.name(),
  document: chance.natural({ min: 100, max: 2000 })
})

export const mockFindCustomerByIdParams = (): string => 'id'

export const mockUpdateCustomerParams = (): UpdateCustomer.Params => ({
  name: chance.name(),
  document: chance.natural({ min: 100, max: 2000 }),
  id: 'id'
})
