import { AddCustomerRepository, FindCustomerByIdRepository, UpdateCustomerRepository } from '@/data/protocols'
import { AddCustomer } from '@/domain/usecases'

import Chance from 'chance'
import { v4 as uuidv4 } from 'uuid'

const chance = new Chance()

export class AddCustomerRepositorySpy implements AddCustomerRepository {
  async add (data: AddCustomer.Params): Promise<AddCustomer.Result> {
    return new Promise<AddCustomer.Result>((resolve) => resolve({
      name: chance.name(),
      document: chance.natural({ min: 100, max: 2000 }),
      id: uuidv4()
    }))
  }
}

export class FindCustomerByIdRepositorySpy implements FindCustomerByIdRepository {
  async findById (id: string): Promise<FindCustomerByIdRepository.Result> {
    return new Promise<FindCustomerByIdRepository.Result>((resolve) => resolve({
      name: chance.name(),
      document: chance.natural({ min: 100, max: 2000 }),
      id
    }))
  }
}

export class UpdateCustomerRepositorySpy implements UpdateCustomerRepository {
  async update (data: UpdateCustomerRepository.Params): Promise<UpdateCustomerRepository.Result> {
    return new Promise<FindCustomerByIdRepository.Result>((resolve) => resolve(data))
  }
}
