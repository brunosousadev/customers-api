import { AddCustomer } from 'domain/usecases/add-customer'
import { AddCustomerRepository } from 'data/protocols'

export class DbAddCustomer implements AddCustomer {
  constructor (private readonly addCustomerRepository: AddCustomerRepository) { }

  async add (customer: AddCustomer.Params): Promise<AddCustomer.Result> {
    return this.addCustomerRepository.add({
      document: customer.document,
      name: customer.name
    })
  }
}
