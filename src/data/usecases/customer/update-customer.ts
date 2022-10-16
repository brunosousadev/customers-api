import { FindCustomerByIdRepository, UpdateCustomerRepository } from 'data/protocols'
import { UpdateCustomer } from 'domain/usecases'

export class DbUpdateCustomer implements UpdateCustomer {
  constructor (
    private readonly findCustomerByIdRepository: FindCustomerByIdRepository,
    private readonly updateCustomerRepository: UpdateCustomerRepository) { }

  async update (customer: UpdateCustomer.Params): Promise<UpdateCustomer.Result> {
    const customerCurrent = await this.findCustomerByIdRepository.findById(customer.id)
    if (customerCurrent) {
      return this.updateCustomerRepository.update({
        ...customer
      })
    }
    return null
  }
}
