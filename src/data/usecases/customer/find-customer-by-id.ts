import { FindCustomerByIdRepository } from 'data/protocols'
import { FindCustomerById } from 'domain/usecases'

export class DbFindCustomerById implements FindCustomerById {
  constructor (private readonly findCustomerByIdRepository: FindCustomerByIdRepository) { }

  async findCustomerById (customerId: string): Promise<FindCustomerById.Result> {
    const customer = await this.findCustomerByIdRepository.findById(customerId)
    return customer || null
  }
}
