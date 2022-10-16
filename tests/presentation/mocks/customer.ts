import { AddCustomer, FindCustomerById, UpdateCustomer } from '@/domain/usecases'
import { v4 as uuidv4 } from 'uuid'

export class AddCustomerSpy implements AddCustomer {
  async add (customer: AddCustomer.Params): Promise<AddCustomer.Result> {
    return new Promise<AddCustomer.Result>((resolve) => resolve({
      ...customer,
      id: uuidv4()
    }))
  }
}

export class FindCustomerByIdSpy implements FindCustomerById {
  async findCustomerById (customerId: string): Promise<FindCustomerById.Result> {
    return new Promise<AddCustomer.Result>((resolve) => resolve({
      name: 'name',
      document: 123,
      id: uuidv4()
    }))
  }
}

export class UpdateCustomerSpy implements UpdateCustomer {
  async update (customer: UpdateCustomer.Params): Promise<UpdateCustomer.Result> {
    return new Promise<UpdateCustomer.Result>((resolve) => resolve(customer))
  }
}
